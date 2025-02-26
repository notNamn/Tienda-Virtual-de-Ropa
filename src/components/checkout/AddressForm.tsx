"use client";
import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import {GrFormNextLink} from "react-icons/gr";
import clsx from "clsx";
import {CountrySeed} from "../../../seed/dataBrutaCountry";
import {useAddresStore} from "@/store/address/addressStore";
import {useRouter} from "next/navigation";
import {Address, addUserAddress, deleteUserAddress} from "@/service/UserAddressService";
import {useSession} from "next-auth/react";
import {toast} from "react-toastify";

interface FormInput {
    name: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
    rememberAddress: boolean;
}

interface props {
    countries:CountrySeed[];
    userStoredAddres?:Address;
}

export default function AddressForm({countries, userStoredAddres}: props) {
    const {
        handleSubmit,
        register,
        reset,
        formState: { isValid, errors }
    } = useForm<FormInput>({
        defaultValues: {
            // name:  "",
            // lastName: "",
            // address: "",
            // address2: "",
            // postalCode: "",
            // city: "",
            // country: "",
            // phone: "",
            ...userStoredAddres,
            rememberAddress: false,
        },
    });

    const setAddress = useAddresStore(state => state.setAddress);
    const address = useAddresStore(state => state.address);


    // para cargar los datos
    useEffect(() => {
        if (address.name){
            reset(address);
        }
    }, [address, reset])

    // cambio de ruta si todo sale bien

    const router = useRouter();

    // traer el userId de la session
    const {data} = useSession({
        required: true
    });
    const userIdSession = data?.user?.id;
    //console.log({userId: data?.user?.id});
    const onSubmit = async (data: FormInput) => {
        //console.log({ data });
        setAddress(data);
        const {rememberAddress, ...rest} = data;
        if (rememberAddress){
           const response = await  addUserAddress(rest, userIdSession!);
           if (response.ok){
                //  href='/shop/checkout'
               toast.success(response.message)
               router.push('/shop/checkout');
           }
        }else {
            // eliminar la direccion del usuario
            const response = await deleteUserAddress(userIdSession!);
            if (response.ok){
                toast.warning(response.message);
                router.push('/shop/checkout');
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
        >
            <div className="flex flex-col mb-2">
                <span>Nombres</span>
                <input
                    type="text"
                    placeholder="Nombre"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("name", { required: "El nombre es obligatorio" })}
                />
                {errors.name && <ErrorMessage message={errors.name.message} />}
            </div>

            <div className="flex flex-col mb-2">
                <span>Apellidos</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("lastName", { required: "El apellido es obligatorio" })}
                />
                {errors.lastName && <ErrorMessage message={errors.lastName.message} />}
            </div>

            <div className="flex flex-col mb-2">
                <span>Dirección</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("address", { required: "La dirección es obligatoria" })}
                />
                {errors.address && <ErrorMessage message={errors.address.message} />}
            </div>

            <div className="flex flex-col mb-2">
                <span>Dirección 2 (opcional)</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("address2")}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Código postal</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("postalCode", {
                        required: "El código postal es obligatorio",
                    })}
                />
                {errors.postalCode && <ErrorMessage message={errors.postalCode.message} />}
            </div>

            <div className="flex flex-col mb-2">
                <span>Ciudad</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("city", { required: "El nombre de la ciudad es obligatorio" })}
                />
                {errors.city && <ErrorMessage message={errors.city.message} />}
            </div>

            <div className="flex flex-col mb-2">
                <span>País</span>
                <select
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("country", { required: "El país es obligatorio" })}
                >
                    <option value="">[ Seleccione ]</option>
                    {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </select>
                {errors.country && <ErrorMessage message={errors.country.message} />}
            </div>

            <div className="flex flex-col mb-2">
                <span>Teléfono</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("phone", {
                        required: "El teléfono es obligatorio",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "El teléfono solo debe contener números",
                        },
                    })}
                />
                {errors.phone && <ErrorMessage message={errors.phone.message} />}
            </div>

            <div className="flex flex-col mb-2 sm:mt-10">
                <button
                    type="submit"
                    className={clsx(
                        //"flex w-full sm:w-1/2 justify-center py-2 px-4 rounded transition-all",
                        {
                            "btn-active": isValid,
                            "btn-disabled": !isValid
                        }
                    )}

                >
                    SIGUIENTE <span> <GrFormNextLink size={30} /> </span>
                </button>
            </div>

            <div>
                <label className="inline-flex items-center" htmlFor="rememberAddress">
                    <input
                        id="rememberAddress"
                        type="checkbox"
                        className="w-4 h-4 accent-indigo-700"
                        {...register("rememberAddress")}
                    />
                    <span className="ml-2">Recordar Ubicación</span>
                </label>
            </div>
        </form>
    );
}

function ErrorMessage({ message }: { message: any }) {
    return <span className="text-red-500">{message}</span>;
}
