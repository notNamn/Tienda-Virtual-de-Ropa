import React from "react";
import { ValidSizes } from "@/interfaces/productInterface";
import clsx from "clsx";

interface Props {
    selectedSize?: ValidSizes;
    availableSizes: ValidSizes[];
    onSizeChange: (size: ValidSizes) => void;
}

export default function SizeSelector({ selectedSize, availableSizes, onSizeChange }: Props) {
    return (
        <div className="my-5">
            <h3 className="font-bold mb-5">Tallas disponibles</h3>

            <div className="flex">
                {availableSizes.map((size) => (
                    <button
                        key={size}
                        className={clsx(
                            "mx-2 px-3 py-1 transition-all font-medium",
                            "border-b-2 border-transparent", // Subrayado invisible por defecto
                            "hover:border-gray-400 hover:text-blue-600", // Efecto hover
                            {
                                "border-blue-600 text-blue-600": selectedSize === size, // Activo
                            }
                        )}
                        onClick={() => onSizeChange(size)}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
}
