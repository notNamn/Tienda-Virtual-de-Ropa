"use client";
import React from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;
    onQuantityChange: (quantity: number) => void;
}

export default function QuantitySelector({ quantity = 0, onQuantityChange }: Props) {

    const handleDecrease = () => {
        if (quantity>1){
            onQuantityChange(quantity - 1);
        }
    };

    const handleIncrease = () => {
        onQuantityChange(quantity + 1);
    };

    return (
        <div className="flex">
            <button onClick={handleDecrease}>
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-20 mx-3 px-5 bg-gray-100 text-center">
                {quantity}
            </span>
            <button onClick={handleIncrease}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    );
}
