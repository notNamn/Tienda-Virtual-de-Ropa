"use server";

import prisma from "@/lib/prisma";

interface GenderCategories {
    gender: string;
    page?: number;
    take?: number;
}

export async function getProductByGender({ gender, take = 10, page = 1 }: GenderCategories) {
    try {
        // Asegurar que page sea un número válido
        page = isNaN(Number(page)) || page < 1 ? 1 : Number(page);

        // Consultar productos en la BD filtrando solo por gender
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            where: { gender: gender as any }, // Prisma usa un ENUM para gender
            include: {
                images: { select: { url: true } }, // Traer solo las URLs de las imágenes
            },
        });

        const totalProducts = await prisma.product.count({ where: { gender: gender as any } });
        const totalPages = Math.ceil(totalProducts / take);

        // Formatear los productos para que coincidan con la UI
        const formattedProducts = products.map((p) => ({
            id: p.id,
            description: p.description,
            images: p.images.map((img) => img.url),
            inStock: p.inStock,
            price: p.price,
            sizes: p.sizes,
            slug: p.slug,
            tags: p.tags,
            title: p.title,
            gender: p.gender,
            type: p.categoryId, // Si necesitas mostrar el nombre de la categoría, cambia esto
        }));

        return {
            products: formattedProducts,
            totalPages: totalPages,
            currentPage: page
        };
    } catch (error) {
        console.error("Error al obtener productos por género:", error);
        return { products: [] };
    }
}
