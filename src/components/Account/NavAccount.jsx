import React, { useState } from 'react'
import { FaHistory, FaUser, FaUserCircle } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom'
const NavAccount = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
        else {
            alert("Vui lòng chọn một tệp hình ảnh hợp lệ (png, jpg, jpeg).");
        }
    };
    return (
        <div className='pt-10 bg-main'>
            <div className={` absolute  left-2 w-fit text-white p-4 flex flex-col transition-all duration-500 ease-in-out rounded-lg`}>
                <div className='container transition-opacity duration-500 ease-in-out '>
                    <div className='flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg text-white'>
                        <label className='cursor-pointer relative'>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleImageChange}
                            />
                            {image ? (
                                <img src={image} alt="Avatar" className='w-10 h-10 rounded-full border-2 border-white' />
                            ) : (
                                <FaUserCircle className='w-10 h-10 text-white' />
                            )
                            }
                            <input type="file" className='hidden' accept='image/*' onChange={handleImageChange} />
                        </label>
                        <div className='flex flex-col'>

                            <label className='text-xs text-white cursor-pointer hover:underline'>
                                <input
                                    type="file"
                                    className='hidden'
                                    accept='image/png, image/jpeg, image/jpg'
                                    onChange={handleImageChange} />
                                Thay đổi ảnh đại diện
                            </label>
                        </div>
                    </div>
                    <nav className='bg-yellow-600 rounded-md '>
                        <div>
                            <NavLink to="/account"
                                className={({ isActive }) => `flex items-center w-full p-3 mt-1 rounded-md transition-transform duration-300 transform hover:scale-105 cursor-pointer ${isActive ? 'bg-yellow-400' : 'bg-yellow-600'}`
                                }>
                                <FaUser className="mr-3" />Thông tin khách hàng
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/lich-su-mua-hang"
                                className={({ isActive }) => `flex items-center w-full p-3 mt-1 rounded-md transition-transform duration-300 transform hover:scale-105 cursor-pointer ${isActive ? 'bg-yellow-400' : 'bg-yellow-600'}`
                                }>
                                <FaHistory className="mr-3" />Lịch sử mua vé
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/"
                                className={({ isActive }) => `flex items-center w-full p-3 mt-1 rounded-md transition-transform duration-300 transform hover:scale-105 cursor-pointer ${isActive ? 'bg-yellow-400' : 'bg-yellow-600'}`
                                }>
                                <FiLogOut className="mr-3" />Đăng xuất
                            </NavLink>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default NavAccount