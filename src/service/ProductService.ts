"use server";

import {notFound} from "next/navigation";
import prisma from "@/lib/prisma";

interface paginationOption {
    page?: number;
    take?: number;
}

export async function getAllProductPagination({page = 1, take = 10}:paginationOption ){
    try {
        if (isNaN(Number(page))) page = 1;
        if (page < 1) page = 1;

        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            include:{
                images: {
                    select: {
                        url: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });
        // Transformamos el campo images para que sea un array de strings
        const formattedProducts = products.map(product => ({
            ...product,
            // Extrae solo la URL de cada imagen
            images: product.images.map(img => img.url),
            type: product.category.name
        }));

        // total de paginas
        const totalCount = await prisma.product.count();
        const totalPages =  Math.ceil(totalCount/take);

        return {
            products: formattedProducts,
            totalPages: totalPages,
            currentPage: page
        };
    }catch (error){
        console.log(error);
    }
}

export async function getProductBySlug(slug : string){
    try {
        const product = await prisma.product.findFirst({
            where:{
                slug: slug
            },
            include:{
                images:{
                    select:{
                        url: true
                    }
                }
            }
        });
        if (!product) {
            notFound();
        }
        const formattedProducts = {
            ...product,
            images: product.images.map(img => img.url)
        }

        return {
            product: formattedProducts,
        }
    }catch (error){
        console.log(error)
        throw new Error('Error al obtener el producto ');
    }
}

export async function getStockBySlug(slug : string){
    try {
        const stock = await prisma.product.findFirst({
            where:{
                slug: slug
            },
            select:{
                inStock: true
            }
        })
        return stock;
    }catch (error){
        console.log(error)
        throw new Error('Error al obtener el stock del producto ');
    }
}