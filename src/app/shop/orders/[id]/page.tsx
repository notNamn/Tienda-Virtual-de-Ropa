import React from 'react'
import Title from "@/components/ui/Title";
import Link from "next/link";
import Image from "next/image";
import {initialData} from "../../../../../seed/seed";
import clsx from "clsx";
import {IoCardOutline} from "react-icons/io5";

const productsInCart  = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
    initialData.products[3],
]
interface props {
    params: {
        id: string
    }
}

export default function PageOrderById({params}: props) {
    const {id} = params;


    return (
        <div
            className="flex justify-center items-center mb-72 px-10 sm:px-0"
        >
            <div
                className="flex flex-col w-[1000px]"
            >
                <Title title={`Orden N°: ${id}`}/>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-10"
                >
                    {/*  Carrito  */}
                    <div
                        className="flex flex-col mt-5"
                    >
                        <div
                            className={
                                clsx(
                                    "flex items-center rounded-lg py-2 px-3.5 " +
                                    "text-xs font-bold text-white mb-5",
                                    {
                                        'bg-green-500': false,
                                        'bg-red-500': true
                                    }
                                )
                            }
                        >
                            <IoCardOutline size={30} />
                            <span className="mx-2">pendiente de pago </span>
                        </div>
                        <span className="text-xl" >
                            Items agregados
                        </span>
                        {/*Items de carritos */}

                        {productsInCart.map(product => (
                            <div
                                key={product.slug}
                                className="flex"
                            >
                                <Image
                                    width={100}
                                    height={100}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                    }}
                                    src={`/products/${product.images[0]}`}
                                    alt={product.title}
                                    className="mr-5"
                                />
                                <div>
                                    <p className="font-extralight text-xl" >
                                        {product.title}
                                    </p>
                                    <p  >Unidades: 2 </p>
                                    <p className="font-bold" >
                                        Subtotal: ${product.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/*Resumen de la compra */}
                    <div
                        className="bg-white rounded-xl shadow-xl p-7"
                    >
                        <h2 className="text-2xl mb-2 font-semibold" >
                            Resumen de la orden
                        </h2>
                        {/*Datos de la orden */}
                        <h2 className="text-xl mb-2" >Direccion de entrega: </h2>
                        <div className="mb-10" >
                            <p className="text-lg" >Nombre de cliente</p>
                            <p>Dereccion </p>
                        </div>

                        {/*Resumen de la compra */}
                        <h2 className="text-xl mb-2" >Resumen de compra</h2>
                        <div
                            className="grid grid-cols-2"
                        >
                            <span>N° de productos  </span>
                            <span className="text-right" > 0 productos </span>

                            <span>Subtotal:  </span>
                            <span className="text-right" > $ 0</span>

                            <span>Impuestos (15%) </span>
                            <span className="text-right" >$ 23</span>

                            <span className="mt-5 text-2xl" >Total:  </span>
                            <span className="mt-5 text-2xl text-right" > $ 23</span>

                        </div>

                        <div
                            className="mt-5 mb-2 w-full"
                        >
                            <div
                                className={
                                    clsx(
                                        "flex items-center rounded-lg py-2 px-3.5 " +
                                        "text-xs font-bold text-white mb-5",
                                        {
                                            'bg-green-500': true,
                                            'bg-red-500': false
                                        }
                                    )
                                }
                            >
                                <IoCardOutline size={30} />
                                <span className="mx-2">Orden pagada </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
