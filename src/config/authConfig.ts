import NextAuth, {NextAuthConfig} from "next-auth";
import Google from "next-auth/providers/google";
import Credential from "next-auth/providers/credentials";
import z from "zod";
import prisma from "@/lib/prisma";
import bcrycptjs from "bcryptjs";

export const authOptions: NextAuthConfig = {

    callbacks: {
        async jwt({token, user}){
            // el usuario es enviado de (1)
            if (user){
                token.data = user
            }
            //console.log('Callback jwt  ', {token, user})
            return token
        },
        session({session, token, user}){
           // console.log(' callback  session',{session, token, user})
            session.user = token.data as any;
            return session
        },
    },

    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
        Credential({
            async authorize(credentials){
                const parsedCredentials = z.object({
                    email: z.string().email(),
                    password: z.string().min(4),
                }).safeParse(credentials);

                if(!parsedCredentials.success){
                    return null;
                }
                const { email, password } = parsedCredentials.data;
                // bucar el usuari
                const user = await prisma.user.findUnique({
                    where: {
                        email: email.toLowerCase(),
                    }
                });

                if(!user || !user.password){
                    return null;
                }
                // comparar contraseñas
                if (!bcrycptjs.compareSync(password, user.password)){
                    return null;
                }
                // Retornar usuario sin la contraseña
                const { password: _, ...userWithoutPassword } = user;
                // (1) envia datos del usuario a jwt
                return userWithoutPassword;
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/new-account",
    },



};

export const { auth, handlers , signIn, signOut} = NextAuth(authOptions);