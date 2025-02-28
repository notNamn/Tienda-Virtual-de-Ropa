import prisma from "@/lib/prisma";
import {notFound} from "next/navigation";


export async function getOneProductBySlug(slug : string){
    try {
        const product = await prisma.product.findFirst({
            where:{
                slug: slug,
            },
            include:{
                images:{
                    select:{
                        id: true,
                        url: true,
                    }
                }
            }
        });
        if (!product) {
            notFound();
        }
        return {
            product: product
        }
    }catch (error){
        console.log(error)
        throw new Error('Error al obtener el producto ');
    }
}