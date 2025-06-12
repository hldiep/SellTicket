import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const VerifyCode = ({ email }) => {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!verificationCode) {
            setError("Vui lòng nhập mã xác minh.");
            setSuccess(false);
            return;
        }
        if (/^\d{6}$/.test(verificationCode)) {
            setSuccess(true);
            setError("");
            setTimeout(() => navigate("/doi-mat-khau"), 1000);
        } else {
            setError("Mã xác minh phải gồm 6 chữ số.");
            setSuccess(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 bg-main flex justify-center">
            <div className="container max-w-xl w-full">
                <main className="p-8 text-center">
                    <div className='mt-20 text-white'>
                        <h1 className='uppercase font-bold text-3xl'>XÁC MINH MÃ</h1>
                        <div className='border border-yellow-600 mt-8 p-6 rounded-lg shadow-lg'>
                            <form onSubmit={handleSubmit} className='text-left text-sm p-6'>
                                <p className='mb-4'>Nhập mã xác minh đã gửi đến <strong>{email}</strong></p>
                                <input
                                    type="text"
                                    maxLength={6}
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className="mt-2 w-full p-2 border rounded-md text-gray-900 outline-none text-center text-xl tracking-widest"
                                    required
                                    onInvalid={(e) => e.target.setCustomValidity("Vui lòng không để trống ô này")}
                                    onInput={(e) => e.target.setCustomValidity("")}
                                />
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                {success && <p className="text-green-500 text-sm mt-2">Mã hợp lệ! Đang chuyển hướng...</p>}
                                <button
                                    type="submit"
                                    className="mt-6 w-full font-bold py-2 rounded-lg border border-yellow-600 hover:bg-yellow-600"
                                >
                                    XÁC NHẬN
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default VerifyCode;