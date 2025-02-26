"use server";

import prisma from "@/lib/prisma";
import {auth} from "@/config/authConfig";

export async function getOrderById(id: string) {
    try {
        const session = await auth();
        if (!session?.user) {
            return {
                ok: false,
                message: 'No hay session de usuario, error 500 '
            }
        }
        const order = await prisma.order.findUnique({
            where: { id: id },
            include:{
                OrderAddress: true,
                OrderItems: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,
                        product:{
                            select:{
                                title: true,
                                slug: true,
                                images: {
                                    select:{
                                        url: true,
                                    },
                                    take:1
                                }
                            }
                        }
                    }
                }
            }
        })
        if (!order) {
            throw Error('El pedido no existe, ' + id);
        }
        if (session.user.rol === "USER"){
            if (order.userId !== session.user.id){
                throw Error('El pedido no pertenece al usuario');
            }
        }

        return {
            ok: true,
            order: order
        }


    }catch (error) {
        console.log(error)

        return{
            ok: false,
            message: 'Error al obtener el pedido'
        }
    }
}