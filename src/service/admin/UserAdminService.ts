"use server";
import prisma from "@/lib/prisma";
import {auth} from "@/config/authConfig";



export async function getAllUsers() {
    try {
        const session = await auth();
        if (session?.user.rol !== 'ADMIN') {
            return {
                ok: false,
                message: 'No tienes permiso para realizar esta accion'
            }
        }
        const users = await prisma.user.findMany({});
        return {
            ok: true,
            users: users
        }
    }catch (error) {
        console.log(error);
        return {
            ok: false,
            users: [],
        }

    }
}