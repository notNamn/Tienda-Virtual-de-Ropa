"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./sliShow.css";
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import Image from "next/image";

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export default function SlideShowProductMobile({ images, title, className }: Props) {
    return (
        <div className={className}>
            <Swiper
                style={{
                    width: "100vw",
                    height: "500px",
                }}
                loop={true}
                navigation={true}
                pagination={{
                    clickable: true, // Permite hacer clic en los puntos de paginación
                }}
                modules={[FreeMode, Navigation, Pagination, Thumbs, Autoplay]}
                autoplay={{
                    delay: 2500,
                }}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            width={500}
                            height={500}
                            src={`/products/${image}`}
                            alt={title}
                            className="rounded-lg object-fill"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
