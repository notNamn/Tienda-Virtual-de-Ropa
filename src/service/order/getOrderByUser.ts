"use server";


import {auth} from "@/config/authConfig";
import prisma from "@/lib/prisma";

export async function getOrderByUser() {
    try {
        const session  = await auth();
        const userId = session?.user.id;
        if (!userId) {
            return{
                ok: false,
                message: 'No hay session de usuario, error 500 '
            }
        }
        const orders = await prisma.order.findMany({
            where: { userId: userId },
            include:{
                OrderAddress: {
                    select:{
                        name: true,
                        lastName: true,
                    }
                }
            }
        })

        return {
            ok: true,
            orders: orders,
        }

    }catch (error){
        console.log(error)
        return {
            ok: false,
            message: 'Error al obtener la orden'
        }

    }
}