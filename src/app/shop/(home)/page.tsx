import React from 'react'
import Title from "@/components/ui/Title";
import {initialData} from "../../../../seed/seed";
import PaginaProductos from "@/components/product/PaginaProductos";

const products = initialData.products;

export default function PageShopHome() {
    return (
        <>
            <Title
                title={'Tienda'}
                subtitle={'Todos los productos'}
            />
            <PaginaProductos products={products}/>
        </>
    )
}
