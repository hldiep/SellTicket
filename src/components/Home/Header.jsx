import { useState } from 'react';
import { Menu, X } from "lucide-react";
import { FaSearch, FaUser } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../../util/AuthContext';
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
 const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="bg-gray-900 fixed top-0 left-0 w-full z-50 shadow-lg font-sans flex justify-center">
            <div className="container">
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between text-white py-5 px-8 w-full">
                        <div className="text-3xl font-bold uppercase">
                            <Link to="/" className="flex items-center space-x-1">
                                <span className="text-4xl text-white leading-10">MOVIE</span>
                                <span className="text-yellow-600">Ticket</span>
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center rounded-xl overflow-hidden w-1/3 bg-white">
                            <input
                                type="text"
                                placeholder="Tìm kiếm phim..."
                                className="p-2 text-gray-700 outline-none flex-1"
                            />
                            <button className="p-3">
                                <FaSearch className="text-black" />
                            </button>
                        </div>

                        {user ? (
    <div className="flex text-center items-center">
       <div className="group relative">
    <button className="flex items-center gap-2 border border-yellow-600 text-yellow-600 p-3 rounded-full hover:bg-yellow-600 hover:text-white mr-10 w-full">
        <FaUser /> <p>{user?.name || "Người dùng"}</p>
    </button>
    <div className="hidden group-hover:inline-block absolute left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
        <div className="text-center">
                    <button
                        onClick={() => navigate("/account")}
                        className="w-full text-black px-5 py-2 rounded-lg hover:bg-yellow-600 hover:text-white"
                    >
                        Tài khoản
                    </button>
                    <button
                        onClick={async () => {
                            await logout(); 
                            navigate("/");
                        }}
                        className="w-full text-red-600 px-5 py-2 rounded-lg hover:bg-red-600 hover:text-white"
                    >
                        Đăng xuất
                    </button>
                </div>
            </div>
        </div>
    </div>
) : (
                            <div className="space-x-4">
                                <button
                                    onClick={() => navigate("/login")}
                                    className="border border-yellow-600 text-yellow-600 px-5 py-2 rounded-lg hover:bg-yellow-600 hover:text-white"
                                >
                                    Đăng nhập
                                </button>
                                <button
                                    onClick={() => navigate("/register")}
                                    className="border border-yellow-600 bg-yellow-600 text-white rounded-xl px-5 py-2 w-[120px] hover:bg-transparent hover:text-yellow-600 transition-all duration-300"
                                >
                                    Đăng ký
                                </button>
                            </div>
                        )}

                        <button
                            className="md:hidden text-white focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>

                    {/* NavLink menu */}
                    <nav className="bg-gray-900 py-2 px-8">
                        <div className="hidden md:flex justify-start space-x-6">
                            {["/khuyen-mai", "/gioi-thieu"].map((path, index) => (
                                <div className="text-white hover:text-yellow-500 group" key={index}>
                                    <NavLink
                                        to={path}
                                        className="mb-3 group-hover:text-yellow-300 transition-all duration-100"
                                    >
                                        {path === "/khuyen-mai" ? "Khuyến mãi" : "Giới thiệu"}
                                    </NavLink>
                                    <div className="w-0 h-[2px] bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                                </div>
                            ))}
                        </div>

                        {/* Menu Mobile */}
                        {isOpen && (
                            <div className="md:hidden flex flex-col mt-3 space-y-3 bg-gray-800 p-4 rounded-lg">
                                {["/khuyen-mai", "/gioi-thieu"].map((path, index) => (
                                    <div className="text-white hover:text-yellow-500 group" key={index}>
                                        <NavLink
                                            to={path}
                                            className="mb-3 group-hover:text-yellow-300 transition-all duration-100"
                                        >
                                            {path === "/khuyen-mai" ? "Khuyến mãi" : "Giới thiệu"}
                                        </NavLink>
                                        <div className="w-0 h-[2px] bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
