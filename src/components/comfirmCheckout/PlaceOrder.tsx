"use client";
import React, {useEffect, useState} from 'react'
import {useAddresStore} from "@/store/address/addressStore";
import {useCartStore} from "@/store/cart/cartStore";
import clsx from "clsx";
import {placeOrderService} from "@/service/order/placeOrderService";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD" }).format(value);


export default function PlaceOrder() {

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // para que solo se precione sun solo click
    const [orderPlaced, setOrderPlaced] = useState(false);

    // datos de la direccion de la orden
    const addres = useAddresStore(state => state.address);
    // order summary
    const numberOfItems = useCartStore(state => state.getSummaryInformation().numberOfItems);
    const tax = useCartStore(state => state.getSummaryInformation().tax);
    const subTotal = useCartStore(state => state.getSummaryInformation().subTotal);
    const total = useCartStore(state => state.getSummaryInformation().total);

    // productos del carrito
    const cart = useCartStore(state => state.cart);

    // limpiar el carrito una vez que se realice la compra
    const clearCart = useCartStore(state => state.clearCart);

    // evita el error del componente
    useEffect(() => {
        setLoading(true);
    }, []);

    // redireccionar
    const router = useRouter();

    const placeOrder = async () => {
        // solo lo que queremos de la addres
        const {rememberAddress, ...restaddress} = addres;

        //
        const productsToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.sizes
        }))

        const response = await placeOrderService(productsToOrder, restaddress);
       // console.log({response}) // undefined

        if (!response?.ok){
            setOrderPlaced(true);// desabilita el btn
            setErrorMessage(response?.message)
            return;
        }

        // respuesta correcta
        clearCart();
        toast.success('Orden realizada con exito');
        router.push(`/shop/orders/${response.order?.id}`);
    }


    if (!loading) {
        return <p>Cargando ... </p>
    }
    return (
        <div
            className="bg-white rounded-xl shadow-xl p-7"
        >
            <h2 className="text-2xl mb-4 font-semibold" >
                Resumen de la orden
            </h2>
            {/*Datos de la orden */}
            <h2 className="text-xl mb-2 font-semibold" >Direccion de entrega: </h2>
            <div className=" grid grid-cols-2 mb-10" >

                <p className="text-lg" >Nombre de cliente:</p>
                <span className="text-right" >{addres.name} </span>
                <p className="text-lg" >Apellido de cliente:</p>
                <span className="text-right" >{addres.lastName} </span>
                <p>Dereccion 1: </p>
                <span className="text-right" > {addres.address} </span>
                {addres.address2 && <>
                    <p>Dereccion 2: </p>
                    <span className="text-right" > {addres.address2} </span>
                </> }
                <p>Telefono:  </p>
                <span className="text-right" >{addres.phone}</span>
                <p>Ciudad:  </p>
                <span className="text-right" > {addres.city} </span>
                <p>Pais:</p>
                <span className="text-right" >{addres.country}</span>
            </div>

            {/*Resumen de la compra */}
            <h2 className="text-xl mb-2 font-semibold " >Resumen de compra</h2>
            <div
                className="grid grid-cols-2"
            >
                <span>N° de productos  </span>
                <span className="text-right" >
                    {numberOfItems === 1 ? `${numberOfItems} producto` : `${numberOfItems} productos`}
                </span>

                <span>Subtotal:  </span>
                <span className="text-right" > {formatCurrency(subTotal)} </span>

                <span>Impuestos (15%) </span>
                <span className="text-right" > {formatCurrency(tax)} </span>

                <span className="mt-5 text-2xl" >Total:  </span>
                <span className="mt-5 text-2xl text-right" > {formatCurrency(total)} </span>

            </div>

                {errorMessage && <span className="text-red-500" >{errorMessage}</span> }


            <div
                className="mt-5 mb-2 w-full"
            >
                <button
                    //href={'/shop/orders/123'}
                    onClick={placeOrder}
                    className={
                        clsx( "flex justify-center", {
                            'btn-primary': !orderPlaced,
                            'btn-disabled': orderPlaced
                        })
                    }
                >
                    CONFIRMAR COMPRA
                </button>
            </div>

        </div>
    )
}
