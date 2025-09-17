"use client"
import axios from 'axios';
import React, { useState } from 'react'

const RecruiterSignup = () => {
  const [users, setUsers] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });
  const [signedUp, setSignedUp] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUsers((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleRecruiterSignup = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/recruiter/signup", {
        name: users.name,
        email: users.email,
        contact: users.contact,
        password: users.password,
      });

      if (data.success) {
        setSignedUp(true);
        setUsers({
          name: "",
          email: "",
          contact: "",
          password: "",
        });
        alert("Signup successful! Now login.");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-xl">
      <div className="w-full">
        <div className="space-y-4 md:space-y-6">
          <h3 className="md:text-2xl text-center text-white">
            Create your new <span className='text-blue-500 font-semibold'>Recruiter</span> account!
          </h3>
          {signedUp &&
            <h3 className="md:text-2xl text-center text-white">
              Now <span className='text-blue-500 font-semibold'>login</span> first
            </h3>
          }
          <form onSubmit={handleRecruiterSignup}>
            <div className="flex flex-wrap gap-2 text-white">
              <div className="w-full sm:w-fit flex flex-col gap-2">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">Company name</label>
                  <input type="text" name="name" id="name" value={users.name} onChange={handleChange} placeholder="Your name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Company email</label>
                  <input type="email" name="email" id="email" value={users.email} onChange={handleChange} placeholder="name@company.com" required />
                </div>

              </div>

              <div className="w-full sm:w-fit flex flex-col gap-2">
                <div>
                  <label htmlFor="contact" className="block mb-2 text-sm font-medium">Company Contact no.</label>
                  <input type="tel" name="contact" id="contact" value={users.contact} onChange={handleChange} placeholder="1234-6789101" autoComplete="tel" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium">Set Password</label>
                  <input type="password" name="password" id="password" value={users.password} onChange={handleChange} placeholder="••••••••" required />
                </div>
              </div>
            </div>
            <button type="submit" className="w-full mt-5 button1">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RecruiterSignup