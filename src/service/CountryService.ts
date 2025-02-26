"use server";
import prisma from "@/lib/prisma";

export default async function getAllCountries() {
    try {
        const countries = await prisma.country.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        return countries;
    } catch (error) {
        console.log({error});
        return [];
    }
    
}
