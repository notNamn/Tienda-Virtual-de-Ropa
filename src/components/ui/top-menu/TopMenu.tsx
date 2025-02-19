"use client";
import React from 'react'
import Link from "next/link";
import {IoCartOutline, IoSearch} from "react-icons/io5";
import {useUiStore} from "@/store/uiStore";

interface menuLink{
    src: string,
    name: string
}



const menusCategory: menuLink[] = [
    { src: '/shop/category/men', name: 'HOMBRES' },
    { src: '/shop/category/women', name: 'MUJERES' },
    { src: '/shop/category/kid', name: 'NIÑOS' },
    { src: '/shop/category/unisex', name: 'UNISEX' },
]

export default function TopMenu() {
    const openMenu = useUiStore(state => state.openMenu);

    return (
        <nav
            className="flex px-5 justify-between items-center w-full"
        >

            <div>
                <Link href="/" className="cursor-pointer" >
                    <span
                        className="font-bold "
                    >
                        HOME
                    </span>
                </Link>
            </div>
            <div className="hidden sm:block" >
                {menusCategory.map(menu=>(
                    <Link
                        key={menu.name}
                        href={menu.src}
                        className="m-2 p-4 font-bold rounded-md transition-all hover:bg-gray-200"
                    >
                        {menu.name}
                    </Link>
                ))}
            </div>
            <div className="flex items-center" >
                <Link href={'/shop/search'} className="mx-2" >
                    <IoSearch className="text-2xl cursor-pointer" />
                </Link>
                <Link href={'/shop/cart'} className="mx-2" >
                    <div className="relative" >
                        <span className="absolute text-xs rounded-full px-1
                        font-bold -top-2 -right-2 bg-blue-700 text-white" >
                            3
                        </span>
                        <IoCartOutline className="text-2xl cursor-pointer" />
                    </div>
                </Link>
                <button
                    className="m-2 p-4 rounded-md transition-all hover:bg-gray-200 "
                    onClick={()=>openMenu()}
                >
                    Menu
                </button>
            </div>
        </nav>
    )
}
