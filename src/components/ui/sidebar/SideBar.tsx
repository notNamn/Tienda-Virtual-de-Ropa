"use client";
import React from 'react';
import {
    IoCloseOutline,
    IoLogInOutline,
    IoPeopleOutline,
    IoPersonAddOutline,
    IoSearchOutline,
    IoShirtOutline,
    IoTicketOutline
} from "react-icons/io5";
import Link from "next/link";
import { useUiStore } from "@/store/uiStore";
import clsx from "clsx";
import authLogout from "@/service/auth/authLogoutService";
import { useSession } from "next-auth/react";

interface menuLink {
    icon: any;
    src: string;
    name: string;
    roles: string[]; // <-- Agregar roles permitidos
}

// Definir el menú con los roles permitidos
const menus: menuLink[] = [
    {
        icon: <IoPersonAddOutline size={30} className="mr-2" />,
        src: '/shop/profile',
        name: 'Perfil',
        roles: ['USER', 'ADMIN']
    },
    {
        icon: <IoTicketOutline size={30} className="mr-2" />,
        src: '/shop/orders',
        name: 'Órdenes',
        roles: ['USER']
    },
    {
        icon: <IoTicketOutline size={30} className="mr-2" />,
        src: '/shop/admin/orders',
        name: 'Órdenes',
        roles: ['ADMIN']
    },
    {
        icon: <IoShirtOutline size={30} className="mr-2" />,
        src: '/shop/product',
        name: 'Productos',
        roles: ['ADMIN']
    },
    {
        icon: <IoPeopleOutline size={30} className="mr-2" />,
        src: '/shop/admin/users',
        name: 'Usuarios',
        roles: ['ADMIN']
    },
];

export default function SideBar() {
    const isSideMenuOpen = useUiStore(state => state.isMenuOpen);
    const closeMenu = useUiStore(state => state.closeMenu);

    // Obtener la sesión del usuario
    const { data: session } = useSession();
    const isAuthenticated = session?.user ? true : false;
    const userRole = session?.user?.rol || 'GUEST'; // Si no hay sesión, es GUEST

    // Filtrar los elementos del menú según el rol
    const filteredMenus =
        menus.filter(menu => menu.roles.includes(userRole));

    return (
        <div>
            {isSideMenuOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-black z-10 opacity-30" />
            )}

            {isSideMenuOpen && (
                <div
                    onClick={closeMenu}
                    className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                >
                    <nav
                        className={clsx(
                            "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                            { "translate-x-full": !isSideMenuOpen }
                        )}
                    >
                        {/* Botón de cierre */}
                        <IoCloseOutline size={50} className="absolute top-5 right-5 cursor-pointer" onClick={closeMenu} />

                        {/* Input de búsqueda */}
                        <div className="relative mt-14">
                            <IoSearchOutline size={30} className="absolute top-2 left-2" />
                            <input
                                type="text"
                                placeholder="Buscar"
                                className="w-full p-3 pl-10 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Menú filtrado */}
                        {filteredMenus.map(item => (
                            <Link key={item.name} href={item.src} className="flex items-center mt-4 p-4 hover:bg-gray-100 rounded transition-all">
                                {item.icon}
                                <span className="ml-3 text-xl">
                                    {item.name}
                                </span>
                            </Link>
                        ))}

                        <div className="w-full h-px bg-gray-500 my-10" />

                        {/* Botón de login/logout */}
                        {isAuthenticated ? (
                            <button
                                className="flex items-center w-full text-left mt-4 p-4 hover:bg-gray-100 rounded transition-all bg-transparent border-none"
                                onClick={() => authLogout()}
                            >
                                <IoLogInOutline size={30} className="mr-2" />
                                <span className="ml-3 text-xl">Salir</span>
                            </button>
                        ) : (
                            <Link href={'/auth/login'} className="flex items-center mt-4 p-4 hover:bg-gray-100 rounded transition-all">
                                <IoLogInOutline size={30} className="mr-2" />
                                <span className="ml-3 text-xl">Iniciar Sesión</span>
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </div>
    );
}
