import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const ProductImg = ({ product }) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    // Extracting images with proper nesting
    const slides = [
        product?.img1,
        product?.img2,
        product?.img3,
    ].filter(Boolean); // Filter out any null or undefined values

    const loopMode = slides.length > 1; // Loop only if there are enough slides

    return (
        <div className="grid grid-cols-3 gap-3">
            {/* Thumbnail Swiper */}
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                    padding: 0,
                }}
                onSwiper={setThumbsSwiper}
                loop={loopMode}
                spaceBetween={10}
                slidesPerView={loopMode ? Math.min(slides.length, 3) : slides.length}
                freeMode={true}
                watchSlidesProgress={true}
                direction="vertical"
                modules={[FreeMode, Navigation, Thumbs]}
                className="h-60 pt-10 w-full gap-5"
            >
                {slides.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img src={img} alt={`Thumbnail ${index + 1}`} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Main Image Swiper */}
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                    padding: 0,
                }}
                loop={loopMode}
                spaceBetween={10}
                navigation={loopMode}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2 h-full w-full col-span-2"
            >
                {slides.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img src={img} alt={`Main image ${index + 1}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductImg;
