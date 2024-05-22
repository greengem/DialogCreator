import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async signIn({ user }) {
            // Ensure email is a non-null string
            if (!user.email) {
                console.error("User email is undefined");
                return false;
            }

            return true;
        },
    },
    events: {
        async createUser({ user }) {
            // Ensure email is a non-null string
            if (!user.email) {
                console.error("User email is undefined");
                return;
            }

            // Add records to the database for the first-time user
            try {
                const flow = await prisma.flow.create({
                    data: {
                        user: {
                            connect: {
                                email: user.email,
                            },
                        },
                        name: "default-flow",
                        nodes: {
                            create: [
                                {
                                    type: "characters",
                                    data: { characters: ["Player", "Narrator"] },
                                    position: { x: 250, y: 5 },
                                },
                            ],
                        },
                    },
                    include: {
                        nodes: true,
                    },
                });
            } catch (error) {
                console.error("Error creating flow: ", error);
            }
        },
    },
});
