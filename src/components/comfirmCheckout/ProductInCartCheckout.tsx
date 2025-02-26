"use client";
import React, {useEffect, useState} from 'react'
import Image from "next/image";
import {useCartStore} from "@/store/cart/cartStore";

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD" }).format(value);


export default function ProductInCartCheckout() {
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return <p>Cargando ... </p>
    }

    return (
        <>
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
                        src={`/products/${product.image}`}
                        alt={product.title}
                        className="mr-5"
                    />
                    <div className="flex flex-col" >
                        <span
                            className="font-extralight text-xl"
                        >
                            {product.sizes} - {product.title}
                        </span>
                        <p  >Unidades: {product.quantity} </p>
                        <p className="font-bold" >
                            Subtotal: {formatCurrency(product.price * product.quantity)}
                        </p>
                    </div>

                </div>
            ))}
        </>
    )
}
