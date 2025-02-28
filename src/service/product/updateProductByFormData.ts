"use server";

import z from "zod";
import prisma from "@/lib/prisma";
import {Product, Size} from "@prisma/client";

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(250),
    slug: z.string().min(3).max(250),
    description: z.string().min(3).max(250),
    price: z.coerce.number().min(0).transform(val=> Number(val.toFixed(2))),
    inStock: z.coerce.number().min(0).transform(val=> Number(val.toFixed(0))),
    categoryId: z.string().uuid().optional().nullable(),
    sizes: z.coerce.string().transform(val => val.split(',')),
    tags: z.coerce.string().transform(val => val.split(',')),
    gender: z.enum(['kid', 'men', 'women', 'unisex']),
    images: z.array(z.string()).min(1).optional(),
})

export async function updateProductByFormData(formData: FormData) {
    try {

        // verificaion de los datos correctos
        const data = Object.fromEntries(formData);
        const productParse = productSchema.safeParse(data);
        if (!productParse.success) {
            console.log(productParse.error);
            return
        }
        const product = productParse.data;
        //console.log({product})

        const {id, ...rest} = product

        // actualizacion de los datos
        const productTx = await prisma.$transaction(async (tx)=>{
        let productModificated: Product;
            if (id){
                // actualizar
                productModificated = await tx.product.update({
                    where: {id},
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[],
                        },
                        tags: {
                            set: rest.tags as string[],
                        },
                    }
                });
                console.log({updateProduct: product})
                return productModificated
            }else {
                // crear
                console.log({product})
            }
        })
        return{productTx}

    }catch (error){
        console.log(error);
        throw Error('Error al modificar el producto ')
    }

}