"use client";
import React, { useEffect } from "react";
import { useRecruiter } from "@/context/RecruiterContext";
import RecruiterSigninSwitcher from "../_components/recruiter/RecruiterSigninSwitcher";
import RecuiterDashboardHeader from "../_components/recuiterdashboardlayout/RecuiterDashboardHeader";

const RecruiterDashboard = ({ children }) => {
    const { recruiter } = useRecruiter();

    if (!recruiter) {
        return <>
            <section>
                <div className="bg-[url('/images/login/userLogin.jpg')] bg-cover bg-center min-h-screen">
                    <div className="container">
                        <div className="flex items-center justify-center h-screen">
                            <div className="pt-10 xl:pt-10 2xl:pt-0">
                                <div className="pb-8 sm:max-w-fit mx-auto rounded-2xl mt-5 bg-[#ffffff15] backdrop-blur-md">
                                    <RecruiterSigninSwitcher />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>;
    }

    if (recruiter) {
        useEffect(() => {
            document.title = 'Dashboard';
        }, []);
    }

    return (
        <section className="bg-gray-100 min-h-screen">
            <div className="container ">
                    <RecuiterDashboardHeader />
                {children}
            </div>
        </section>
    );
};

export default RecruiterDashboard;
