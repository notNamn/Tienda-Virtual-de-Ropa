"use client";

import React, { useState } from "react";
import SizeSelector from "@/components/product/Items/SizeSelector";
import QuantitySelector from "@/components/product/Items/QuantitySelector";
import { CartProduct, SeedProduct, ValidSizes } from "@/interfaces/productInterface";
import { useCartStore } from "@/store/cart/cartStore";
import { toast } from "react-toastify";

interface Props {
    product: SeedProduct;
}

export default function AddToCart({ product }: Props) {
    const [size, setSize] = useState<ValidSizes | undefined>();
    const [quantity, setQuantity] = useState(1);
    const [showError, setShowError] = useState(false);

    const addProductToCart = useCartStore((state) => state.addProductToCart);

    const addToCart = () => {
        setShowError(false);

        if (!size) {
            setShowError(true);
            return;
        }

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            sizes: size,
            image: product.images[0],
        };

        addProductToCart(cartProduct);
        toast.success("Producto agregado al carrito");

        // Reset form
        setQuantity(1);
        setSize(undefined);
    };

    return (
        <>
            {showError && !size && (
                <span className="mt-2 text-red-500 fade-in">
                    Debe seleccionar una talla
                </span>
            )}

            {/* Selector de tallas */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChange={setSize}
            />

            {/* Selector de cantidad */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
            />

            {/* Botón */}
            <button
                onClick={addToCart}
                className="btn-primary mt-4"
                disabled={!size}
            >
                {size ? `Agregar ${quantity} al carrito` : "Seleccione una talla"}
            </button>
        </>
    );
}
