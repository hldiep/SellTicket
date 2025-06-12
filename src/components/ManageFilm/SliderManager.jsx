import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { addSlider, getSlider } from '../../util/sliderApi';

const SliderManager = () => {
    const navigate = useNavigate();
    const [sliders, setSliders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newSlider, setNewSlider] = useState({
        image:"",
        name:"",
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSlider((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    useEffect(() => {
        fetchSliders();
    }, []);

    const fetchSliders = async () => {
        try {
            const res = await getSlider();
            setSliders(res);
        } catch (err) {
            console.error('Lỗi khi lấy slider:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newSlider.image || !newSlider.name) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
        const result = await addSlider(newSlider);
        if (result) {
            alert("Thêm slider thành công!");
            setNewSlider({ image: "", name: ""}); 
        } else {
            alert("Thêm thất bại!");
        }
    };


    return (
        <ClippedDrawer>
            <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                    <button
                        onClick={() => navigate('/admin')}
                        className="hover:underline text-blue-600"
                    >
                        Dashboard
                    </button>
                    <span>/</span>
                    <button
                        onClick={() => navigate('/quan-ly-phim')}
                        className="hover:underline text-blue-600"
                    >
                        Quản lý phim
                    </button>
                    <span>/</span>
                    <span className="text-gray-700 font-medium">Quản lý slider</span>
                </div>
                <div className='flex justify-between text-center items-center'>
                    <h2 className="text-xl font-semibold p-4">Quản lý slider</h2>

                </div>
            </div>
            <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
                <div className='container'>
                    <div className="p-6 font-sans text-black">

                        <div className="bg-gray-100 p-4 rounded shadow mb-6 text-black">
                            <h3 className="text-lg font-semibold mb-4">Thêm Slider mới</h3>

                            <div className="mb-4">
                                <label className="block font-medium mb-1">Link ảnh</label>
                                <input
                                    type="text"
                                    name="image"
                                    placeholder="https://example.com/slider.jpg"
                                    className="border px-3 py-2 w-full rounded-md outline-none"
                                    value={newSlider.image}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block font-medium mb-1">Tên hình ảnh (Tên phim)</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Avengers: Endgame"
                                    className="border px-3 py-2 w-full rounded-md outline-none"
                                    value={newSlider.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                            >
                                Thêm Slider
                            </button>
                        </div>

                        {/* Danh sách slider */}
                        <div className="bg-gray-100  p-4 rounded shadow mb-6 text-black">
                            <h3 className="text-lg font-semibold mb-4">Danh sách Slider</h3>
                            {loading ? (
                                <div className="flex justify-center items-center py-10">
                                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-r-transparent"></div>
                                    <div className="ml-4 text-blue-600 font-medium text-lg">Đang tải dữ liệu...</div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {sliders.map((slider) => (
                                        <div key={slider.id} className="bg-white rounded shadow p-4">
                                            <img src={slider.image} alt={slider.name} className="w-full h-48 object-cover rounded mb-2" />
                                            <h4 className="font-bold text-black">{slider.name}</h4>
                                            {slider.movieName && (
                                                <p className="text-sm text-blue-700 font-semibold mt-1">
                                                    🎬 Phim: {slider.movieName}
                                                </p>
                                            )}
                                            {/* <button
                                            onClick={() => removeSlider(slider.id)}
                                            className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                        >
                                            Xoá
                                        </button> */}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ClippedDrawer>
    )
}

export default SliderManager