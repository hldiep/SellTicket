import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Verification = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (verificationCode.length === 6) {
            setSuccess(true);
        } else {
            setError("Mã xác minh phải gồm 6 chữ số.");
        }
    };

    return (
        <div className="min-h-screen pt-20 bg-main flex justify-center items-center">
            <div className="container max-w-md w-full">
                <main className="p-8 text-center">
                    {!success ? (
                        <div className='mt-20 text-white'>
                            <span className='uppercase font-bold text-2xl'>Xác minh tài khoản</span>
                            <p className="mt-2 text-sm">Vui lòng nhập mã xác minh được gửi đến email hoặc số điện thoại của bạn.</p>
                            <form onSubmit={handleSubmit} className='block text-left text-sm border border-yellow-600 mt-8 p-6 rounded-lg shadow-lg'>
                                <div>
                                    <p className='flex items-center mt-4'>
                                        <span>Mã xác minh</span>
                                    </p>
                                    <input
                                        type="text"
                                        maxLength={6}
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        className="mt-2 w-full p-2 border rounded-md text-gray-900 outline-none text-center text-xl tracking-widest"
                                        required
                                    />
                                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                </div>
                                <button
                                    type="submit"
                                    className="mt-6 w-full font-bold py-2 rounded-lg border border-yellow-600 hover:bg-yellow-600"
                                >
                                    Xác minh
                                </button>
                            </form>
                        </div>
                    ) : (
                        <SuccessMessage navigate={navigate} />
                    )}
                </main>
            </div>
        </div>
    );
};
const SuccessMessage = ({ navigate }) => {
    return (
        <div className="border border-yellow-600 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-green-600 text-xl font-bold">Đăng ký thành công!</h2>
            <p className="mt-2 text-white">Tài khoản của bạn đã được tạo thành công. Hãy đăng nhập để sử dụng dịch vụ.</p>
            <button
                onClick={() => navigate("/login")}
                className="mt-4 px-6 py-2 text-white rounded-lg border border-yellow-600 hover:bg-yellow-600"
            >
                Đăng nhập ngay
            </button>
        </div>
    );
};
export default Verification;