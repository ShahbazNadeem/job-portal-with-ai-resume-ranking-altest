import LinkedInProvider from "next-auth/providers/linkedin";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
// import axios from 'axios';
// import bcrypt from 'bcryptjs';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_AI;

export const authOptions = {
    providers: [
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    pages: {
        signIn: '/signin',
    },
    session: {
        strategy: 'jwt',
    },
    // callbacks: {
    //     async jwt({ token, user }) {
    //         if (user) {
    //             token.id = user.Id || user.id;
    //             token.name = user.Name || user.name;
    //             token.email = user.Email || user.email;
    //         }
    //         return token;
    //     },
    //     async session({ session, token }) {
    //         session.user.id = token.id;
    //         session.user.name = token.name;
    //         session.user.email = token.email;
    //         return session;
    //     },

    // },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;

                // Call API to ensure user is saved in DB
                await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                    }),
                });
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
    },

    secret: process.env.AUTH_SECRET,
};
