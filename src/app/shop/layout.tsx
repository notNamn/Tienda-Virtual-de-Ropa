import React from 'react'
import TopMenu from "@/components/ui/top-menu/TopMenu";
import SideBar from "@/components/ui/sidebar/SideBar";
import Footer from "@/components/footer/Footer";
import {Metadata} from "next";
import ToastNotification from "@/components/ui/ToastNotification";

interface propsLaoyut{
    children: React.ReactNode
}

export const metadata: Metadata = {
    title: {
        template: 'Tienda Virtual | %s',
        default: 'Tienda Virtual'
    },
    description: 'Tienda virtual de productos'
}

export default function Layout({children}: propsLaoyut) {
    return (
        <main>
            <TopMenu/>
            <SideBar/>
            <div className="p-0 sm:p-10" >
                {children}
                
            </div>
            <Footer/>
            <ToastNotification/>
        </main>
    )
}
