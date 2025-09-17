// lib/ranker.js
/**
 * Rule-based resume ranking helpers
 *
 * Exports:
 *  - rankCandidates(job, candidates, options) -> returns array sorted by score desc
 *
 * Expected candidate shape:
 *  { id, name, resume: { skills: [string], workExperience: [{ startDate, endDate, ... }], education: [{ degree, line, ... }] } }
 *
 * Job shape:
 *  { title, description, requiredSkills: [string], minExperience: number (years), requiredDegree: string|null }
 */

const DEFAULT_WEIGHTS = {
  skills: 0.6,
  experience: 0.25,
  education: 0.15,
};

// Utilities
const CLEAN = (s = "") => String(s || "").toLowerCase().trim();

function normalizeSkill(s) {
  return CLEAN(s).replace(/[^a-z0-9+#.+#\s-]/g, "").replace(/\s+/g, " ");
}

function unique(arr) {
  return Array.from(new Set((arr || []).filter(Boolean)));
}

// Skill match:
// For each required skill, check candidate skills for exact match or partial match.
// Returns fraction matched [0..1].
function skillMatchScore(candidateSkills = [], requiredSkills = []) {
  if (!requiredSkills || requiredSkills.length === 0) return 1; // no requirement -> full score

  const cand = unique(candidateSkills.map(normalizeSkill));
  const req = unique(requiredSkills.map(normalizeSkill));

  if (!cand.length) return 0;

  let total = 0;
  for (const r of req) {
    // exact match
    if (cand.includes(r)) {
      total += 1;
      continue;
    }
    // partial match: any candidate skill contains the required skill token or vice versa
    const partial = cand.some(c => c.includes(r) || r.includes(c));
    if (partial) {
      total += 0.75;
      continue;
    }
    // fuzzy-ish token overlap: split tokens
    const rTokens = r.split(/\s+/);
    const tokenMatch = cand.some(c => rTokens.some(t => t && c.includes(t)));
    if (tokenMatch) {
      total += 0.5;
      continue;
    }
    // no match -> add 0
  }

  return Math.max(0, Math.min(1, total / req.length));
}

// Experience parsing helpers
// parse years (YYYY) from text like "Jan 2020", "2020", "2020-01", "Jan 2020 - Feb 2022"
function parseYearsFromString(s) {
  if (!s) return [];
  const re = /\b(19|20)\d{2}\b/g;
  const out = [];
  let m;
  while ((m = re.exec(s))) {
    out.push(parseInt(m[0], 10));
  }
  return out;
}

// Estimate experience years from resume.workExperience array
// Each item: try parse startDate/endDate for years. If only start found, assume 1 year. If neither found, skip or assume 0.
function estimateExperienceYears(workExperience = []) {
  if (!Array.isArray(workExperience) || workExperience.length === 0) return 0;

  let totalMonths = 0;

  for (const item of workExperience) {
    const s = item.startDate || item.start || item.from || "";
    const e = item.endDate || item.end || item.to || "";

    const sYears = parseYearsFromString(String(s));
    const eYears = parseYearsFromString(String(e));

    let startYear = sYears.length ? sYears[0] : null;
    let endYear = eYears.length ? eYears[0] : null;

    // If both are year numbers, approximate months difference as 12 * (end - start)
    if (startYear && endYear) {
      totalMonths += Math.max(0, (endYear - startYear) * 12);
      continue;
    }

    // Try to parse full date via Date.parse fallback (may handle "Jan 2020" etc)
    let startTs = null;
    let endTs = null;
    try {
      if (s) {
        const d = Date.parse(s);
        if (!Number.isNaN(d)) startTs = d;
      }
      if (e) {
        const d2 = Date.parse(e);
        if (!Number.isNaN(d2)) endTs = d2;
      }
    } catch (err) {
      /* ignore */
    }

    if (startTs && endTs) {
      const months = Math.max(0, Math.round((endTs - startTs) / (1000 * 60 * 60 * 24 * 30)));
      totalMonths += months;
      continue;
    }

    // if only start present, count as 12 months as minimal conservative estimate
    if (startYear && !endYear) {
      totalMonths += 12;
      continue;
    }

    if (!startYear && !endYear && startTs && !endTs) {
      totalMonths += 12;
      continue;
    }

    // if neither parseable, skip
  }

  const years = totalMonths / 12;
  return Math.round(years * 10) / 10; // 1 decimal
}

// Experience match score: candidateYears / requiredYears (clamped to 1)
function experienceScore(candidateYears, requiredYears) {
  if (!requiredYears || requiredYears <= 0) {
    // no requirement -> give full score
    return 1;
  }
  if (!candidateYears || candidateYears <= 0) return 0;
  return Math.max(0, Math.min(1, candidateYears / requiredYears));
}

// Education score: check if candidate has required degree keyword
// degrees: bachelor, master, mba, phd
function educationScore(candidateEducation = [], requiredDegree = null) {
  if (!requiredDegree) {
    // no requirement -> full score
    return 1;
  }
  if (!Array.isArray(candidateEducation) || candidateEducation.length === 0) return 0;

  const req = CLEAN(requiredDegree);

  // Map some degree keywords to a level for future use
  const degreePriority = {
    phd: 4,
    doctor: 4,
    master: 3,
    msc: 3,
    mba: 3,
    bachelor: 2,
    bsc: 2,
    bs: 2,
  };

  // check if any candidate education line contains required degree keyword
  for (const edu of candidateEducation) {
    const line = CLEAN(edu.degree || edu.line || "");
    if (!line) continue;
    if (line.includes(req) || req.includes(line)) {
      return 1;
    }
    // also check tokens
    if (line.split(/\s+/).some(tok => req.includes(tok) || tok.includes(req))) {
      return 1;
    }
  }

  // Not exact, but try fuzzy match using priority mapping: if requiredDegree is 'bachelor', any degree >= 2 counts
  if (degreePriority[req]) {
    // find candidate highest degree priority
    let best = 0;
    for (const edu of candidateEducation) {
      const line = CLEAN(edu.degree || edu.line || "");
      for (const k of Object.keys(degreePriority)) {
        if (line.includes(k)) {
          best = Math.max(best, degreePriority[k]);
        }
      }
    }
    return best >= degreePriority[req] ? 1 : 0;
  }

  return 0;
}

// Main ranking function
function rankCandidates(job = {}, candidates = [], options = {}) {
  const weights = { ...DEFAULT_WEIGHTS, ...(options.weights || {}) };

  const reqSkills = (job.requiredSkills || []).map(normalizeSkill).filter(Boolean);
  const reqExp = Number.isFinite(job.minExperience) ? job.minExperience : (job.minExperience || job.minExperience === 0 ? job.minExperience : null);
  const reqDegree = job.requiredDegree || job.requiredDegree === "" ? job.requiredDegree : null;

  const results = candidates.map(candidate => {
    const resume = candidate.resume || {};
    const candSkills = (resume.skills || []).map(normalizeSkill).filter(Boolean);
    const skillScore = skillMatchScore(candSkills, reqSkills);

    const candExpYears = estimateExperienceYears(resume.workExperience || []);
    const expScore = experienceScore(candExpYears, reqExp);

    const eduScore = educationScore(resume.education || [], reqDegree);

    // normalized overall score
    const overall = (skillScore * weights.skills) + (expScore * weights.experience) + (eduScore * weights.education);

    return {
      id: candidate.id,
      name: candidate.name || candidate.id,
      score: Math.round(overall * 10000) / 10000,
      breakdown: {
        skillScore: Math.round(skillScore * 10000) / 10000,
        experienceScore: Math.round(expScore * 10000) / 10000,
        educationScore: Math.round(eduScore * 10000) / 10000,
        candidateYears: candExpYears,
      },
      resume,
    };
  });

  // sort descending
  results.sort((a, b) => b.score - a.score);
  return results;
}

export {
  rankCandidates,
  skillMatchScore,
  estimateExperienceYears,
  experienceScore,
  educationScore,
  normalizeSkill,
};
