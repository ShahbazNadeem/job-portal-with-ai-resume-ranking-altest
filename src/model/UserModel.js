// import mongoose from "mongoose";

// const ResumeSchema = new mongoose.Schema({
//     personal: { name: String, email: String, phone: String, location: String },
//     workExperience: [{ line: String, company: String, role: String, startDate: String, endDate: String, description: String }],
//     education: [{ line: String }],
//     skills: [String],
//     projects: [{ line: String }],
//     certifications: [{ line: String }],
//     keywords: [String]
// }, { _id: false });

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     image: { type: String },
//     resume: ResumeSchema
// }, { timestamps: true });

// export default mongoose.models?.user || mongoose.model("user", UserSchema);

// model/UserModel.js
import mongoose from "mongoose";

const WorkSchema = new mongoose.Schema(
  {
    line: String,
    company: String,
    role: String,
    startDate: String,
    endDate: String,
    description: String,
  },
  { _id: false }
);

const EducationSchema = new mongoose.Schema(
  {
    line: String,
    school: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
  },
  { _id: false }
);

const ProjectSchema = new mongoose.Schema(
  {
    line: String,
    name: String,
    description: String,
    link: String,
    techStack: [String],
  },
  { _id: false }
);

const CertificationSchema = new mongoose.Schema(
  {
    line: String,
    title: String,
    issuer: String,
    date: String,
  },
  { _id: false }
);

const ResumeSchema = new mongoose.Schema(
  {
    personal: {
      name: String,
      email: String,
      phone: String,
      location: String,
      summary: String,
    },
    workExperience: [WorkSchema],
    education: [EducationSchema],
    skills: [String],            // simple string array (matches UI)
    projects: [ProjectSchema],
    certifications: [CertificationSchema],
    keywords: [String],
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    resume: ResumeSchema,
  },
  { timestamps: true }
);

export default mongoose.models?.user || mongoose.model("user", UserSchema);
