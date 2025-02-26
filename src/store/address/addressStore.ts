"use client";
import {create} from "zustand/react";
import {createJSONStorage, persist} from "zustand/middleware";

interface state {
    // estado inicial
    address:{
        name: string,
        lastName: string,
        address: string,
        address2?: string,
        postalCode: string,
        city: string,
        country: string,
        phone: string,
        rememberAddress: boolean
    }
    // metodos
    setAddress: (address: state["address"]) => void;
}

export const useAddresStore = create<state>()(
    persist(
        (set)=>({
            address:{
                name: "",
                lastName: "",
                address: "",
                address2: "",
                postalCode: "",
                city: "",
                country: "",
                phone: "",
                rememberAddress: false
            },
            setAddress: (address: state["address"]) => {
                set({address})
              //  console.log({address})
            },
        }),
        {
            name: "address-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
)