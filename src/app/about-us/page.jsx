// 'use client'
// import React, { useEffect } from 'react'
// import Layout from '../_components/layout/Layout'
// import Lottie from 'lottie-react'
// import creativeTeam from '../../../public/images/lottieFiles/creativeTeam.json'
// import Link from 'next/link'

// const page = () => {
//   useEffect(() => {
//     document.title = 'About US';
//   }, []);
//   return (
//     <Layout>
//       <div className="bg-gray-50">
//         {/* Header Section */}
//         <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
//           <div className="container mx-auto px-6 text-center">
//             <h1 className="text-4xl font-bold mb-4">About Us</h1>
//             <p className="text-lg max-w-2xl mx-auto">
//               We craft digital experiences that empower businesses and individuals
//               to succeed in a fast-paced, technology-driven world.
//             </p>
//           </div>
//         </section>

//         {/* Company Story */}
//         <section className="py-16 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               Who We Are
//             </h2>
//             <p className="text-gray-600 mb-4">
//               Welcome to <strong>Your Company Name</strong>, where innovation meets
//               dedication. Our team of passionate developers, designers, and thinkers
//               are committed to delivering high-quality digital solutions that empower
//               businesses and individuals to thrive.
//             </p>
//             <p className="text-gray-600">
//               We believe in excellence, innovation, integrity, and customer success.
//               Our mission is to transform your ideas into reality through cutting-edge
//               technology and world-class design.
//             </p>
//           </div>
//           <div>
//             <Lottie animationData={creativeTeam} />
//             {/* <img
//               src="/images/about/team.jpg"
//               alt="Our Team"
//               className="rounded-xl shadow-lg"
//             /> */}
//           </div>
//         </section>

//         {/* Values Section */}
//         <section className="bg-white py-16">
//           <div className="container mx-auto px-6">
//             <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//               Our Core Values
//             </h2>
//             <div className="grid md:grid-cols-4 gap-8">
//               {[
//                 { title: "Excellence", desc: "Delivering top-quality results every time." },
//                 { title: "Innovation", desc: "Staying ahead with modern technologies." },
//                 { title: "Integrity", desc: "Building trust through transparency." },
//                 { title: "Customer Success", desc: "Your growth is our success." },
//               ].map((value, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
//                 >
//                   <h3 className="text-xl font-semibold text-blue-600 mb-2">
//                     {value.title}
//                   </h3>
//                   <p className="text-gray-600">{value.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Call to Action */}
//         <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 text-center text-white">
//           <h2 className="text-3xl font-bold mb-4">Let’s Build Something Amazing</h2>
//           <p className="mb-6">
//             Partner with us to bring your vision to life with world-class technology and design.
//           </p>
//           <Link href="/contact-us"
//             className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
//           >
//             Contact Us
//           </Link>
//         </section>
//       </div>
//     </Layout>
//   )
// }

// export default page
'use client'
import React, { useEffect } from 'react'
import Layout from '../_components/layout/Layout'
import Lottie from 'lottie-react'
import creativeTeam from '../../../public/images/lottieFiles/creativeTeam.json'
import { motion } from 'framer-motion'
import Link from 'next/link'

const page = () => {
  useEffect(() => {
    document.title = 'About Us'
  }, [])

  return (
    <Layout>
      <div className="bg-gray-50">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <motion.div
            className="container mx-auto px-6 text-center"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-lg max-w-2xl mx-auto">
              We craft meaningful digital solutions that empower recruiters and candidates,
              making hiring smarter, faster, and more human.
            </p>
          </motion.div>
        </section>

        {/* Company Story */}
        <section className="py-16 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Who We Are</h2>
            <p className="text-gray-600 mb-4">
              Welcome to <strong>SmartHire</strong>, a platform designed to bridge the gap between
              recruiters and job seekers. We go beyond just job postings—our AI-driven ranking system
              ensures candidates are matched with opportunities that truly fit.
            </p>
            <p className="text-gray-600">
              From effortless resume parsing to recruiter dashboards, every feature is built to
              simplify the hiring journey. Our vision is simple: create a recruitment process that feels
              less transactional and more meaningful.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Lottie animationData={creativeTeam} loop className="max-w-md mx-auto" />
          </motion.div>
        </section>


        {/* Features / What We Do */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6">
            <motion.span
              className="text-3xl font-bold text-center text-gray-800 mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              What We Bring to the Table
            </motion.span>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "AI Candidate Ranking",
                  desc: "Our AI evaluates resumes against job requirements and ranks candidates instantly, helping recruiters focus on the best fit first."
                },
                {
                  title: "Smart Job Matching",
                  desc: "Job seekers discover opportunities that align with their skills and experience, making applications more meaningful."
                },
                {
                  title: "Recruiter Dashboard",
                  desc: "A streamlined control panel where recruiters can manage postings, track applications, and take actions with one click."
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold text-blue-600 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Values Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-6">
            <motion.span
              className="text-3xl font-bold text-center text-gray-800 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Our Core Values
            </motion.span>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: 'Excellence', desc: 'We focus on delivering polished and reliable experiences.' },
                { title: 'Innovation', desc: 'From AI ranking to smart dashboards, we build future-ready tools.' },
                { title: 'Integrity', desc: 'Trust is the foundation of how we work and what we build.' },
                { title: 'Empowerment', desc: 'Helping both recruiters and candidates reach their goals.' },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <motion.section
          className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 text-center text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Let’s Build the Future of Hiring</h2>
          <p className="mb-6">
            Whether you’re a recruiter or a candidate, join us in creating a smarter and more human hiring journey.
          </p>
          <Link
            href="/contact-us"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Contact Us
          </Link>
        </motion.section>
      </div>
    </Layout>
  )
}

export default page
