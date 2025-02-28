
export const revalidate = 60; // se guarda en cahce durante 60s


import React from 'react'
import {SeedProduct} from "@/interfaces/productInterface";
import ProductCard from "@/components/product/ProductCard";

interface props{
    products: SeedProduct[];
}

export default function PaginaProductos({products}: props) {

    return (
        <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
            {products.map((product) => (
                <ProductCard
                    key={product.slug}
                    product={product}
                />
            ))}
        </div>
    )
}
