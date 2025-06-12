import React, { useState } from 'react';
import { Link } from "react-router-dom";

const ForgetPwd = () => {
    const [email, setEmail] = useState("");

    return (
        <div className="min-h-screen pt-20 bg-main flex justify-center">
            <div className="container max-w-xl w-full">
                <main className="p-8 text-center">
                    <div className='mt-20 text-white'>
                        <span className='uppercase font-bold text-3xl'>QUÊN MẬT KHẨU</span>
                        <form className='border border-yellow-600 mt-8 p-6 rounded-lg shadow-lg'>
                            <p className='flex items-center font-bold justify-center'>
                                <span>Nhập email để tạo mật khẩu mới</span>
                            </p>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-4 w-full p-2 border rounded-md text-gray-900 outline-none"
                                required
                                onInvalid={(e) => e.target.setCustomValidity("Vui lòng không để trống ô này")}
                                onInput={(e) => e.target.setCustomValidity("")}
                            />
                            <div className='mt-6'>
                                <Link
                                    to={email ? "/ma-xac-minh" : "#"}
                                    className={`block w-full text-center border font-bold p-2 rounded-lg ${email ? "border-yellow-600 hover:bg-yellow-600" : "bg-gray-400 cursor-not-allowed"}`}
                                    onClick={(e) => !email && e.preventDefault()}
                                >
                                    GỬI MÃ XÁC MINH
                                </Link>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ForgetPwd;