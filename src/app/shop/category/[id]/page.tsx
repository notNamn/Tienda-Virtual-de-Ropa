import React from 'react'
import Title from "@/components/ui/Title";
import {getAllByCategories} from "@/service/CategoryService";
import PaginaProductos from "@/components/product/PaginaProductos";

interface Props{
    params: {
        id: string;
    }
}

export default function PageCategoryId({params}: Props) {

    const products = getAllByCategories(params.id);
    return (
        <>
            <Title
                title={`Seccion de ${params.id}`}
                subtitle={`Todos los productos de ${params.id}`}
            />
            <PaginaProductos products={products}/>
        </>
    )
}
