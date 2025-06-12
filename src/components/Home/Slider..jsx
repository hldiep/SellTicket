import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { getSlider } from "../../util/sliderApi";


const Slider = () => {
    const [sliders, setSliders] = useState([]);
    useEffect(() => {
        const fetchSlider = async () => {
            const sliderData = await getSlider();
            setSliders(sliderData);
        };
        fetchSlider();
    }, []);

    return (
        <>
            <div className="rounded-lg mt-14 p-3 m-[20px]">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    modules={[Navigation, Autoplay]}
                    className="my-8 max-h-[150px] md:max-h-[200px] lg:max-h-[400px]"
                >
                    {sliders?.map((slider) => (
                        <SwiperSlide key={slider.id}>
                            <img
                                src={slider.image}
                                alt={`Slider ${slider.name}`}
                                className="w-full rounded-sm h-auto object-cover md:max-h-[200px] lg:max-h-[400px] sm:max-h-[150px]"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default Slider;