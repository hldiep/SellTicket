import React, { useState } from 'react'
import "swiper/css";
import "swiper/css/navigation";
import Slider from "./Slider.";
import SelectorBar from "./SelectorBar";
import SectionFilming from "./SectionFilming";
import Contact from './Contact';
import SectionFilming2 from './SectionFilming2';

const HomePage = () => {

    return (
        <div className="min-h-screen pt-20 bg-main flex justify-center">

            <div className={"container"}>
                <Slider />
                <SelectorBar />
                <main className="p-8 text-center">
                    <SectionFilming />
                    <SectionFilming2 />
                    <br />
                    {/*<div>*/}
                    {/*    <h1 className="text-4xl font-bold mb-4 text-white">PHIM SẮP CHIẾU</h1>*/}
                    {/*    <Swiper*/}
                    {/*        spaceBetween={20}*/}
                    {/*        slidesPerGroup={1}*/}
                    {/*        navigation*/}
                    {/*        loop={false}*/}
                    {/*        modules={[Navigation]}*/}
                    {/*        className="my-8"*/}
                    {/*        breakpoints={{*/}
                    {/*            320: {slidesPerView: 1, slidesPerGroup: 1}, // Điện thoại nhỏ (1 phim)*/}
                    {/*            480: {slidesPerView: 1, slidesPerGroup: 1}, // Điện thoại lớn (1 phim)*/}
                    {/*            768: {slidesPerView: 2, slidesPerGroup: 2}, // Tablet (2 phim)*/}
                    {/*            1024: {slidesPerView: 3, slidesPerGroup: 3}, // Máy tính (3 phim)*/}
                    {/*            1280: {slidesPerView: 4, slidesPerGroup: 4}, // Màn hình lớn (4 phim)*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        {movies.map((movie) => (*/}
                    {/*            <SwiperSlide key={movie.id}>*/}
                    {/*                <a href="">*/}
                    {/*                    <div className="relative">*/}
                    {/*                        <div className="relative group">*/}
                    {/*                            <img*/}
                    {/*                                src={movie.image}*/}
                    {/*                                alt={movie.title}*/}
                    {/*                                className="w-full h-[420px] object-cover rounded-sm"*/}
                    {/*                            />*/}
                    {/*                            <div*/}
                    {/*                                className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm p-4 text-center">*/}
                    {/*                                <h2 className="text-xl font-bold">{movie.title}</h2>*/}
                    {/*                                <p className="text-sm mt-2">{movie.category}</p>*/}
                    {/*                                <p className="text-sm mt-1">{movie.duration}</p>*/}
                    {/*                                <p className="text-sm mt-1">{movie.country}</p>*/}
                    {/*                            </div>*/}
                    {/*                        </div>*/}
                    {/*                        <h2 className="text-lg text-white hover:text-yellow-500 uppercase font-semibold text-center mt-3 h-16 overflow-hidden text-ellipsis">*/}
                    {/*                            {movie.title}*/}
                    {/*                        </h2>*/}
                    {/*                        <div className="flex justify-center space-x-4 mt-3">*/}
                    {/*                            <button*/}
                    {/*                                onClick={() => window.open(movie.trailer, "_blank")}*/}
                    {/*                                className="text-white border border-white px-4 py-1 rounded-md hover:bg-gray-900 transition duration-300 text-sm"*/}
                    {/*                            >*/}
                    {/*                                Xem Trailer*/}
                    {/*                            </button>*/}
                    {/*                            <button*/}
                    {/*                                className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-800 transition duration-300 text-sm">*/}
                    {/*                                Đặt Vé*/}
                    {/*                            </button>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </a>*/}
                    {/*            </SwiperSlide>*/}
                    {/*        ))}*/}
                    {/*    </Swiper>*/}
                    {/*    <button*/}
                    {/*        className='border border-white hover:bg-green-700 text-white uppercase px-6 py-2 rounded-lg font-semibold'>Xem*/}
                    {/*        thêm*/}
                    {/*    </button>*/}
                    {/*</div>*/}

                </main>
                <Contact />
            </div>
        </div>
    )
}

export default HomePage