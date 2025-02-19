import React from 'react'
import PaginaProductos from "@/components/product/PaginaProductos";
import {getAllProducts} from "@/service/ProductService";

export default function PageShopProduct() {
    const products = getAllProducts();
    return (
        <PaginaProductos
            products={products}
        />
    )
}
