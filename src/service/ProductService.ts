import {initialData} from "../../seed/seed";
import {notFound} from "next/navigation";


export function getAllProducts(){
    return initialData.products;
}


export function getProductsFindBySlug(slug: string) {
    const products = initialData.products;
    const product = products.find(product => {
        return product.slug === slug;
    });
    if (!product) {
        notFound();
    }
    return product;
}