import React from 'react'
import {getProductsFindBySlug} from "@/service/ProductService";
import SizeSelector from "@/components/product/Items/SizeSelector";
import QuantitySelector from "@/components/product/Items/QuantitySelector";
import SlideShowProduct from "@/components/product/slider/SlideShowProduct";
import SlideShowProductMobile from "@/components/product/slider/SlideShowProductMobile";

interface props {
    params: {
        slug: string;
    }
}

export default function PageProductSlug({params}: props) {
    const product = getProductsFindBySlug(params.slug);
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
                <h1 className="antialiased font-bold text-xl" >
                    {product.title}
                </h1>
                <p
                    className="text-lg mb-5"
                >
                    ${product.price}
                </p>
                {/*  selector de tallas   */}
                <SizeSelector
                    selectedSize={product.sizes[0]}
                    availableSizes={product.sizes}
                />
                {/*  selector de cantidad  */}
                <QuantitySelector quantity={0}/>
                {/*    botton */}
                <button className="btn-primary">
                    Agregar al carrito
                </button>
                
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
