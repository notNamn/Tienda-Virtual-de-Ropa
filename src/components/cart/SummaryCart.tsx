"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart/cartStore";

// Formateador de moneda
const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD" }).format(value);


export default function SummaryCart() {
    const [loaded, setLoaded] = useState(false);
    //const getSummaryInformation = useCartStore(state => state.getSummaryInformation);

    const numberOfItems = useCartStore(state => state.getSummaryInformation().numberOfItems);
    const tax = useCartStore(state => state.getSummaryInformation().tax);
    const subTotal = useCartStore(state => state.getSummaryInformation().subTotal);
    const total = useCartStore(state => state.getSummaryInformation().total);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) return <p>Cargando ... </p>;

    return (
        <div className="grid grid-cols-2">
            <span>N° de productos:  </span>
            <span className="text-right">
                {numberOfItems === 1 ? `${numberOfItems} producto` : `${numberOfItems} productos`}
            </span>

            <span>Subtotal:  </span>
            <span className="text-right"> {formatCurrency(subTotal)} </span>

            <span>Impuestos (15%) </span>
            <span className="text-right"> {formatCurrency(tax)} </span>

            <span className="mt-5 text-2xl">Total:  </span>
            <span className="mt-5 text-2xl text-right"> {formatCurrency(total)} </span>
        </div>
    );
}
