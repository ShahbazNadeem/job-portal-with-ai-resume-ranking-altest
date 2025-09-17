'use client';
import { useUser } from "@/context/UserContext";
import React, { useState } from "react";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const { user } = useUser(); // get logged-in user

  const handleUpload = async () => {
    if (!file) return;
    if (!user?.email) return alert("User not logged in!");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("email", user.email); // send email from context

    const res = await fetch("/api/resume/save", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload Resume</button>
    </div>
  );
}
