import React from 'react'
import { NavLink, Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white p-6">
            <div className="container mx-auto grid grid-cols-5 gap-5">
                <div>
                    <div className="text-3xl font-bold uppercase">
                        <Link to="/home" className="flex items-center space-x-1">
                            <span className="text-4xl text-white leading-10">MOVIE</span>
                            <span className="text-yellow-600">Ticket</span>
                        </Link>
                    </div>
                    <div className="flex space-x-3 mt-3">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-800 transition duration-300">
                            <FaFacebook className="w-4 h-4" />
                        </a>

                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                            className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-700 transition duration-300">
                            <FaInstagram className="w-4 h-4" />
                        </a>

                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                            className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition duration-300">
                            <FaTiktok className="w-4 h-4" />
                        </a>

                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-800 transition duration-300">
                            <FaYoutube className="w-4 h-4" />
                        </a>
                    </div>
                </div>
                <div className=''>
                    <h2 className="font-bold text-lg uppercase mb-2.5">TÀI KHOẢN</h2>
                    <div className="text-white hover:text-yellow-500 group inline-block">
                        <NavLink to={"/login"}
                            className="mb-1 group-hover:text-yellow-300 transition-all duration-100 inline-block">
                            Đăng nhập
                        </NavLink>
                        <div className="mb-2.5 w-0 h-[2px] bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </div>
                    <br />
                    <div className="text-white hover:text-yellow-500 group inline-block">
                        <NavLink to={"/register"}
                            className="mb-1 group-hover:text-yellow-300 transition-all duration-100 inline-block">
                            Đăng ký
                        </NavLink>
                        <div className="w-0 h-[2px] bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-lg uppercase mb-2.5">XEM PHIM</h2>
                    <div className="text-white hover:text-yellow-500 group inline-block">
                        <NavLink to={"/phim-dang-chieu"}
                            className="mb-1 group-hover:text-yellow-300 transition-all duration-100 inline-block">
                            Phim đang chiếu
                        </NavLink>
                        <div className="mb-2.5 w-0 h-[2px] bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </div>
                    <br />
                    <div className="text-white hover:text-yellow-500 group inline-block">
                        <NavLink to={"/phim-sap-chieu"}
                            className="mb-1 group-hover:text-yellow-300 transition-all duration-100 inline-block">
                            Phim sắp chiếu
                        </NavLink>
                        <div className="mb-2.5 w-0 h-[2px] bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-lg uppercase mb-2.5">THÔNG TIN</h2>
                    <div className="text-white hover:text-yellow-500 group inline-block">
                        <NavLink to={"/gioi-thieu"}
                            className="mb-1 group-hover:text-yellow-300 transition-all duration-100 inline-block">
                            Giới thiệu
                        </NavLink>
                        <div className="mb-2.5 w-0 h-[2px] bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </div>
                    <br />
                    <div className="text-white hover:text-yellow-500 group inline-block">
                        <NavLink to={"/lien-he"}
                            className="mb-1 group-hover:text-yellow-300 transition-all duration-100 inline-block">
                            Liên hệ
                        </NavLink>
                        <div className="mb-2.5 w-0 h-[2px] bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-lg uppercase mb-2.5">HỆ THỐNG RẠP</h2>
                    <div className="text-white hover:text-yellow-500 group inline-block">
                        <NavLink to={""}
                            className="mb-1 group-hover:text-yellow-300 transition-all duration-100 inline-block">
                            Cinestar Quốc Thanh
                        </NavLink>
                        <div className="mb-2.5 w-0 h-[2px] bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </div>
                    <br />
                    <div className="text-white hover:text-yellow-500 group inline-block">
                        <NavLink to={""}
                            className="mb-1 group-hover:text-yellow-300 transition-all duration-100 inline-block">
                            Cinestar Hai Bà Trưng (TP.HCM)
                        </NavLink>
                        <div className="mb-2.5 w-0 h-[2px] bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </div>
                    <div className="text-white hover:text-yellow-500 group inline-block">
                        <NavLink to={""}
                            className="mb-1 group-hover:text-yellow-300 transition-all duration-100 inline-block">
                            Cinestar Sinh Viên (Bình Dương)
                        </NavLink>
                        <div className="w-0 h-[2px] bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </div>
                </div>
            </div>
            <br />
            <hr className="border-white opacity-50 mb-4 mx-8" />

            <div className="container mx-auto px-8 text-center">
                <p className="text-sm">&copy; 2025 MoviesTicket. All rights reserved.</p>
                <div className="flex justify-center space-x-8 mt-4">
                    <div className="text-white hover:text-yellow-500 group inline-block">
                        <NavLink to={"/chinh-sach-bao-mat"}
                            className="mb-1 group-hover:text-yellow-300 transition-all duration-100 inline-block">
                            Chính sách bảo mật
                        </NavLink>
                        <div className="w-0 h-[2px] bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </div>
                    <div className="text-white hover:text-yellow-500 group inline-block">
                        <NavLink to={"/cau-hoi"}
                            className="mb-1 group-hover:text-yellow-300 transition-all duration-100 inline-block">
                            Hỏi và đáp
                        </NavLink>
                        <div className="w-0 h-[2px] bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </div>
                </div>

                <div className="mt-6">

                    <p className="text-xs mt-2">
                        CÔNG TY CỔ PHẦN GIẢI TRÍ PHÁT HÀNH PHIM - RẠP CHIẾU PHIM <br />
                        Địa chỉ: 97 Đường Man Thiện, Phường Hiệp Phú, Quận 9, TP. Hồ Chí Minh <br />
                        GIẤY CNĐKDN SỐ: 0123456789 cấp bởi Sở KH&ĐT TP.HCM
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer