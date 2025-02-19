import React from "react";
import Link from "next/link";
import { IoMailOutline } from "react-icons/io5";
import { FaStore } from "react-icons/fa";

interface LinkFooter {
    title: string;
    links?: LinkData[];
}

interface LinkData {
    name: string;
    href: string;
    extra?: string;
}

const links: LinkFooter[] = [
    { title: "Home" },
    {
        title: "Products",
        links: [{ name: "All products", href: "/shop/product" }],
    },
    {
        title: "Categories",
        links: [
            { name: "Hombres", href: "/shop/category/men" },
            { name: "Mujeres", href: "/shop/category/women" },
            { name: "Niños", href: "/shop/category/kid" },
            { name: "Unisex", href: "/shop/category/unisex", extra: "New" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-gray-100 py-10">
            <div className="max-w-screen-xl mx-auto px-6 text-gray-800 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {links.map((link) => (
                    <div key={link.title} className="text-center sm:text-left">
                        <h3 className="text-sm uppercase text-gray-500 font-semibold mb-4">
                            {link.title}
                        </h3>
                        <div className="space-y-3">
                            {link.links ? (
                                link.links.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-gray-600 hover:text-gray-900 transition-colors block text-sm"
                                    >
                                        {item.name}
                                        {item.extra && (
                                            <span className="ml-2 bg-teal-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
                        {item.extra}
                      </span>
                                        )}
                                    </Link>
                                ))
                            ) : (
                                <Link
                                    href="/"
                                    className="text-gray-600 hover:text-gray-900 transition-colors block text-sm"
                                >
                                    {link.title}
                                </Link>
                            )}
                        </div>
                    </div>
                ))}

                {/* Sección de contacto */}
                <div className="text-center sm:text-left">
                    <h3 className="text-sm uppercase text-gray-500 font-semibold mb-4">
                        Contacto
                    </h3>
                    <div className="space-y-3">
                        <p className="flex items-center justify-center sm:justify-start text-gray-700 font-semibold">
                            <FaStore className="mr-2 text-teal-500" /> tiendaVirtual.com
                        </p>
                        <a
                            href="mailto:tiendaVirtual@company.com"
                            className="flex items-center justify-center sm:justify-start text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <IoMailOutline className="mr-2 text-teal-500" /> tiendaVirtual@company.com
                        </a>
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} TiendaVirtual. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
