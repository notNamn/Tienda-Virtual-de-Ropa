import React from 'react';
import Title from "@/components/ui/Title";
import { getProductByGender } from "@/service/CategoryService";
import PaginaProductos from "@/components/product/PaginaProductos";
import Pagination from "@/components/ui/Pagination";

interface Props {
    params: { id: string };
    searchParams?: { page?: string };
}

export async function generateMetadata({ params }: Props) {
    const {products} = await getProductByGender({gender: params.id});

    return {
        title: `Sección de ${params.id}` ,
        description: `Todos los productos de ${params.id}`,
        openGraph: {
            images: [`/products/${products[0].images[1]}`]
        }
    }
}

export default async function PageCategoryId({ params, searchParams }: Props) {
    const page = searchParams?.page ? Number(searchParams.page) : 1;

    const { products, totalPages, currentPage } = await getProductByGender({
        gender: params.id,
        page: page
    });

    return (
        <>
            <Title
                title={`Sección de ${params.id}`}
                subtitle={`Todos los productos de ${params.id}`}
            />
            <PaginaProductos
                key={page}
                products={products}
            />
            <Pagination totalPages={totalPages!} currentPage={currentPage!} />
        </>
    );
}
