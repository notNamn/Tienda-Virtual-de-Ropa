import prisma from "@/lib/prisma";
import {countries} from "../../../../seed/dataBrutaCountry";
import {NextResponse} from "next/server";


export async function GET(request: Request) {
    const allCountries = await prisma.country.createMany({
        data: countries
    })

    return NextResponse.json(allCountries)

}