"use server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export default async function CreateAccount(name: string, email: string, password: string){
    try {
        const user  = await prisma.user.create({
            data:{
                name: name,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password, 10),
            }
        })
        const { password: _, ...userWithoutPassword } = user;
        return {
            ok: true,
            user: userWithoutPassword,
            message: 'Usuario creado correctamente'
        }

    }catch (error){
        console.log({error})
        return {
            ok: false,
            message: 'Error al crear el usuario'
        }
    }
}