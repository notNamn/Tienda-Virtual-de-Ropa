import React from "react";
import Link from "next/link";

export default function PageLogin() {
    return (
        <div>
            <h1 className="font-bold text-3xl text-center mb-6 text-gray-800">
                Ingresar
            </h1>

            <form className="flex flex-col space-y-5">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        placeholder="usuario@correo.com"
                        className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all font-semibold"
                >
                    Ingresar
                </button>

                {/* Divisor de línea */}
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
        </div>
    );
}
