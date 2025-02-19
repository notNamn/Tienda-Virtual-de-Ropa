"use client";
import React, {useState} from 'react'
import {Swiper, SwiperSlide} from "swiper/react";
import {Swiper as SwiperType} from 'swiper';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './sliShow.css';
import {Autoplay, FreeMode, Navigation, Thumbs} from "swiper/modules";
import Image from "next/image";

interface props {
    images: string[];
    title: string;
    className?: string;
}

export default function SlideShowProduct({images, title, className}: props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <div className={className}>

            <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                className="mySwiper2"
                // para que cambien automaticamente las imagenes
                autoplay={{
                        delay: 2500,
                        //disableOnInteraction: false,
                    }}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} >
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
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} >
                        <Image
                            width={300}
                            height={300}
                            src={`/products/${image}`}
                            alt={title}
                            className="rounded-lg object-fill"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
