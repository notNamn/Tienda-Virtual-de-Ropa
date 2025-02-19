import React from "react";

interface PropsLayout {
    children: React.ReactNode;
}

export default function Layout({ children }: PropsLayout) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
                {children}
            </div>
        </div>
    );
}
