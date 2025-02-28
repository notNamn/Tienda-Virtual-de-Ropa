import React from 'react'
import Title from "@/components/ui/Title";
import {redirect} from "next/navigation";
import {ProductForm} from "@/components/admin/product/ProductForm";
import {getCategory} from "@/service/product/GetCategory";
import {getOneProductBySlug} from "@/service/product/getOneProductSlug";

interface props {
    params: {
        slug: string;
    }
}

export default async function PageEditProductByAdmin({params}: props) {
    const {slug}= params;
    const {product} = await getOneProductBySlug(slug)
    const categories = await getCategory();

    if (!product) {
        redirect('/shop/')
    }
    return (
        <>
            <Title title={product.title}/>

            <ProductForm product={product} categories={categories}/>
        </>
    )
}
