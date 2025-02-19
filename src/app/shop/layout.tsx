import React from 'react'
import TopMenu from "@/components/ui/top-menu/TopMenu";
import SideBar from "@/components/ui/sidebar/SideBar";
import Footer from "@/components/footer/Footer";

interface propsLaoyut{
    children: React.ReactNode
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
        </main>
    )
}
