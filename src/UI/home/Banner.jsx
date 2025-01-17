import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import b1 from '../../assets/banner/b1.jpg';
import b2 from '../../assets/banner/b2.jpg';
import b3 from '../../assets/banner/b3.jpg';
import b4 from '../../assets/banner/b4.jpg';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Container from '../../component/Container';
import BannerCard from './BannerCard';

export default function Banner() {
    return (
        <Container>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >

                <SwiperSlide>
                    <BannerCard

                        discription={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae totam sed, soluta dolores laborum vero. Quod aspernatur ad nesciunt ipsam.'}
                        title={'Find clothes that matches your style'}
                        image={b1} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerCard

                        discription={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae totam sed, soluta dolores laborum vero. Quod aspernatur ad nesciunt ipsam.'}
                        title={'Find clothes that matches your style'}
                        image={b2} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerCard

                        discription={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae totam sed, soluta dolores laborum vero. Quod aspernatur ad nesciunt ipsam.'}
                        title={'Find clothes that matches your style'}
                        image={b3} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerCard

                        discription={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae totam sed, soluta dolores laborum vero. Quod aspernatur ad nesciunt ipsam.'}
                        title={'Find clothes that matches your style'}
                        image={b4} />
                </SwiperSlide>

            </Swiper>
        </Container>
    );
}
