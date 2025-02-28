import prisma from "@/lib/prisma";


export async function getCategory() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        return categories;
    }catch (error){
        console.log(error);
        return [];
    }
}