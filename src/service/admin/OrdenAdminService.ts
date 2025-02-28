"use server";
import {auth} from "@/config/authConfig";
import prisma from "@/lib/prisma";

interface pagination{
    page?: number;
    take?: number
}

export async function getAllOrderPaginateAdmin(){
    try {
        const session = await auth();
        if (session?.user.rol !== 'ADMIN') {
            return {
                ok: false,
                message: 'No tienes permiso para realizar esta accion'
            }
        }

        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: 'desc'
            },
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
            orders: orders
        }
    }catch (error){
        console.log(error);
        return {
            ok: false,
            orders:[]
        }
    }
}