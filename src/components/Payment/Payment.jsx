import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import InfoTicket from './InfoTicket';

const Payment = () => {
    const navigate = useNavigate();
    const [showTerms, setShowTerms] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        confirmAge: false,
        agreeTerms: false,
    });
    const handleGoBack = () => {
        navigate(-1); // quay lại trang trước
    };
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.confirmAge && formData.agreeTerms) {
            navigate("/continue-payment");
        } else {
            alert("Bạn cần đảm bảo đủ điều kiện và đồng ý với điều khoản!");
        }
    };
    return (
        <div>
            <div className="min-h-screen pt-20 bg-main flex justify-center">
                <div className="container">
                    <div className=' ' >
                        <div>
                            {/* Nút quay lại */}
                            <button
                                onClick={handleGoBack}
                                className="cursor-pointer mt-14 p-3 m-[20px] text-white italic hover:text-yellow-500"
                            >
                                Quay lại
                            </button>

                            {/* Phần còn lại của trang */}
                        </div>
                        <div className='text-white p-3 mb-20'>
                            <div className='mt-4 text-center'>
                                <span className='uppercase font-bold text-3xl '>TRANG THANH TOÁN</span><br />
                            </div>
                            <div className='flex justify-around space-x-4'>
                                <div className='mt-8 p-6 rounded-lg shadow-lg w-1/2'>
                                    <span className='uppercase font-bold text-2xl'>THÔNG TIN KHÁCH HÀNG</span>
                                    <form className='mt-6 w-full mx-auto p-4' onSubmit={handleSubmit}>
                                        <div className='mb-4'>
                                            <label className='block'>Họ tên</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                required
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className="mt-2 w-full p-1 border rounded-md text-gray-900 outline-none"
                                            />
                                        </div>

                                        <div className='mb-4'>
                                            <label className='block'>Số điện thoại</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                pattern="[0-9]{10,11}"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="mt-2 w-full p-1 border rounded-md text-gray-900 outline-none"
                                            />
                                        </div>

                                        <div className='mb-4'>
                                            <label className='block'>Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="mt-2 w-full p-1 border rounded-md text-gray-900 outline-none"
                                            />
                                        </div>

                                        <div className="mt-6 mb-2">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="confirmAge"
                                                    checked={formData.confirmAge}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                    required
                                                />
                                                Đảm bảo mua vé đúng số tuổi quy định
                                            </label>
                                            <label className="flex items-center mt-2">
                                                <input
                                                    type="checkbox"
                                                    name="agreeTerms"
                                                    checked={formData.agreeTerms}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                    required
                                                />
                                                <span className="mr-1">Đồng ý với</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowTerms(prev => !prev)}
                                                    className="text-yellow-400 underline"
                                                >
                                                    điều khoản của chúng tôi
                                                </button>
                                            </label>

                                            {showTerms && (
                                                <div className="mt-2 p-3 bg-gray-100 border border-yellow-300 rounded-md text-sm text-gray-700">
                                                    <p>- Bạn đồng ý cung cấp thông tin chính xác khi đặt vé.</p>
                                                    <p>- Vé đã mua sẽ không được hoàn lại.</p>
                                                    <p>- Vui lòng đảm bảo bạn đủ tuổi với nội dung phim.</p>
                                                </div>
                                            )}

                                        </div>

                                        <button
                                            type="submit"
                                            className='w-1/3 mt-6 border border-yellow-600 font-bold py-2 rounded-lg hover:bg-yellow-600'>
                                            TIẾP TỤC
                                        </button>
                                    </form>
                                </div>
                                <div className='border border-yellow-600 bg-blue-950 mt-8 p-6 rounded-lg shadow-lg w-1/2'>
                                    <InfoTicket />

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Payment