import React from 'react'
import {ValidSizes} from "@/interfaces/productInterface";
import clsx from "clsx";

interface props {
    selectedSize: ValidSizes;
    availableSizes: ValidSizes[];
}

export default function SizeSelector({selectedSize, availableSizes}:props) {
    return (
        <div
            className="my-5 "
        >
            <h3 className="font-bold mb-5" >
                Tallas disponibles
            </h3>

            <div className="flex">
                {availableSizes.map(size => (
                    <button
                        key={size}
                        className={
                        clsx("mx-2 hover:underline hover:text-blue-600 transition-all",{
                            "underline text-blue-600 ": selectedSize === size
                        })}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    )
}
