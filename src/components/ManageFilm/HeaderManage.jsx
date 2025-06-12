import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const HeaderManage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <header className="bg-gray-900 fixed top-0 left-0 w-full z-50 shadow-md font-sans">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <NavLink to="/">
                        <p className="text-3xl font-semibold text-white">Dashboard</p>
                    </NavLink>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => navigate("/manager-account")}
                            className="w-32 border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                            Tài khoản
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="w-32 border border-blue-600 bg-blue-600 text-white rounded-lg px-5 py-2 hover:bg-transparent hover:text-blue-600 transition-all">
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default HeaderManage