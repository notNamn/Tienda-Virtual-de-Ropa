import React from "react";
import {auth} from "@/config/authConfig";
import {redirect} from "next/navigation";
import ToastNotification from "@/components/ui/ToastNotification";

interface PropsLayout {
    children: React.ReactNode;
}

export default async function LayoutAuth({ children }: PropsLayout) {
    // const session = await auth();
    // console.log({session})
    // if (session?.user) {
    //     redirect('/')
    // }
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
                <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
                    {children}
                </div>
            </div>
            <ToastNotification/>
        </>
    );
}
