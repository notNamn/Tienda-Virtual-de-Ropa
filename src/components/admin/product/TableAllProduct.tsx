import React from 'react'
import {SeedProduct} from "@/interfaces/productInterface";
import Image from "next/image";
import Link from "next/link";

interface props {
    products: SeedProduct[];
}

export default function TableAllProduct({products}:props) {

    return (
        <table className="min-w-full">
            <thead className="bg-gray-200 border-b">
                <tr>

                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Codigo
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Image
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Title
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Gender
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Inventory
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Price
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Sizes
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Option
                    </th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr
                        key={product.slug}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {product.id?.split('-')[0]}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <Image
                                src={`/products/${product.images[0]}`}
                                alt={product.title}
                                width={50}
                                height={50}
                            />
                        </td>
                        <td className="text-sm font-normal px-6 py-4 whitespace-nowrap">
                            <Link
                                className="text-blue-500 hover:underline hover:text-blue-600 transition-all"
                                href={`/shop/product/${product.slug}`}
                            >
                                {product.title}
                            </Link>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {product.gender}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {product.inStock}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {product.price}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {product.sizes.join(', ')}
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                            <Link
                                href={`/shop/admin/product/edit/${product.slug}`}
                                className="px-4 py-2 text-sm font-medium text-white
                                 bg-yellow-500 rounded-md hover:bg-yellow-600 transition">
                                Editar
                            </Link>
                            <Link
                                href={`/shop/admin/product/delete/${product.slug}`}
                                className="px-4 py-2 text-sm font-medium text-white
                                bg-red-600 rounded-md hover:bg-red-700 transition">
                                Eliminar
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
