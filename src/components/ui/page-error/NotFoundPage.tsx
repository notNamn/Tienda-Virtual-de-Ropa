import React from 'react'
import Link from "next/link";
import Image from "next/image";

interface props {
    title?: string;
    error?: string;
    image?: string;
    redirect?: string;
}



export default function NotFoundPage({...props}:props) {
    return (
        <div className="flex justify-center items-center h-screen sm:flex-row flex-col" >
            <div className="text-center px-5 mx-5" >
                <h2 className="text-4xl font-bold" >
                    <span className=" text-red-500" >
                        {props.error? props.error: '404'}
                    </span>
                </h2>
                <p className="text-lg" >
                    {props.title? props.title: 'Pagina no encontrada'}
                </p>
                <Link
                    href={props.redirect? props.redirect:'/'}
                    className="text-blue-500 hover:underline hover:text-blue-600 transition-all"
                >
                    Regresar
                </Link>

            </div>

            <div className="px-5 mx-5" >
                <Image
                    width={500}
                    height={500}
                    src={props.image? props.image: '/imgs/starman_750x750.png'}
                    alt={'Starman'}
                />
            </div>

        </div>
    )
}
