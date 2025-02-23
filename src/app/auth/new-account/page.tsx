import React from "react";
import Link from "next/link";
import NewAccounForm from "@/components/auth/NewAccounForm";

export default function PageNewAccunt() {
    return (
        <div>
            <h1 className="font-bold text-3xl text-center mb-6 text-gray-800">
                Crear Nueva Cuenta
            </h1>

            <NewAccounForm />
        </div>
    );
}
