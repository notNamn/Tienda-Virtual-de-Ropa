"use server";


import prisma from "@/lib/prisma";


export interface Address {
    name: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
}

export async function addUserAddress(address:Address, userId: string){
    try {
        console.log('addUserAddress Service ', {address, userId})

        const newOrReplaceAddres = await createOrReplaceUserAddress(address, userId);
        return{
            ok: true,
            message: 'Dirección agregada correctamente',
            address: newOrReplaceAddres
        }
    }catch (error) {
        console.log(error)
        return{
            ok: false,
            message: 'Error al agregar la dirección'
        }
    }
}

async function createOrReplaceUserAddress(address: Address, userId: string) {
    try {
        const addressData = {
            name: address.name,
            lastName: address.lastName,
            address: address.address,
            address2: address.address2,
            postalCode: address.postalCode,
            phone: address.phone,
            countryId: address.country,
            userId: userId,
        };

        const storeUserAddress = await prisma.userAddress.findUnique({
            where:{ userId: userId }
        });

        // si no exixste crear la nueva direccion
        if (!storeUserAddress) {
            const newUserAddress = await prisma.userAddress.create({
                data: addressData,
            })
            return newUserAddress;
        }
        // en caso de existri actualizar la direccion
        const updateAddress = await prisma.userAddress.update({
            where: { userId: userId },
            data: addressData,
        });

        return updateAddress;
    } catch (error) {
        console.log(error);
        throw new Error('Error al actualizar la dirección');
    }
}

export async function deleteUserAddress(userId: string) {
    try {
        await prisma.userAddress.delete({
            where: { userId: userId }
        })
        return {
            ok: true,
            message: 'Dirección eliminada correctamente'
        }
    }catch (error) {
        console.log(error)
        return{
            ok: false,
            message: 'Error al eliminar la dirección'
        }
    }
}

export async function getUserAddress(userId: string) {
    try {
        const userAddress = await prisma.userAddress.findUnique({
            where: { userId: userId }
        });
        return {
            userAddress
        }

    }catch (error) {
        console.log(error);
        return{
            ok: false,
            message: 'Error al obtener la dirección'
        }
    }
}