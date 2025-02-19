"use client";

import React, {useState} from 'react'
import {SeedProduct} from "@/interfaces/productInterface";
import Image from "next/image";
import Link from "next/link";

interface Props {
    product: SeedProduct;
}
export default function ProductCard({product}: Props) {
    const [displayImage, setDisplayImage] = useState(product.images[0]);
    const urlLink = `/shop/product/${product.slug}`;
    return (
        <div className="rounded-md overflow-hidden fade-in" >
            <Link
                href={urlLink}
                className="cursor-pointer"
            >
                <Image
                    width={500}
                    height={500}
                    src={`/products/${displayImage}`}
                    alt={product.title}
                    className="w-full object-cover rounded-md"
                    onMouseEnter={() => setDisplayImage(product.images[1])}
                    onMouseLeave={() => setDisplayImage(product.images[0])}
                />
            </Link>
            <div
                className="p-5"
                key={product.slug}
            >
                <h3 className="font-light text-xl" >{product.title}</h3>
                <p className="font-bold text-xl" >${product.price}</p>
                <Link
                    href={urlLink}
                    className="hover:underline text-blue-500 hover:text-blue-600 transition-all"
                >
                    Ver mas
                </Link>
            </div>
        </div>
    )
}
