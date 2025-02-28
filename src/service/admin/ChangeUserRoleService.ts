"use server";

import {auth} from "@/config/authConfig";
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export async function changeUserRole(userId: string, role: string) {
    try {
        const session = await auth();
        if (session?.user.rol !== 'ADMIN') {
            return {
                ok: false,
                message: 'No tienes permiso para realizar esta accion'
            }
        }
        const newRol = role? 'USER' : 'ADMIN';
        const user = await prisma.user.update({
            where: { id: userId },
            data: { rol: newRol }
        });
        revalidatePath('/shop/admin/users');
        return {
            ok: true,
            message: 'Rol cambiado correctamente',
            user: user
        }

    }catch (error){
        console.log(error);
        return{
            ok: false,
            message: 'Error al cambiar el rol'
        }
    }
}