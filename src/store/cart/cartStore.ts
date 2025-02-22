"use client";
import { CartProduct } from "@/interfaces/productInterface";
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface Estado {
    cart: CartProduct[];
    addProductToCart: (product: CartProduct) => void;
    getTotalItems: () => number;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: (product: CartProduct) => void;

    getSummaryInformation: () => {
        numberOfItems: number,
        subTotal: number,
        tax: number,
        total: number,
    };
}

export const useCartStore = create<Estado>()(
    persist(
        (set, get) => ({
            cart: [],

            addProductToCart: (product: CartProduct) => {
                const { cart } = get();

                // Verificar si el producto ya está en el carrito
                const productInCart = cart.some(
                    (item) =>
                        item.id === product.id && item.sizes.toString() === product.sizes.toString()
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                // Si el producto ya existe en el carrito, aumentar la cantidad
                const updatedCart = cart.map((item) =>
                    item.id === product.id && item.sizes.toString() === product.sizes.toString()
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );

                set({ cart: updatedCart });
            },
            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
                // 0 valor incial
                // total : total + item.quantity
            },
            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const {cart} = get();
                const updatedCart = cart.map((item) =>{
                    if(item.id === product.id &&
                        item.sizes.toString() === product.sizes.toString()){
                        return {
                            ...item,
                            quantity: quantity
                        }
                    }
                    return item;
                })
                set({cart: updatedCart});
            },
            removeProduct: (product: CartProduct) => {
                const { cart } = get();
                const updatedCart = cart.filter(
                    (item) => item.id !== product.id || item.sizes.toString() !== product.sizes.toString()
                );
                set({ cart: updatedCart });
            },
            getSummaryInformation: () => {
                const { cart } = get();
                const subTotal = cart.reduce(
                    (total, product) => total + product.price * product.quantity
                    , 0
                );

                // Impuesto del 15%
                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                const numberOfItems = cart.reduce((total, product) => total + product.quantity, 0);

                return {
                    numberOfItems: numberOfItems,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,
                };
            },
        }),
        {
            name: "shopping-cart",
            getStorage: () => localStorage, // Asegurar persistencia en localStorage
        }
    )
);
