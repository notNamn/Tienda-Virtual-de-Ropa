"use server";

import {Size} from "@prisma/client";
import {Address} from "@/service/UserAddressService";
import {auth} from "@/config/authConfig";
import prisma from "@/lib/prisma";

interface productToOrder {
    productId: string;
    quantity: number;
    size: Size
}

export async function placeOrderService (productsId: productToOrder[], address:Address){
    try {
        // traer el userId
        const session = await auth();
        const userId = session?.user.id;
        if (!userId) {
            return {
                ok: false,
                message: 'No hay session de usuario, error 500 '
            }
        }
      // console.log({productsId, address, userId})
        // 1 buscar los productos de la orden
        const products = await prisma.product.findMany({
            where:{
                id: {
                    in: productsId.map(product => product.productId)
                }
            }
        });
        // 2 numeros articulos
        const itemsInOrden = productsId.reduce(
            (count, product)=>count + product.quantity ,0)
        // 3 total de la orden
        const {subtotal, tax, total} = productsId.reduce((totals, item)=>{
            const productQuantity = item.quantity;
            const product = products.find(product => product.id === item.productId);
            if (!product) {
                throw new Error(`${item.productId} no existe en la base de datos`);
            }
            const subtotal = product.price * productQuantity;
            totals.subtotal += subtotal;
            totals.tax += subtotal * 0.15; // impuestos
            totals.total += subtotal * 1.15;
            return totals;
        },{subtotal: 0, tax: 0, total: 0} )
        //console.log({subtotal, tax, total, itemsInOrden})

        // Transaccion de la base de datos
        const prismaTx = await prisma.$transaction(async (tx)=>{
            // 1 actualizar el stock de los productos
            const updateProductPromise = products.map(async (product) => {
                const productQuantity = productsId.filter(
                    p=> p.productId === product.id
                    // el reduce junta los produtos
                ).reduce((account, item)=> account + item.quantity, 0);
                if (productQuantity === 0){
                    throw new Error(`El producto ${product.name} no tiene stock`)
                }
                return tx.product.update({
                    where: {id: product.id},
                    data: {
                        // inStock: product.inStock - productQuantity // no hacer mala practica
                        inStock:{
                            decrement: productQuantity
                        }
                    }
                })
            })

            const updateProduct = await Promise.all(updateProductPromise);

            updateProduct.forEach(product =>{
                if (product.inStock <0){
                    throw new Error(`El producto ${product.title} no tiene stock`)
                }
            })


            // 2 crear la orden
            const order = await tx.order.create({
                data:{
                    userId: userId,
                    itemsInOrder: itemsInOrden,
                    subTotal: subtotal,
                    tax: tax,
                    total: total,
                    isPaid: false,
                    OrderItems:{
                        createMany:{
                            data: productsId.map(product => ({
                                productId: product.productId,
                                quantity: product.quantity,
                                size: product.size,
                                price: products.find(p=> p.id === product.productId)?.price ?? 0,
                            }))
                        }
                    }
                }
            })

            // 3 crear las direcciones de la orden
            const {country, ...resAddress} = address;
            const orderAddress = await tx.orderAddress.create({
                data:{
                    name: resAddress.name,
                    lastName: resAddress.lastName,
                    address: resAddress.address,
                    address2: resAddress.address2,
                    city: resAddress.city,
                    postalCode: resAddress.postalCode,
                    phone: resAddress.phone,

                    countryId: country,
                    orderId: order.id
                }
            })
            return{
                updateProduct: updateProduct,
                order: order,
                orderAddress: orderAddress
            }
        });

        return {
            ok: true,
            updateProduct: prismaTx.updateProduct,
            order: prismaTx.order,
            orderAddress: prismaTx.orderAddress
        }

    }catch (error){
        console.log(error)
        return {
            ok: false,
            message: error?.message || 'Error al crear la orden'
        }
    }
}