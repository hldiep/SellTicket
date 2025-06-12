import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { useNavigate } from 'react-router-dom';

const InfoAccountManage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        sub: '',
        cccd: '',
        email: ''
    });
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value });
    };

    const handleSubmitInfo = (e) => {
        e.preventDefault();
        alert("Thông tin đã được lưu!");
        setIsEditing(false);
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        if (passwords.newPassword === passwords.oldPassword) {
            alert("Mật khẩu mới không được trùng với mật khẩu cũ.");
            return;
        }
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert("Xác thực mật khẩu không trùng khớp.");
            return;
        }
        alert("Đổi mật khẩu thành công!");
        setIsChangingPassword(false);
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    useEffect(() => {
        const loadData = () => {
            try {
                const token = localStorage.getItem("token");
                const userJson = localStorage.getItem('user');
                if (!token || !userJson) {
                    setError("Chưa đăng nhập.");
                    return;
                }
                const userData = JSON.parse(userJson);
                setUser(userData);
                setFormData({
                    name: userData.name || '',
                    sub: userData.sub || '',
                    cccd: userData.cccd || '',
                    email: userData.email || ''
                });
            } catch (err) {
                console.error('Lỗi khi tải thông tin tài khoản:', err);
                setError('Không thể tải thông tin tài khoản.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);
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
                    <span className="text-gray-700 font-medium">Thông tin tài khoản</span>
                </div>
                <h2 className="text-xl font-semibold p-4">Thông tin tài khoản</h2>
            </div>
            <div className="p-6 text-black max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
                <div className='container'>
                    <div className="border border-blue-700 p-6 rounded-lg shadow-md">
                        <div className="flex justify-end mb-4 space-x-4">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 border border-blue-700 text-blue-700 rounded-xl hover:bg-blue-700 hover:text-white transition-all"
                            >
                                Chỉnh sửa
                            </button>
                            <button
                                onClick={() => {
                                    setIsChangingPassword(true);
                                    setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
                                }}
                                className="px-4 py-2 border border-blue-700 text-blue-700 rounded-xl hover:bg-blue-700 hover:text-white transition-all"
                            >
                                Đổi mật khẩu
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-semibold">Họ và tên</label>
                            <input
                                type="text"
                                value={formData.name}
                                readOnly
                                className="outline-none p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Tên tài khoản</label>
                            <input
                                type="text"
                                value={formData.sub}
                                readOnly
                                className="outline-none p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">CCCD</label>
                            <input
                                type="text"
                                value={formData.cccd}
                                readOnly
                                className="outline-none p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                readOnly
                                className="outline-none p-2 border rounded w-full"
                            />
                        </div>
                    </div>
                    </div>
                </div>
            </div>


            {/* Modal chỉnh sửa thông tin */}
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-[9999] overflow-auto flex justify-center items-center">
                    <div className="bg-white rounded-xl p-8 w-[500px] text-black shadow-lg relative my-10">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="absolute top-3 right-3 text-red-600 text-2xl font-bold"
                        >
                            &times;
                        </button>
                        <h3 className="text-xl font-bold mb-6 text-blue-600">Chỉnh sửa thông tin</h3>
                        <form onSubmit={handleSubmitInfo} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-semibold">Họ và tên</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="outline-none p-2 border rounded w-full"
                                />
                            </div>
                            
                            <div>
                                <label className="block mb-1 font-semibold">CCCD</label>
                                <input
                                    type="text"
                                    name="cccd"
                                    value={formData.cccd}
                                    onChange={handleChange}
                                    className="outline-none p-2 border rounded w-full"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-semibold">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="outline-none p-2 border rounded w-full"
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-transparent hover:text-blue-600 border border-blue-600 transition-all"
                                >
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal đổi mật khẩu */}
            {isChangingPassword && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-[9999] overflow-auto flex justify-center items-center">
                    <div className="bg-white rounded-xl p-8 w-[500px] text-black shadow-lg relative my-10">
                        <button
                            onClick={() => setIsChangingPassword(false)}
                            className="absolute top-3 right-3 text-red-600 text-2xl font-bold"
                        >
                            &times;
                        </button>
                        <h3 className="text-xl font-bold mb-6 text-blue-600">Đổi mật khẩu</h3>
                        <form onSubmit={handleSubmitPassword} className="space-y-5">
                            {['oldPassword', 'newPassword', 'confirmPassword'].map((field, idx) => (
                                <div key={idx} className="relative">
                                    <label className="block mb-1 font-semibold">
                                        {field === 'oldPassword' ? 'Mật khẩu cũ' :
                                            field === 'newPassword' ? 'Mật khẩu mới' :
                                                'Xác thực mật khẩu'}
                                    </label>
                                    <input
                                        type={showPassword[field] ? "text" : "password"}
                                        name={field}
                                        value={passwords[field]}
                                        onChange={handleInputChange}
                                        className="outline-none p-2 border rounded w-full text-black pr-10"
                                    />
                                    <span
                                        className="absolute right-3 top-10 cursor-pointer text-gray-600"
                                        onClick={() => togglePasswordVisibility(field)}
                                    >
                                        {showPassword[field] ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            ))}
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-transparent hover:text-blue-600 border border-blue-600 transition-all"
                                >
                                    Lưu mật khẩu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </ClippedDrawer>
    );
};

export default InfoAccountManage;
