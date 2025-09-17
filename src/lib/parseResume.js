import { retext } from "retext";
import retextPos from "retext-pos";
import retextKeywords from "retext-keywords";
// import toString from "nlcst-to-string";
import { toString } from "nlcst-to-string";

/**
 * parseResumeText(text) -> returns structured resume object:
 * {
 *  personal: { name, email, phone, location, summary },
 *  skills: [string],
 *  workExperience: [{ line, company, role, startDate, endDate, description }],
 *  education: [{ line, school, degree, field, startDate, endDate }],
 *  certifications: [{ line, title, issuer, date }],
 *  projects: [{ line, name, description, link, techStack }],
 *  keywords: [string]
 * }
 *
 * This is heuristic-based — retext helps extract likely keywords/phrases.
 */

// regex helpers
const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const PHONE_RE = /(\+\d{1,3}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{4}/g;
const DATE_RE =
  /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec|January|February|March|April|June|July|August|September|October|November|December)\.?[-\s]?\d{2,4}\b|\b\d{2}\/\d{4}\b/gi;

const SECTION_HEADERS = [
  "experience",
  "work experience",
  "employment",
  "professional experience",
  "education",
  "skills",
  "projects",
  "certifications",
  "summary",
  "profile",
];

const CLEAN = (s = "") => String(s || "").replace(/\s+/g, " ").trim();

function splitIntoSections(raw) {
  const text = String(raw || "").replace(/\r/g, "\n").replace(/\u0000/g, "");
  const lines = text.split(/\n/).map(l => CLEAN(l)).filter(Boolean);
  const sections = {};
  let current = "summary";
  sections[current] = [];
  for (const line of lines) {
    const lower = line.toLowerCase();
    const header = SECTION_HEADERS.find(h => lower.startsWith(h));
    if (header) {
      current =
        header.includes("experience") ? "experience" :
        header.includes("education") ? "education" :
        header.includes("skill") ? "skills" :
        header.includes("project") ? "projects" :
        header.includes("certification") ? "certifications" :
        header.includes("summary") || header.includes("profile") ? "summary" :
        header;
      if (!sections[current]) sections[current] = [];
    } else {
      sections[current].push(line);
    }
  }
  return sections;
}

function extractNameFromText(text) {
  // Heuristic: first non-empty line that is not an email and looks like a name (letters + space)
  if (!text) return null;
  const lines = text.split("\n").map(l => CLEAN(l)).filter(Boolean);
  for (const ln of lines.slice(0, 6)) {
    if (EMAIL_RE.test(ln) || PHONE_RE.test(ln)) continue;
    if (ln.split(" ").length >= 2 && ln.length < 60) return ln;
  }
  return lines[0] || null;
}

async function extractKeywordsViaRetext(text) {
  try {
    const file = await retext()
      .use(retextPos)       // POS helps keywords plugin
      .use(retextKeywords)  // extract keywords & keyphrases
      .process(String(text || ""));

    const keyphrases = (file.data.keyphrases || []).map(p => {
      try {
        return CLEAN(toString(p.matches[0].nodes));
      } catch {
        return null;
      }
    }).filter(Boolean);

    const words = (file.data.keywords || []).map(k => {
      try {
        return CLEAN(toString(k.matches[0].node));
      } catch {
        return null;
      }
    }).filter(Boolean);

    // merge, dedupe, prefer longer phrases first then words
    const combined = Array.from(new Set([...keyphrases, ...words]));
    return combined;
  } catch (err) {
    console.warn("retext keyword extraction failed:", err);
    return [];
  }
}

export async function parseResumeText(text = "") {
  text = String(text || "");
  const sections = splitIntoSections(text);

  // personal
  const emails = [...new Set((text.match(EMAIL_RE) || []).map(e => CLEAN(e)))];
  const phones = [...new Set((text.match(PHONE_RE) || []).map(p => CLEAN(p)))];
  const name = extractNameFromText(text) || (sections.summary?.[0] || null);

  // try retext-based keywords/keyphrases (async)
  const extractedKeywords = await extractKeywordsViaRetext(text);

  // skills: prefer explicit skills section, else fall back to keywords filtered
  const skillsFromSection = (sections.skills || [])
    .join(", ")
    .split(/[,|•;\/\n]\s*/)
    .map(s => CLEAN(s))
    .filter(Boolean);

  // heuristic: pick candidate keywords that look like technologies/short phrases
  const keywordCandidates = extractedKeywords.filter(k => {
    // drop long sentences / obvious non-skill lines
    return k.length <= 60 && /[A-Za-z0-9.+#-]/.test(k);
  });

  const skills = (skillsFromSection.length ? skillsFromSection : keywordCandidates.slice(0, 20))
    .map(s => s.trim())
    .filter(Boolean);

  // workExperience: group experience section lines by date-like headers
  const workExperience = [];
  let current = null;
  (sections.experience || []).forEach(line => {
    const dates = line.match(DATE_RE) || [];
    const looksLikeHeader =
      dates.length ||
      / at | @ | - /.test(line) ||
      /intern|engineer|developer|manager|consultant|lead|officer|analyst/i.test(line);

    if (looksLikeHeader) {
      if (current) workExperience.push(current);
      // try to split "Role at Company - dates" or "Company - Role (dates)"
      let role = null;
      let company = null;
      const atMatch = line.match(/^(.*?)\s+(?:at|@)\s+(.*)$/i);
      if (atMatch) {
        role = CLEAN(atMatch[1]);
        company = CLEAN(atMatch[2]);
      } else {
        // try "Role - Company" or "Company - Role"
        const parts = line.split(/[-–—]/).map(p => CLEAN(p));
        if (parts.length >= 2) {
          // detect which part contains common role words
          if (/intern|engineer|developer|manager|consultant|lead|officer|analyst/i.test(parts[0])) {
            role = parts[0];
            company = parts.slice(1).join(" · ");
          } else {
            company = parts[0];
            role = parts.slice(1).join(" · ");
          }
        } else {
          // fallback
          company = line;
        }
      }
      current = {
        line,
        company: company || null,
        role: role || null,
        startDate: (dates[0] || null),
        endDate: (dates[1] || null),
        description: "",
      };
    } else if (current) {
      current.description = CLEAN(`${current.description} ${line}`.trim());
    }
  });
  if (current) workExperience.push(current);

  // education: map lines -> objects
  const education = (sections.education || []).map(line => {
    const degreeMatch = line.match(/(B\.?Sc|M\.?Sc|B\.?E|B\.?Tech|M\.?Tech|MBA|B\.?S|M\.?S|PhD|Bachelor|Master|Doctor)/i);
    const dates = line.match(DATE_RE) || [];
    const school = CLEAN((line.split(/[-–—]|,/)?.[0] || ""));
    return {
      line,
      school: school || null,
      degree: degreeMatch ? degreeMatch[0] : null,
      field: null,
      startDate: dates[0] || null,
      endDate: dates[1] || null,
    };
  });

  // projects & certifications
  const projects = (sections.projects || []).map(line => ({
    line,
    name: CLEAN((line.split(/[-–—:]/)[0] || "")) || null,
    description: line,
    link: null,
    techStack: [],
  }));

  const certifications = (sections.certifications || []).map(line => ({
    line,
    title: line,
    issuer: null,
    date: null,
  }));

  const personal = {
    name: name || null,
    email: emails[0] || null,
    phone: phones[0] || null,
    location: null,
    summary: CLEAN((sections.summary || []).join(" ")),
  };

  return {
    personal,
    skills,
    workExperience,
    education,
    certifications,
    projects,
    keywords: extractedKeywords,
  };
}
