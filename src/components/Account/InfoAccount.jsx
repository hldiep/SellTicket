import React, { useEffect, useState } from 'react'
import NavAccount from './NavAccount';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const InfoAccount = () => {
    const navigate = useNavigate();
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [isEditing, setIsEditing] = useState(false);
        const [isChangingPassword, setIsChangingPassword] = useState(false);
        const [formData, setFormData] = useState({
            name: '',
            sub: '',
            phone: '',
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
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thông tin đã được lưu!");
        setIsEditing(false);
    };
    const handleSubmitPassword = (e) => {
        e.preventDefault();
        if (passwords.newPassword === passwords.oldPassword) {
            alert("Mật khẩu mới không được trùng với mật khẩu cũ");
            return;
        }
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert("Xác thực mật khẩu không trùng khớp.");
            return;
        }
        alert("Đổi mật khẩu thành công!");
        setIsChangingPassword(false);
    }
    const togglePasswordVisibility = (field) => {
        setShowPassword(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
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
                        phone: userData.phone || '',
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
        <div className=' bg-main flex pt-32 min-h-screen'>
            <NavAccount />
            <div className='container'>
                <div className=' ml-[220px] p-10 text-white justify-center items-center'>
                    <h2 className='text-2xl font-bold'>THÔNG TIN KHÁCH HÀNG</h2>
                    <div>
                        <div className="border  mt-4 border-yellow-600 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
                            <div className="flex justify-end mb-4 space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded-xl hover:bg-yellow-600 hover:text-white transition-all duration-300"
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsChangingPassword(true);
                                        setPasswords({
                                            oldPassword: "",
                                            newPassword: "",
                                            confirmPassword: ""
                                        });
                                    }}
                                    className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded-xl hover:bg-yellow-600 hover:text-white transition-all duration-300"
                                >
                                    Đổi mật khẩu
                                </button>
                            </div>
                            <form className="grid grid-cols-2 gap-4">
                                <div >
                                    <label className='block font-semibold mb-1'>Họ và tên</label>
                                    <input
                                        type='text'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        readOnly={!isEditing}
                                        className="p-2 border w-full rounded outline-none text-black"
                                    />
                                </div>
                                <div >
                                    <label className='block font-semibold mb-1'>Tên tài khoản</label>
                                    <input
                                        type='text'
                                        name='sub'
                                        value={formData.sub}
                                        onChange={handleChange}
                                        readOnly={!isEditing}
                                        className="p-2 border w-full rounded outline-none text-black" />
                                </div>
                                <div >
                                    <label className='block font-semibold mb-1'>Số điện thoại</label>
                                    <input
                                        type='text'
                                        name='phone'
                                        value={formData.phone}
                                        onChange={handleChange}
                                        readOnly={!isEditing}
                                        className="p-2 border w-full rounded outline-none text-black" />
                                </div>
                                <div >
                                    <label className='block font-semibold mb-1'>Email</label>
                                    <input
                                        type='text'
                                        name='dob'
                                        value={formData.email}
                                        onChange={handleChange}
                                        readOnly={!isEditing}
                                        className="p-2 border w-full rounded outline-none text-black" />
                                </div>
                            </form>
                        </div>
                    </div>
                    {isEditing && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                            <div className="bg-white rounded-xl p-8 w-[500px] text-black shadow-lg relative">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="absolute top-3 right-3 text-red-600 text-lg font-bold hover:text-red-800"
                                >
                                    &times;
                                </button>
                                <h3 className="text-xl font-bold mb-4 text-yellow-600">Chỉnh sửa thông tin</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block font-semibold mb-1">Họ và tên</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="p-2 border w-full rounded outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-semibold mb-1">Ngày sinh</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            className="p-2 border w-full rounded outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-semibold mb-1">Số điện thoại</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="p-2 border w-full rounded outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-semibold mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="p-2 border w-full rounded outline-none"
                                        />
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            className="mt-3 px-4 py-2 border border-yellow-600 bg-yellow-600 text-white rounded-xl w-[140px] hover:bg-transparent hover:text-yellow-600 transition-all duration-300"
                                        >
                                            Lưu
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {isChangingPassword && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                            <div className="bg-white rounded-xl p-8 w-[500px] text-black shadow-lg relative">
                                <button
                                    onClick={() => setIsChangingPassword(false)}
                                    className="absolute top-3 right-3 text-red-600 text-lg font-bold hover:text-red-800"
                                >
                                    &times;
                                </button>
                                <h3 className="text-xl font-bold mb-4 text-yellow-600">Đổi mật khẩu</h3>
                                <form className="space-y-5" onSubmit={handleSubmitPassword}>
                                    <div className="relative">
                                        <label className="block font-semibold mb-1">Mật khẩu cũ</label>
                                        <input
                                            type={showPassword.oldPassword ? "text" : "password"}
                                            name="oldPassword"
                                            value={passwords.oldPassword}
                                            onChange={handleInputChange}
                                            className="p-2 border w-full rounded outline-none text-black pr-10"
                                        />
                                        <span
                                            className="absolute right-3 top-10 cursor-pointer text-gray-600"
                                            onClick={() => togglePasswordVisibility("oldPassword")}
                                        >
                                            {showPassword.oldPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <label className="block font-semibold mb-1">Mật khẩu mới</label>
                                        <input
                                            type={showPassword.newPassword ? "text" : "password"}
                                            name="newPassword"
                                            value={passwords.newPassword}
                                            onChange={handleInputChange}
                                            className="p-2 border w-full rounded outline-none text-black pr-10"
                                        />
                                        <span
                                            className="absolute right-3 top-10 cursor-pointer text-gray-600"
                                            onClick={() => togglePasswordVisibility("newPassword")}
                                        >
                                            {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <label className="block font-semibold mb-1">Xác thực mật khẩu</label>
                                        <input
                                            type={showPassword.confirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={passwords.confirmPassword}
                                            onChange={handleInputChange}
                                            className="p-2 border w-full rounded outline-none text-black pr-10"
                                        />
                                        <span
                                            className="absolute right-3 top-10 cursor-pointer text-gray-600"
                                            onClick={() => togglePasswordVisibility("confirmPassword")}
                                        >
                                            {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            className="mt-5 px-4 py-2 border border-yellow-600 bg-yellow-600 text-white rounded-xl w-[140px] hover:bg-transparent hover:text-yellow-600 transition-all duration-300"
                                        >
                                            Lưu thông tin
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default InfoAccount