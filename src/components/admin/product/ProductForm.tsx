"use client";


import {ValidSizes} from "@/interfaces/productInterface";
import {CategoryInterface} from "@/interfaces/CategoryInterface";
import {useForm} from "react-hook-form";
import Image from "next/image";
import clsx from "clsx";
import {updateProductByFormData} from "@/service/product/updateProductByFormData";

interface Props {
    product: ProductForm;
    categories: CategoryInterface[];
}
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
type ValidGender = 'men'|'women'|'kid'|'unisex';

export interface ProductForm {
    id? : string;
    description: string;
    images: productImg[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    gender: ValidGender;
    categoryId?: string;
}

interface productImg {
    id: string;
    url: string
}


interface FormImput {
    title: string;
    slug: string;
    description: string;
    price: number;
    inStock: number;
    sizes: string[];
    tags: string[];
    gender: ValidGender;
    categoryId: string;
    images?: string[];
}


export const ProductForm = ({ product, categories }: Props) => {

    const {handleSubmit, register, getValues, setValue, watch, formState: {errors, isValid} }= useForm<FormImput>({
        defaultValues: {
            title: product.title,
            slug: product.slug,
            description: product.description,
            price: product.price,
            inStock: product.inStock,
            sizes: product.sizes ?? [],
            tags: product.tags ?? [],
            gender: product.gender,
            categoryId: product.categoryId,
        }
    })

    // cambiar el talle del producto
    watch('sizes') // cada vez que cambie el talle
    const onSelectedSize = (size: string)=>{
        const sizes = new Set(getValues('sizes'));

        // eliminar duplicados
        if (sizes.has(size)) {
            sizes.delete(size);
        } else {
            sizes.add(size);
        }
        setValue('sizes', Array.from(sizes));
    }

    const onSubmit = async (data: FormImput) => {
        console.log({data});
        const formData = new FormData();
        formData.append('id', product.id ?? '');
        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('description', data.description);
        formData.append('price', data.price.toString());
        formData.append('inStock', data.inStock.toString());
        formData.append('sizes', JSON.stringify(data.sizes));
        formData.append('tags', JSON.stringify(data.tags));
        formData.append('gender', data.gender);
        formData.append('categoryId', data.categoryId);

       const {} = await updateProductByFormData(formData);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
        >
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Título</span>
                    <input
                        id="title"
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("title", {
                            required: "El título es obligatorio"
                        })}
                    />
                    {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                </div>

                <div className="flex flex-col mb-2">
                    <span>Slug</span>
                    <input
                        id="slug"
                        type="text" className="p-2 border rounded-md bg-gray-200"
                        {...register("slug", {
                            required: "El slug es obligatorio"
                        })}
                    />
                    {errors.slug && <span className="text-red-500 text-sm">{errors.slug.message}</span>}
                </div>

                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        rows={5}
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("description", {
                            required: "La descripción es obligatoria"
                        })}
                    ></textarea>
                    {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                </div>

                <div className="flex flex-col mb-2">
                    <span>Price</span>
                    <input type="number" className="p-2 border rounded-md bg-gray-200"
                           {...register("price", {
                               required: "El precio es obligatorio",
                               min: { value: 1, message: "Debe ser mayor a 0" }
                           })}
                    />
                    {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                </div>

                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200"
                           {...register("tags", {
                               required: "Los tags son obligatorios"
                           })}
                    />
                    {errors.tags && <span className="text-red-500 text-sm">{errors.tags.message}</span>}
                </div>

                <div className="flex flex-col mb-2">
                    <span>Gender</span>
                    <select className="p-2 border rounded-md bg-gray-200"
                        {...register("gender", {
                            required: "El gender es obligatorio"
                        })}
                    >
                        <option value="">[Seleccione]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                    {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
                </div>

                <div className="flex flex-col mb-2">
                    <span>Categoria</span>
                    <select className="p-2 border rounded-md bg-gray-200"
                        {...register("categoryId", {
                            required: "La categoria es obligatoria"
                        })}
                    >
                        <option value="">[Seleccione]</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    {errors.categoryId && <span className="text-red-500 text-sm">{errors.categoryId.message}</span>}
                </div>
                <button className="btn-primary w-full">
                    Guardar
                </button>
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">
                {/* As checkboxes */}
                <div className="flex flex-col">
                    <span>Tallas</span>
                    <div className="flex flex-wrap">
                        {sizes.map( size => (
                                // bg-blue-500 text-white <--- si está seleccionado
                                <div
                                    onClick={ () => onSelectedSize( size ) }
                                    key={ size }
                                    className={
                                        clsx(
                                           "flex items-center cursor-pointer justify-center w-10 h-10 mr-2 border rounded-md",
                                            {
                                                "bg-blue-500 text-white": getValues('sizes').includes(size)
                                            }
                                        )
                                    }
                                >
                                    <span>{ size }</span>
                                </div>
                        ))}
                    </div>

                    {/*ingresar Imagenes  */}
                    <div className="flex flex-col mb-2">
                        <span>Fotos</span>
                        <input
                            type="file"
                            multiple
                            className="p-2 border rounded-md bg-gray-200"
                            accept="image/png, image/jpeg"
                        />

                    </div>
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2"
                    >
                        {product.images.map(img => (
                            <div
                                key={img.id}
                                className="relative"
                            >
                                <Image
                                    src={`/products/${img.url}`}
                                    alt={`${img.id}-${product.title}`}
                                    width={400}
                                    height={400}
                                />
                                <button
                                    className="absolute top-0 right-0 bg-red-500 text-white
                                    rounded-full px-2 py-1 text-xs transform translate-x-1 -translate-y-1 hover:bg-red-700"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </form>
    );
};