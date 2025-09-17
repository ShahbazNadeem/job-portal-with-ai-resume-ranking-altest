// 'use client';
// import React, { useEffect, useState } from "react";
// import Layout from "../_components/layout/Layout";
// import { useSession, signOut } from "next-auth/react";
// import { useUser } from "@/context/UserContext";
// import UserSigninSwitcher from "../_components/user/UserSigninSwitcher";
// import { useRouter } from "next/navigation";
// import UploadResume from "../_components/UploadResume";

// // ✅ helper function
// const hasResumeData = (resume) => {
//   if (!resume) return false;
//   const { personal, skills, workExperience, education, certifications, projects } = resume;

//   return (
//     (personal && Object.keys(personal).length > 0) ||
//     (skills && skills.length > 0) ||
//     (workExperience && workExperience.length > 0) ||
//     (education && education.length > 0) ||
//     (certifications && certifications.length > 0) ||
//     (projects && projects.length > 0)
//   );
// };

// export default function UserProfilePage() {
//   const { data: session } = useSession();
//   const { logout, updateUser } = useUser();
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     if (!session?.user?.email) return;
//     if (userData) return;

//     document.title = "User Profile";
//     setLoading(true);

//     fetch(`/api/user?email=${session.user.email}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setUserData(data.user);
//           updateUser(data.user);
//         }
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [session?.user?.email, updateUser]);

//   if (!session) {
//     return (
//       <Layout>
//         <section>
//           <div className="bg-[url('/images/recruiter/background.jpg')] bg-cover bg-center min-h-screen">
//             <div className="container">
//               <div className="flex items-center justify-center h-screen">
//                 <div className="pt-10 xl:pt-10 2xl:pt-0">
//                   <div className="pb-8 sm:max-w-fit mx-auto rounded-2xl mt-5 bg-[#ffffff15] backdrop-blur-md">
//                     <UserSigninSwitcher />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </Layout>
//     );
//   }

//   if (loading) {
//     return (
//       <Layout>
//         <div className="flex items-center justify-center min-h-screen">
//           <p className="text-lg font-medium text-gray-600">Loading profile...</p>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="container mx-auto py-8 px-4 h-screen flex flex-col md:flex-row gap-6">
//         {/* Sidebar */}
//         <div className="md:w-1/3 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4">
//           <img
//             src={userData?.image || "/images/default-avatar.png"}
//             alt="User Avatar"
//             className="w-28 h-28 rounded-full border object-cover"
//           />
//           <span className="text-2xl font-bold text-gray-800">{userData?.name}</span>
//           <p className="text-gray-600">{userData?.email}</p>
//           <button
//             onClick={() => {
//               signOut();
//               logout();
//             }}
//             className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 w-full"
//           >
//             Sign Out
//           </button>
//           <button
//             onClick={() => router.push(`/user/update/${userData._id}`)}
//             className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 w-full"
//           >
//             Update Profile
//           </button>
//         </div>

//         {/* Main Content */}
//         <div className={`md:w-2/3 bg-white rounded-2xl shadow-lg ${hasResumeData(userData?.resume) && 'p-6'} overflow-y-auto flex-1`}>
//           {!hasResumeData(userData?.resume) ? (
//             // ✅ No resume data
//             <div className="flex items-center justify-center h-full border">
//               <div className="text-center">
//                 <p className="text-gray-600 mb-4">You haven’t uploaded your resume yet.</p>
//                 <UploadResume />
//               </div>
//             </div>
//           ) : (
//             // ✅ Resume exists
//             <div className="space-y-4">
//               {userData.resume.personal && Object.keys(userData.resume.personal).length > 0 && (
//                 <div className="border p-4 rounded-lg bg-gray-50">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-4">Resume</h3>
//                   <h4 className="font-medium text-gray-700 mb-2">Personal Info</h4>
//                   <p>Name: {userData.resume.personal.name}</p>
//                   <p>Email: {userData.resume.personal.email}</p>
//                   <p>Phone: {userData.resume.personal.phone}</p>
//                   <p>Location: {userData.resume.personal.location}</p>
//                 </div>
//               )}

//               {userData.resume.skills?.length > 0 && (
//                 <div className="border p-4 rounded-lg bg-gray-50">
//                   <h4 className="font-medium text-gray-700 mb-2">Skills</h4>
//                   <ul className="list-disc ml-6 text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-1">
//                     {userData.resume.skills.map((skill, idx) => (
//                       <li key={idx}>{skill}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {userData.resume.projects?.length > 0 && (
//                 <div className="border p-4 rounded-lg bg-gray-50">
//                   <h4 className="font-medium text-gray-700 mb-2">Projects</h4>
//                   <ul className="list-disc ml-6 text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-1">
//                     {userData.resume.projects.map((proj, idx) => (
//                       <li key={idx}>{proj.line}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {userData.resume.workExperience?.length > 0 && (
//                 <div className="border p-4 rounded-lg bg-gray-50">
//                   <h4 className="font-medium text-gray-700 mb-2">Work Experience</h4>
//                   <div className="space-y-2">
//                     {userData.resume.workExperience.map((exp, idx) => (
//                       <div key={idx} className="bg-white p-2 rounded-md shadow-sm">
//                         <p className="font-semibold">
//                           {exp.role} {exp.role && "@"} {exp.line}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           {exp.startDate} - {exp.endDate || "Present"}
//                         </p>
//                         <p className="text-gray-600">{exp.description}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {userData.resume.education?.length > 0 && (
//                 <div className="border p-4 rounded-lg bg-gray-50">
//                   <h4 className="font-medium text-gray-700 mb-2">Education</h4>
//                   <ul className="list-disc ml-6 text-gray-600">
//                     {userData.resume.education.map((edu, idx) => (
//                       <li key={idx}>{edu.line}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// }
// ----------------------------------------------------------------------------------------------------
// 'use client';
// import React, { useEffect, useState } from "react";
// import Layout from "../_components/layout/Layout";
// import { useSession, signOut } from "next-auth/react";
// import { useUser } from "@/context/UserContext";
// import UserSigninSwitcher from "../_components/user/UserSigninSwitcher";
// import { useRouter } from "next/navigation";
// import UploadResume from "../_components/UploadResume";

// // Helper: check if resume has any real data
// const hasResumeData = (resume) => {
//   if (!resume) return false;
//   const { personal, skills, workExperience, education, certifications, projects } = resume;

//   const hasPersonal =
//     personal &&
//     Object.values(personal).some(v => v && String(v).trim().length > 0);

//   return Boolean(
//     hasPersonal ||
//     (skills && skills.length > 0) ||
//     (workExperience && workExperience.length > 0) ||
//     (education && education.length > 0) ||
//     (certifications && certifications.length > 0) ||
//     (projects && projects.length > 0)
//   );
// };

// export default function UserProfilePage() {
//   const { data: session } = useSession();
//   const { logout, updateUser } = useUser();
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   // Fetch DB user once per session email
//   useEffect(() => {
//     if (!session?.user?.email) return;
//     if (userData) return;

//     document.title = "User Profile";
//     setLoading(true);

//     fetch(`/api/user?email=${encodeURIComponent(session.user.email)}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data?.success && data.user) {
//           setUserData(data.user);
//           updateUser(data.user); // put DB user into context
//         }
//       })
//       .finally(() => setLoading(false));
//   }, [session?.user?.email, updateUser, userData]);

//   if (!session) {
//     return (
//       <Layout>
//         <section>
//           <div className="bg-[url('/images/recruiter/background.jpg')] bg-cover bg-center min-h-screen">
//             <div className="container">
//               <div className="flex items-center justify-center h-screen">
//                 <div className="pt-10 xl:pt-10 2xl:pt-0">
//                   <div className="pb-8 sm:max-w-fit mx-auto rounded-2xl mt-5 bg-[#ffffff15] backdrop-blur-md">
//                     <UserSigninSwitcher />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </Layout>
//     );
//   }

//   if (loading) {
//     return (
//       <Layout>
//         <div className="flex items-center justify-center min-h-screen">
//           <p className="text-lg font-medium text-gray-600">Loading profile...</p>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="container mx-auto py-8 px-4 h-screen flex flex-col md:flex-row gap-6">
//         {/* Sidebar */}
//         <div className="md:w-1/3 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4">
//           <img
//             src={userData?.image || "/images/default-avatar.png"}
//             alt="User Avatar"
//             className="w-28 h-28 rounded-full border object-cover"
//           />
//           <span className="text-2xl font-bold text-gray-800">{userData?.name}</span>
//           <p className="text-gray-600">{userData?.email}</p>
//           <button
//             onClick={() => {
//               signOut();
//               logout();
//             }}
//             className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 w-full"
//           >
//             Sign Out
//           </button>
//           <button
//             onClick={() => router.push(`/user/update/${userData._id}`)}
//             className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 w-full"
//           >
//             Update Profile
//           </button>
//         </div>

//         {/* Main Content */}
//         <div className={`md:w-2/3 bg-white rounded-2xl shadow-lg ${hasResumeData(userData?.resume) ? 'p-6' : ''} overflow-y-auto flex-1`}>
//           {!hasResumeData(userData?.resume) ? (
//             <div className="flex items-center justify-center h-full border">
//               <div className="text-center">
//                 <p className="text-gray-600 mb-4">You haven’t uploaded your resume yet.</p>
//                 <UploadResume />
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {/* Personal */}
//               {userData.resume.personal && Object.values(userData.resume.personal).some(Boolean) && (
//                 <div className="border p-4 rounded-lg bg-gray-50">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-4">Resume</h3>
//                   <h4 className="font-medium text-gray-700 mb-2">Personal Info</h4>
//                   {userData.resume.personal.summary && (
//                     <p className="text-gray-700 mb-2">{userData.resume.personal.summary}</p>
//                   )}
//                   <p><span className="font-medium">Name:</span> {userData.resume.personal.name}</p>
//                   <p><span className="font-medium">Email:</span> {userData.resume.personal.email}</p>
//                   <p><span className="font-medium">Phone:</span> {userData.resume.personal.phone}</p>
//                   <p><span className="font-medium">Location:</span> {userData.resume.personal.location}</p>
//                 </div>
//               )}

//               {/* Skills (strings) */}
//               {Array.isArray(userData.resume.skills) && userData.resume.skills.length > 0 && (
//                 <div className="border p-4 rounded-lg bg-gray-50">
//                   <h4 className="font-medium text-gray-700 mb-2">Skills</h4>
//                   <ul className="list-disc ml-6 text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-1">
//                     {userData.resume.skills.map((skill, idx) => (
//                       <li key={idx}>{skill}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {/* Projects */}
//               {Array.isArray(userData.resume.projects) && userData.resume.projects.length > 0 && (
//                 <div className="border p-4 rounded-lg bg-gray-50">
//                   <h4 className="font-medium text-gray-700 mb-2">Projects</h4>
//                   <ul className="list-disc ml-6 text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-1">
//                     {userData.resume.projects.map((proj, idx) => (
//                       <li key={idx}>{proj.line || proj.name || "-"}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {/* Work Experience */}
//               {Array.isArray(userData.resume.workExperience) && userData.resume.workExperience.length > 0 && (
//                 <div className="border p-4 rounded-lg bg-gray-50">
//                   <h4 className="font-medium text-gray-700 mb-2">Work Experience</h4>
//                   <div className="space-y-2">
//                     {userData.resume.workExperience.map((exp, idx) => (
//                       <div key={idx} className="bg-white p-2 rounded-md shadow-sm">
//                         <p className="font-semibold">
//                           {(exp.role || "")}{exp.role ? " @" : ""} {exp.company || exp.line || "-"}
//                         </p>
//                         {(exp.startDate || exp.endDate) && (
//                           <p className="text-sm text-gray-500">
//                             {exp.startDate || "—"} - {exp.endDate || "Present"}
//                           </p>
//                         )}
//                         {exp.description && <p className="text-gray-600">{exp.description}</p>}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Education */}
//               {Array.isArray(userData.resume.education) && userData.resume.education.length > 0 && (
//                 <div className="border p-4 rounded-lg bg-gray-50">
//                   <h4 className="font-medium text-gray-700 mb-2">Education</h4>
//                   <ul className="list-disc ml-6 text-gray-600">
//                     {userData.resume.education.map((edu, idx) => (
//                       <li key={idx}>
//                         {edu.line ||
//                           [edu.degree, edu.field, edu.school].filter(Boolean).join(" · ") ||
//                           "-"}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// }

// ----------------------------------------------------------------------------------------------------

// app/user-signin/page.jsx
'use client';
import React, { useEffect, useState } from "react";
import Layout from "../_components/layout/Layout";
import { useSession, signOut } from "next-auth/react";
import { useUser } from "@/context/UserContext";
import UserSigninSwitcher from "../_components/user/UserSigninSwitcher";
import { useRouter } from "next/navigation";
import UploadResume from "../_components/UploadResume";

const hasResumeData = (resume) => {
  if (!resume) return false;
  const { personal, skills, workExperience, education, certifications, projects } = resume;

  const hasPersonal =
    personal &&
    Object.values(personal).some(v => v && String(v).trim().length > 0);

  return Boolean(
    hasPersonal ||
    (skills && skills.length > 0) ||
    (workExperience && workExperience.length > 0) ||
    (education && education.length > 0) ||
    (certifications && certifications.length > 0) ||
    (projects && projects.length > 0)
  );
};

export default function UserProfilePage() {
  const { data: session } = useSession();
  const { logout, updateUser } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.email) return;
    if (userData) return;

    document.title = "User Profile";
    setLoading(true);

    fetch(`/api/user?email=${encodeURIComponent(session.user.email)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data.user) {
          setUserData(data.user);
          updateUser(data.user);
        }
      })
      .finally(() => setLoading(false));
  }, [session?.user?.email, updateUser, userData]);

  if (!session) {
    return (
      <Layout>
        <section>
          <div className="bg-[url('/images/recruiter/background.jpg')] bg-cover bg-center min-h-screen">
            <div className="container">
              <div className="flex items-center justify-center h-screen">
                <div className="pt-10 xl:pt-10 2xl:pt-0">
                  <div className="pb-8 sm:max-w-fit mx-auto rounded-2xl mt-5 bg-[#ffffff15] backdrop-blur-md">
                    <UserSigninSwitcher />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg font-medium text-gray-600">Loading profile...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 h-screen flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-1/3 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4">
          {userData?.image &&
            <img
              src={userData?.image || "/images/default-avatar.png"}
              alt="User Avatar"
              className="w-28 h-28 rounded-full border object-cover"
            />
          }
          <span className="text-2xl font-bold text-gray-800">{userData?.name}</span>
          <p className="text-gray-600">{userData?.email}</p>
          <button
            onClick={() => router.push(`/user-signin/applied-jobs/${userData._id}`)}
            className="mt-2 px-4 py-2 button1 w-full"
          >
            Applied Jobs
          </button>
          <button
            onClick={() => router.push(`/user/update/${userData._id}`)}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 w-full"
          >
            Update Profile
          </button>
          <button
            onClick={() => {
              signOut();
              logout();
            }}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 w-full"
          >
            Sign Out
          </button>
        </div>

        {/* Main Content */}
        <div className={`md:w-2/3 bg-white rounded-2xl shadow-lg ${hasResumeData(userData?.resume) ? 'p-6' : ''} overflow-y-auto flex-1`}>
          {!hasResumeData(userData?.resume) ? (
            <div className="flex items-center justify-center h-full border">
              <div className="text-center">
                <p className="text-gray-600 mb-4">You haven’t uploaded your resume yet.</p>
                <UploadResume />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Personal */}
              {userData.resume.personal && Object.values(userData.resume.personal).some(Boolean) && (
                <div className="border p-4 rounded-lg bg-gray-50">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Resume</h3>
                  <h4 className="font-medium text-gray-700 mb-2">Personal Info</h4>
                  {userData.resume.personal.summary && (
                    <p className="text-gray-700 mb-2">{userData.resume.personal.summary}</p>
                  )}
                  <p><span className="font-medium">Name:</span> {userData.resume.personal.name}</p>
                  <p><span className="font-medium">Email:</span> {userData.resume.personal.email}</p>
                  <p><span className="font-medium">Phone:</span> {userData.resume.personal.phone}</p>
                  <p><span className="font-medium">Location:</span> {userData.resume.personal.location}</p>
                </div>
              )}

              {/* Skills */}
              {Array.isArray(userData.resume.skills) && userData.resume.skills.length > 0 && (
                <div className="border p-4 rounded-lg bg-gray-50">
                  <h4 className="font-medium text-gray-700 mb-2">Skills</h4>
                  <ul className="list-disc ml-6 text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {userData.resume.skills.map((skill, idx) => (
                      <li key={idx}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Projects */}
              {Array.isArray(userData.resume.projects) && userData.resume.projects.length > 0 && (
                <div className="border p-4 rounded-lg bg-gray-50">
                  <h4 className="font-medium text-gray-700 mb-2">Projects</h4>
                  <ul className="list-disc ml-6 text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {userData.resume.projects.map((proj, idx) => (
                      <li key={idx}>{proj.line || proj.name || "-"}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Work Experience */}
              {Array.isArray(userData.resume.workExperience) && userData.resume.workExperience.length > 0 && (
                <div className="border p-4 rounded-lg bg-gray-50">
                  <h4 className="font-medium text-gray-700 mb-2">Work Experience</h4>
                  <div className="space-y-2">
                    {userData.resume.workExperience.map((exp, idx) => (
                      <div key={idx} className="bg-white p-2 rounded-md shadow-sm">
                        <p className="font-semibold">
                          {(exp.role || "")}{exp.role ? " @" : ""} {exp.company || exp.line || "-"}
                        </p>
                        {(exp.startDate || exp.endDate) && (
                          <p className="text-sm text-gray-500">
                            {exp.startDate || "—"} - {exp.endDate || "Present"}
                          </p>
                        )}
                        {exp.description && <p className="text-gray-600">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {Array.isArray(userData.resume.education) && userData.resume.education.length > 0 && (
                <div className="border p-4 rounded-lg bg-gray-50">
                  <h4 className="font-medium text-gray-700 mb-2">Education</h4>
                  <ul className="list-disc ml-6 text-gray-600">
                    {userData.resume.education.map((edu, idx) => (
                      <li key={idx}>
                        {edu.line ||
                          [edu.degree, edu.field, edu.school].filter(Boolean).join(" · ") ||
                          "-"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
