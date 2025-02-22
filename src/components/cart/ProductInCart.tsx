"use client";
import React, {useEffect, useState} from 'react'
import Image from "next/image";
import QuantitySelector from "@/components/product/Items/QuantitySelector";
import {useCartStore} from "@/store/cart/cartStore";
import Link from "next/link";

export default function ProductInCart() {
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);
    const updateQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct);

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
                    <div>
                        <Link
                            className="underline transition-all hover:text-blue-600 hover:underline"
                            href={`/shop/product/${product.slug}`}
                        >
                            {product.sizes} - {product.title}
                        </Link>
                        <p> $ {product.price} </p>
                        <QuantitySelector
                            quantity={product.quantity}
                            onQuantityChange={ value=> updateQuantity(product, value) }
                        />
                        <button
                            className="underline mt-3"
                            onClick={()=>removeProduct(product)}
                        >
                            Remover
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}
