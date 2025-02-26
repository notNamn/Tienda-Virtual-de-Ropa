import React from 'react'
import Title from "@/components/ui/Title";
import Link from "next/link";
import ProductInCartCheckout from "@/components/comfirmCheckout/ProductInCartCheckout";
import PlaceOrder from "@/components/comfirmCheckout/PlaceOrder";

export default function PageConfirmChekoutOrder() {
    return (
        <div
            className="flex justify-center items-center mb-72 px-10 sm:px-0"
        >
            <div
                className="flex flex-col w-[1000px]"
            >
                <Title title={'Confirmar compra'}/>
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-10"
                >
                    {/*  Carrito  */}
                    <div
                        className="flex flex-col mt-5"
                    >
                        <span className="text-xl" >
                            Items agregados
                        </span>
                        <Link
                            className="text-blue-500 hover:underline hover:text-blue-800 transition-all"
                            href={'/shop/cart'}
                        >
                            Volver al carrito
                        </Link>

                        {/*Items de carritos */}

                        <ProductInCartCheckout/>

                    </div>

                    {/*Resumen de la compra */}
                    <PlaceOrder/>
                </div>
            </div>
        </div>
    )
}
