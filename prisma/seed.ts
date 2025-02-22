import {initialData} from "../seed/dataBruto";
import prisma from "@/lib/prisma";

async function main() {
    console.log('Iniciando seed...');

    // Eliminar productos existentes para evitar duplicados
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    // Crear categorías únicas
    const categoriasUnicas =
        [...new Set(initialData.products.map(p => p.type))];

    const categorias = await Promise.all(
        categoriasUnicas.map(async (categoria) => {
            return prisma.category.create({
                data: { name: categoria }
            });
        })
    );

    // Crear productos
    for (const product of initialData.products) {
        const categoria = categorias.find(c => c.name === product.type);

        if (!categoria) continue; // Asegurar que la categoría existe

        const nuevoProducto = await prisma.product.create({
            data: {
                description: product.description,
                inStock: product.inStock,
                price: product.price,
                sizes: product.sizes,
                slug: product.slug,
                tags: product.tags,
                title: product.title,
                gender: product.gender, // parece que hay un error aui
                categoryId: categoria.id, // Relación con la categoría
                images: {
                    create: product.images.map(img => ({
                        url: img
                    }))
                }
            }
        });

        console.log(`Producto creado: ${nuevoProducto.title}`);
    }

    console.log('Seed completado.');
}

main()
    .catch(e => {
        console.error('Error ejecutando seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
