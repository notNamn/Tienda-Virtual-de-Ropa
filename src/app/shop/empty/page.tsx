import React from "react";
import { IoCardOutline } from "react-icons/io5";
import Link from "next/link";

export default function PageEmpty() {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center">
            <IoCardOutline size={100} className="text-gray-400 mb-4" />
            <h1 className="text-2xl font-semibold">Tu carrito está vacío</h1>
            <p className="text-gray-500 mb-6">Explora nuestros productos y encuentra algo para ti.</p>
            <Link
                href="/"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
                Regresar a la tienda
            </Link>
        </div>
    );
}
