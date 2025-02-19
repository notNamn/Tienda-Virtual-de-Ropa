
import {initialData} from "../../seed/seed";
import {ValidCategory} from "@/interfaces/productInterface";
import {notFound} from "next/navigation";

export function getAllByCategories(category: string) {
    const validCategories: ValidCategory[] = ["men", "women", "kid", "unisex"];
    const allProducts =initialData.products;
    if (!validCategories.includes(category as ValidCategory)) {
        notFound();
    }

    const categoryProduct = allProducts.filter(product =>{
        return product.gender === category;
    })
    return categoryProduct;
}