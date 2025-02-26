import React from 'react'
import Title from "@/components/ui/Title";
import Image from "next/image";
import {IoCardOutline} from "react-icons/io5";
import {getOrderById} from "@/service/order/getOrderById";
import {redirect} from "next/navigation";


interface props {
    params: {
        id: string
    }
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD" }).format(value);


export default async function PageOrderById({params}: props) {
    const {id} = params;

    const response = await getOrderById(id);
    if (!response.ok){
        redirect('/shop')
    }
    const order = response.order;
    console.log({order})

    const productsInCart = response!.order?.OrderItems;
    const orderAddress = response.order?.OrderAddress;

    return (
        <div
            className="flex justify-center items-center mb-72 px-10 sm:px-0"
        >
            <div
                className="flex flex-col w-[1000px]"
            >
                <Title title={`Orden N°: ${id}`}/>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-10"
                >
                    {/*  Carrito  */}
                    <div
                        className="flex flex-col mt-5"
                    >
                        <IsPayItemWidget estado={order!.isPaid} />

                        <span className="text-xl mb-4" >
                            Items agregados
                        </span>

                        {/*Items de carritos */}

                        {productsInCart!.map(product => (
                            <div
                                key={product.product.slug}
                                className="flex mb-2"
                            >
                                <Image
                                    width={100}
                                    height={100}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                    }}
                                    src={`/products/${product.product.images[0].url}`}
                                    alt={product.product.title}
                                    className="mr-5"
                                />
                                <div>
                                    <p className="font-extralight text-xl" >
                                        {product.size} -  {product.product.title}
                                    </p>
                                    <p  >Unidades: {product.quantity} </p>
                                    <p className="font-bold" >
                                        Subtotal: ${product.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/*Resumen de la compra */}
                    <div
                        className="bg-white rounded-xl shadow-xl p-7"
                    >
                        <h2 className="text-2xl mb-2 font-semibold" >
                            Resumen de la orden
                        </h2>
                        {/*Datos de la orden */}
                        <div className=" grid grid-cols-2 mb-10" >
                            <p className="text-lg" >Nombre de cliente:</p>
                            <span className="text-right" >{`${orderAddress?.name} ${orderAddress?.lastName} `}</span>
                            <p className="text-lg" >Direccion de entrega:</p>
                            <span className="text-right" >{orderAddress?.address} </span>
                            <p className="text-lg" >Ciudad:</p>
                            <span className="text-right" >{orderAddress?.city}</span>
                            <p className="text-lg" >Telefono:</p>
                            <span className="text-right" >{orderAddress?.phone}</span>
                        </div>
                        {/*Resumen de la compra */}
                        <h2 className="text-xl mb-2" >Resumen de compra</h2>
                        <div
                            className="grid grid-cols-2"
                        >
                            <span>N° de productos  </span>
                            <span className="text-right" >
                                {order!.itemsInOrder===1 ? `${order!.itemsInOrder} producto` : `${order!.itemsInOrder} productos` }
                            </span>

                            <span>Subtotal:  </span>
                            <span className="text-right" > {formatCurrency(order!.subTotal)}</span>

                            <span>Impuestos (15%) </span>
                            <span className="text-right" >{formatCurrency(order!.tax)}</span>

                            <span className="mt-5 text-2xl" >Total:  </span>
                            <span className="mt-5 text-2xl text-right" > {formatCurrency(order!.total)}</span>

                        </div>

                        <div
                            className="mt-5 mb-2 w-full"
                        >
                            <IsPayItemWidget estado={order!.isPaid} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

function IsPayItemWidget({estado}: {estado: boolean}) {

    return(
        <div
            className={`flex items-center rounded-lg py-2 px-3.5 
                text-xs font-bold text-white mb-5 ${estado ? 'bg-green-500' : 'bg-red-500'}`}
        >
            <IoCardOutline size={30} />
            <span className="mx-2"> {estado ? 'Orden pagada' : 'pendiente de pago'} </span>
        </div>
    )
}