'use client';

import React from 'react';
import { UserProvider } from '@/context/UserContext';
import { RecruiterProvider } from '@/context/RecruiterContext';
import { AdminProvider } from '@/context/AdminContext';
import { SessionProvider } from "next-auth/react"
import { JobsProvider } from '@/context/JobsContext';
import { ManageRecruiterProvider } from '@/context/ManageRecruitersContext';
import { AppliedJobsProvider } from '@/context/AppliedJobsContext';
import { RankingsProvider } from '@/context/RankingsContext';
import { AllUsersProvider } from '@/context/allUsersContext';

export function Provider({ children }) {
    return (
        <>
            <RankingsProvider>
                <AllUsersProvider>
                    <JobsProvider>
                        <AppliedJobsProvider>
                            <AdminProvider>
                                <ManageRecruiterProvider>
                                    <RecruiterProvider>
                                        <SessionProvider>
                                            <UserProvider>
                                                {children}
                                            </UserProvider>
                                        </SessionProvider>
                                    </RecruiterProvider>
                                </ManageRecruiterProvider>
                            </AdminProvider>
                        </AppliedJobsProvider>
                    </JobsProvider>
                </AllUsersProvider>
            </RankingsProvider>
        </>
    )
}