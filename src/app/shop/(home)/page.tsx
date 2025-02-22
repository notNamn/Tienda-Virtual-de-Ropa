
export const revalidate = 60; // se guarda en cahce durante 60s

import React from 'react'
import Title from "@/components/ui/Title";
import PaginaProductos from "@/components/product/PaginaProductos";
import {getAllProductPagination} from "@/service/ProductService";
import {redirect} from "next/navigation";
import Pagination from "@/components/ui/Pagination";


interface props {
    searchParams: {
        page?: string;
    }
}

export default async function PageShopHome({searchParams}: props) {
    const  page = searchParams.page? parseInt(searchParams.page) :1;
    const {products, currentPage, totalPages} = await getAllProductPagination({page});

    if (products.length === 0){
        redirect('/shop/')
    }

    return (
        <>
            <Title
                title={'Tienda'}
                subtitle={'Todos los productos'}
            />
            <PaginaProductos products={products}/>
            <Pagination totalPages={totalPages} currentPage={currentPage} />
        </>
    )
}
