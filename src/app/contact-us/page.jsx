// 'use client'
// import React, { useEffect } from 'react'
// import Layout from '../_components/layout/Layout'

// const page = () => {
//    useEffect(() => {
//       document.title = 'About US';
//     }, []);
//   return (
//     <Layout>
//       <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
//           {/* Page Heading */}
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
//           <p className="text-gray-600 mb-8">
//             We’d love to hear from you! Whether you have a question, feedback, or
//             a business inquiry, our team is here to help. Fill out the form below,
//             and we’ll get back to you as soon as possible.
//           </p>

//           {/* Contact Form */}
//           <form className="space-y-6">
//             {/* Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Your Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="John Doe"
//                 className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 placeholder="you@example.com"
//                 className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>

//             {/* Contact Number */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Contact Number
//               </label>
//               <input
//                 type="tel"
//                 placeholder="+1 234 567 890"
//                 className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>

//             {/* Message */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Your Message
//               </label>
//               <textarea
//                 rows="4"
//                 placeholder="Write your message..."
//                 className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               ></textarea>
//             </div>

//             {/* Submit Button */}
//             <div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Send Message
//               </button>
//             </div>
//           </form>

//           {/* Optional Contact Info Section */}
//           <div className="mt-10 border-t pt-6 text-sm text-gray-600">
//             <p>📍 123 Business Street, City, Country</p>
//             <p>📞 +1 (234) 567-890</p>
//             <p>📧 support@example.com</p>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   )
// }

// export default page


'use client'
import React, { useEffect, useState } from 'react'
import Layout from '../_components/layout/Layout'

const page = () => {
  useEffect(() => {
    document.title = 'Contact US';
  }, []);

  const [form, setForm] = useState({ name: '', email: '', contact: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    setForm({ name: '', email: '', contact: '', message: '' });
  };

  return (
    <Layout>

      <section className="relative min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')]"></div>

        <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-8">
            Have questions? We'd love to hear from you. Fill out the form below and our team will get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium text-gray-700">Contact Number</label>
              <input
                type="tel"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="Enter your contact number"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium text-gray-700">Your Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Type your message..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default page;
