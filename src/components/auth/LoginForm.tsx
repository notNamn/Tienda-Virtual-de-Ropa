"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useActionState } from "react";
import { authenticate } from "@/service/auth/authLoginService";
import { IoInformationOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {useFormStatus} from "react-dom";

export default function LoginForm() {
    const [state, dispach] = useActionState(authenticate, undefined);
    const router = useRouter();

    useEffect(() => {
        if (state === "success") {
            router.replace("/");
        }
    }, [state, router]);

    return (
        <form action={dispach} className="flex flex-col space-y-5">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="usuario@correo.com"
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>

            <LoginButton />

            <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                {state && (
                    <>
                        <IoInformationOutline size={30} className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{state}</p>
                    </>
                )}
            </div>

            <div className="flex items-center my-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-3 text-gray-500">O</span>
                <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="w-full bg-gray-200 text-gray-800 py-2 rounded-md text-center hover:bg-gray-300 transition-all font-semibold"
            >
                Crear una nueva cuenta
            </Link>
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all font-semibold"
        >
            Ingresar
        </button>
    );
}
