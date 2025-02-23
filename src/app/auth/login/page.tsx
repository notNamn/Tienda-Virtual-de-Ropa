import React from "react";
import LoginForm from "@/components/auth/LoginForm";

export default function PageLogin() {
    return (
        <div>
            <h1 className="font-bold text-3xl text-center mb-6 text-gray-800">
                Ingresar
            </h1>
            <LoginForm/>

        </div>
    );
}
