"use client";

import React, { useEffect, useState } from "react";
import { getStockBySlug } from "@/service/ProductService";

interface Props {
    slug: string;
}

export default function StockLabel({ slug }: Props) {
    const [stock, setStock] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const { inStock } = await getStockBySlug(slug);
                setStock(inStock);
            } catch (error) {
                console.error("Error obteniendo stock:", error);
                setStock(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStock();
    }, [slug]);

    if (isLoading) {
        return <h1 className="antialiased  text-xl">
            Cargando stock...
        </h1>;
    }

    return (
        <h1 className="antialiased font-extralight text-xl">
            Stock: {stock !== null ? stock : "No disponible"}
        </h1>
    );
}
