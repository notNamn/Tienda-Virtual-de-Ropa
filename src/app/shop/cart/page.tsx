import React from 'react'
import Title from "@/components/ui/Title";
import Link from "next/link";
import ProductInCart from "@/components/cart/ProductInCart";
import SummaryCart from "@/components/cart/SummaryCart";


export default function PageShopCart() {
    return (
        <div
            className="flex justify-center items-center mb-72 px-10 sm:px-0"
        >
            <div
                className="flex flex-col w-[1000px]"
            >
                <Title title={'Carrito'}/>
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-10"
                >
                    {/*  Carrito  */}
                    <div
                        className="flex flex-col mt-5"
                    >
                        <span className="text-xl" >
                            Agregar mas Items
                        </span>
                        <Link href={'/shop/product'}>
                            Ir a compras
                        </Link>

                        {/*Items de carritos */}
                        <ProductInCart/>

                    </div>

                    {/*Resumen de la compra */}
                    <div
                        className="bg-white rounded-xl shadow-xl p-7"
                    >
                        <h2 className="text-2xl mb-2" >Resumen de la orden </h2>

                        <SummaryCart/>

                        <div
                            className="mt-5 mb-2 w-full"
                        >
                            <Link
                                className="flex btn-primary justify-center"
                                href={'/shop/checkout/address'}
                            >
                                Verificar compra
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
