import React from 'react'
import Title from "@/components/ui/Title";
import Link from "next/link";
import {initialData} from "../../../../seed/seed";
import Image from "next/image";
import QuantitySelector from "@/components/product/Items/QuantitySelector";

const productsInCart  = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
    initialData.products[3],
]
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
                                    <p> {product.title} </p>
                                    <p> {product.price} </p>
                                    <QuantitySelector quantity={1}/>
                                    <button
                                        className="underline mt-3"
                                    >
                                        Remover
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/*Resumen de la compra */}
                    <div
                        className="bg-white rounded-xl shadow-xl p-7"
                    >
                        <h2 className="text-2xl mb-2" >Resumen de la orden </h2>

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
