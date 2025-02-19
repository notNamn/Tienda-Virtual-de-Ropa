"use client";
import React from 'react'
import {
    IoCloseOutline,
    IoLogInOutline, IoPeopleOutline,
    IoPersonAddOutline,
    IoSearchOutline,
    IoShirtOutline,
    IoTicketOutline
} from "react-icons/io5";
import Link from "next/link";
import {useUiStore} from "@/store/uiStore";
import clsx from "clsx";

interface menuLink{
    icon: any;
    src: string;
    name: string;
}

const menus: menuLink[] = [
    { icon: <IoPersonAddOutline size={30} className="mr-2"/>, src: '/', name: 'Perfil' },
    {icon: <IoTicketOutline size={30} className="mr-2"/>, src: '/shop/orders', name: 'Ordenes'},
    {icon:<IoLogInOutline size={30} className="mr-2"/>, src: '/auth/login', name: 'Iniciar Sesion'},
    {icon:<IoLogInOutline size={30} className="mr-2"/>, src: '/', name: 'Salir'},
    {icon: <IoShirtOutline size={30} className="mr-2"/>, src:'/shop/product', name: 'Productos'},
    {icon: <IoPeopleOutline size={30} className="mr-2" />, src:'/', name: 'Usuarios'},

]

export default function SideBar() {
    const isSideMenuOpen = useUiStore(state => state.isMenuOpen);
    const closeMenu = useUiStore(state => state.closeMenu);
    return (
        <div>

            {/* black-backgorund */}
            {isSideMenuOpen && (
                <div
                    className="fixed top-0 left-0 w-screen h-screen bg-black z-10 opacity-30"
                />

            )}
            {/* Blue */}
            {isSideMenuOpen && (
                <div
                    onClick={()=>closeMenu()}
                    className="fade-in fixed top-0 left-0 w-screen h-screen z-10
                    backdrop-filter backdrop-blur-sm"
                >
                    {/* Side Menu */}
                    <nav
                        className={clsx(
                            "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                            { "translate-x-full": !isSideMenuOpen }
                        )}
                    >
                        {/* Close Button */}
                        <IoCloseOutline
                            size={50}
                            className="absolute top-5 right-5 cursor-pointer"
                            onClick={closeMenu}
                        />
                        {/* Input Search */}
                        <div className="relative mt-14">
                            <IoSearchOutline size={30} className="absolute top-2 left-2" />
                            <input
                                type="text"
                                placeholder="Buscar"
                                className="w-full p-3 pl-10 border-2 border-gray-300 rounded-md
                    focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        {/* Menu */}
                        {menus.map(item => (
                            <Link
                                key={item.name}
                                href={item.src}
                                className="flex items-center mt-4 p-4 hover:bg-gray-100 rounded transition-all"
                            >
                                {item.icon}
                                <span className="ml-3 text-xl">{item.name}</span>
                            </Link>
                        ))}
                        <div className="w-full h-px bg-gray-500 my-10" />
                    </nav>
                </div>
            )}

        </div>
    )
}
