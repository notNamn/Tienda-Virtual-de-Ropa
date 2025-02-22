import StockLabel from "@/components/product/StockLabel";

export const revalidate = 3600; // se guarda en cahce durante 1h

import React from 'react'
import {getProductBySlug} from "@/service/ProductService";
import SlideShowProduct from "@/components/product/slider/SlideShowProduct";
import SlideShowProductMobile from "@/components/product/slider/SlideShowProductMobile";
import AddToCart from "@/app/shop/product/[slug]/ui/AddToCart";

interface props {
    params: {
        slug: string;
    }
}
export async function generateMetadata({params}: props) {
    const slug = params.slug;
    const {product} = await getProductBySlug(slug)
    return {
        title: product?.title ?? "Producto no encontrado" ,
        description: product?.description  ?? " ",
        openGraph: {
            images: [`/products/${product?.images[1]}`]
        }
    }
}

export default async function PageProductSlug({params}: props) {
    const {product} = await getProductBySlug(params.slug)
    return (
        <div
            className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
            {/*SliShow*/}
                <div
                    className="col-span-1 md:col-span-2"
                >
                    {/*Mobile slader */}
                    <SlideShowProductMobile
                        title={product.title}
                        images={product.images}
                        className="block md:hidden"
                    />
                    {/*Desktop */}
                    <SlideShowProduct
                        title={product.title}
                        images={product.images}
                        className="hidden md:block"
                    />
                </div>
            {/*Description*/}
            <div
                className="col-span-1 px-5"
            >
                {/*  Stock    */}
                <StockLabel slug={product.slug}/>

                <h1 className="antialiased font-bold text-xl" >
                    {product.title}
                </h1>
                <p
                    className="text-lg mb-5"
                >
                    ${product.price}
                </p>
                {/* Selector */}
                <AddToCart product={product}/>

                {/*  Description   */}
                <h3 className="font-bold text-sm">
                    Descripccion
                </h3>
                <p
                    className="font-light"
                >
                    {product.description}
                </p>
            </div>
        </div>
    )
}
