import TableAllProduct from "@/components/admin/product/TableAllProduct";

export const revalidate = 60; // se guarda en cahce durante 60s

import React from 'react'
import {getAllProductPagination} from "@/service/ProductService";
import {redirect} from "next/navigation";
import Pagination from "@/components/ui/Pagination";
import Title from "@/components/ui/Title";
import Link from "next/link";

interface props {
    searchParams: {
        page?: string;
    }
}
export default  async function PageShopProduct({searchParams}: props) {
    const  page = searchParams.page? parseInt(searchParams.page) :1;
    const {products, currentPage, totalPages} = await getAllProductPagination({page});

    if (products.length === 0){
        redirect('/shop/')
    }
    return (
        <>
            <Title title={'Administracion de Productos '} subtitle="Todos los productos"/>
            <div className="flex justify-end mb-5" >
                <Link
                    className="btn-primary"
                    href={'/shop/admin/product/new'}
                >
                    Nuevo Producto
                </Link>
            </div>
            <TableAllProduct products={products}/>
            <Pagination totalPages={totalPages} currentPage={currentPage}/>
        </>
    )
}
