import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSave = () => {
        if (!password || !confirmPassword) {
            setError('Không được bỏ trống các trường mật khẩu');
            return;
        }
        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }
        if (password !== confirmPassword) {
            setError('Mật khẩu không trùng khớp');
            return;
        }
        setError('');
        setSuccess(true);
    };

    return (
        <div className="min-h-screen pt-20 bg-main flex justify-center">
            <div className="container max-w-xl w-full">
                <main className="p-8 text-center">
                    <div className='mt-20 text-white'>
                        <h1 className='uppercase font-bold text-3xl'>TẠO MẬT KHẨU MỚI</h1>
                        <div className='border border-yellow-600 mt-8 p-6 rounded-lg shadow-lg'>
                            {error && <p className="text-red-500 font-bold">{error}</p>}
                            <div className="relative mt-4">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full p-2 border rounded-md text-gray-900 outline-none"
                                    placeholder="Nhập mật khẩu mới"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center text-black"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                            <div className="relative mt-4">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full p-2 border rounded-md text-gray-900 outline-none"
                                    placeholder="Nhập lại mật khẩu mới"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center text-black"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                            <button
                                className='mt-6 w-full font-bold py-2 rounded-lg border border-yellow-600 hover:bg-yellow-600'
                                onClick={handleSave}
                            >
                                LƯU
                            </button>
                        </div>
                    </div>
                </main>
            </div>
            {success && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <p className="text-green-500 font-bold">Thay đổi mật khẩu thành công!</p>
                        <button onClick={() => navigate("/login")}
                            className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg">
                            ĐĂNG NHẬP NGAY
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResetPassword;