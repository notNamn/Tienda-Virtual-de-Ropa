import React from 'react'
import Image from "next/image";


interface props{
    src?: string;
    alt: string;
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
    width?: number;
    height?: number;
}

export default function ProductImage({src, alt, className, width, height}: props) {
    const newUrl = (src) ?
        src.startsWith('http') ? src : `/products/${src}` : '/imgs/placeholder.jpg';
    return (
        <Image
            src={newUrl} alt={alt} className={className} width={width} height={height}
        />
    )
}
