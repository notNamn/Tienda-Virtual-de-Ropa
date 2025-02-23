import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";


export async function GET(request: Request) {
    const newUser = await prisma.user.createMany({
        data: [
            {
                name: "John Doe",
                email: "example@example.com",
                password: bcryptjs.hashSync('123456', 10),
                rol: "USER"
            },
            {
                name: 'admin',
                email: 'admin@gmail.com',
                password: bcryptjs.hashSync('admin', 10),
                rol: 'ADMIN'
            }
        ]

    })

    return NextResponse.json({
        newUser
    })
}