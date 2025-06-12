import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSlider } from '../../util/sliderApi';

const NavPromotion = () => {
    const navigate = useNavigate();
    const [slider, setSlider] = useState([]);

    useEffect(() => {
        const fetchSlider = async () => {
            try {
                const sliderData = await getSlider();
                if (Array.isArray(sliderData)) {
                    setSlider(sliderData);
                } else {
                    console.error("Slider data is not an array:", sliderData);
                    setSlider([]);
                }
            } catch (error) {
                console.error("Failed to fetch slider:", error);
                setSlider([]);
            }
        };
        fetchSlider();
    }, []);

    return (
        <div className="min-h-screen pt-20 bg-main flex justify-center">
            <div className="container px-4">
                <h2 className="text-3xl uppercase font-bold text-center mt-28 text-white">
                    Khuyến Mãi Đặc Biệt
                </h2>
                <div>
                    {slider.map((slide) => (
                        <div key={slide.id} className="mt-10 mb-10 items-center">
                            <div className="flex space-x-5">
                                <img
                                    src={slide.image}
                                    alt={slide.name}
                                    className="w-1/2 h-56 object-cover transition-transform duration-300 hover:scale-110"
                                />
                                <div className="text-white">
                                    <p className="text-lg font-semibold">{slide.name}</p>
                                    {/* <p className="text-sm mt-2">{slide.description}</p> */}
                                    <button
                                        onClick={() => navigate(`/movie/${slide.movieId || slide.id}`)}
                                        className="mt-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-300 text-black font-bold rounded"
                                    >
                                        ĐẶT VÉ NGAY
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NavPromotion;
