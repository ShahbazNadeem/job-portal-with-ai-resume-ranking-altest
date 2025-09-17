"use client";
import { useAdmin } from "@/context/AdminContext";
import AdminLogin from "../_components/admin/AdminLogin";
import Lottie from "lottie-react";
import adminLogin from '../../../public/images/lottieFiles/adminLogin.json'
import AdminDashboardHeader from "../_components/admindashboardlayout/AdminDashboardHeader";
import { useEffect } from "react";


export default function AdminDashboard({ children }) {

  const { admin } = useAdmin()

  useEffect(() => {
    document.title = admin ? 'Admin Dashboard' : 'Admin Login - Signup';
  }, [admin]);


  if (!admin) {
    return (
      <div className="container">
        <div className="min-h-screen flex justify-center items-center gap-10">
          <div className="hidden basis-[50%] lg:flex justify-center items-center "><Lottie animationData={adminLogin} style={{ height: 600 }} /></div>
          <div className="lg:basis-[50%]"><AdminLogin /></div>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="container ">
        <AdminDashboardHeader />
        {children}
      </div>
    </section>
  );
}
