import React from 'react'
import {auth} from "@/config/authConfig";
import {redirect} from "next/navigation";

export default async function LayoutAdmin({children}: {children: React.ReactNode}) {
    const session = await auth();
    if (session?.user.rol !== 'ADMIN') {
        redirect('/auth/login');
    }

    return (
        <>
            {children}
        </>
    )
}
