"use client";
import React from 'react';
import Link from "next/link";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import CreateAccount from "@/service/auth/authCreateAccountService";
import {toast} from "react-toastify";

interface FormInput {
    name: string;
    email: string;
    password: string;
}

export default function NewAccounForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();

    const onSubmit = async (data: FormInput) => {
        // ejecutar la accion para crear el registro
        const response = await CreateAccount(data.name, data.email, data.password);
        if (!response.ok) {
            toast.error(response.message);
            return;
        }
        toast.success(response.message);
        console.log(response.user);
        
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">

            {/* Campo Nombre */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre:
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="usuario"
                    className={clsx(
                        "w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition",
                        { 'border-red-500': errors.name }
                    )}
                    {...register("name", {
                        required: "El nombre es obligatorio",
                        minLength: { value: 3, message: "Debe tener al menos 3 caracteres" }
                    })}
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            {/* Campo Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico:
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="usuario@correo.com"
                    className={clsx(
                        "w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition",
                        { 'border-red-500': errors.email }
                    )}
                    {...register("email", {
                        required: "El correo es obligatorio",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Formato de correo no válido"
                        }
                    })}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>

            {/* Campo Contraseña */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña:
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className={clsx(
                        "w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition",
                        { 'border-red-500': errors.password }
                    )}
                    {...register("password", {
                        required: "La contraseña es obligatoria",
                        minLength: { value: 4, message: "Debe tener al menos 6 caracteres" },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
                            message: "Debe contener al menos una letra y un número"
                        }
                    })}
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>

            {/* Botón de Envío */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all font-semibold"
            >
                Crear Nueva Cuenta
            </button>

            {/* Separador */}
            <div className="flex items-center my-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-3 text-gray-500">O</span>
                <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Enlace a Login */}
            <Link
                href="/auth/login"
                className="w-full bg-gray-200 text-gray-800 py-2 rounded-md text-center hover:bg-gray-300 transition-all font-semibold"
            >
                Login
            </Link>
        </form>
    );
}
