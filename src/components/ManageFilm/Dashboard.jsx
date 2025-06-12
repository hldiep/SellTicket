import React from 'react';
import { FaCalendarAlt, FaChartBar, FaFilm, FaHome, FaList, FaPlus, FaTheaterMasks, FaUser } from 'react-icons/fa';
import { NavLink } from "react-router-dom";

const Dashboard = () => {

    return (
        <div className='flex pt-16'>
            <div className={`bg-gray-900 fixed z-50 text-white p-4 flex flex-col h-screen transition-all duration-500 ease-in-out`}>
                <div className='overflow-y-auto h-full transition-opacity duration-500 ease-in-out'>
                    <nav>
                        <div>
                            <NavLink to="/"
                                className={({ isActive }) => `flex items-center w-full p-3 mt-1 rounded-md transition-transform duration-300 transform hover:scale-105 cursor-pointer ${isActive ? 'bg-blue-600' : 'bg-gray-800'}`
                                }>
                                <FaHome className="mr-3" /> Tổng quan
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/doanh-thu-theo-phim"
                                className={({ isActive }) => `flex items-center w-full p-3 mt-1 rounded-md transition-transform duration-300 transform hover:scale-105 cursor-pointer ${isActive ? 'bg-blue-600' : 'bg-gray-800'}`
                                }>
                                Doanh thu theo phim
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/doanh-thu-theo-rap"
                                className={({ isActive }) => `flex items-center w-full p-3 mt-1 rounded-md transition-transform duration-300 transform hover:scale-105 cursor-pointer ${isActive ? 'bg-blue-600' : 'bg-gray-800'}`
                                }>
                                Doanh thu theo rạp
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/quan-ly-phim"
                                className={({ isActive }) => `flex items-center w-full p-3 mt-1 rounded-md transition-transform duration-300 transform hover:scale-105 cursor-pointer ${isActive ? 'bg-blue-600' : 'bg-gray-800'}`
                                }>
                                <FaFilm className="mr-3" /> Quản lý phim
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/quan-ly-rap"
                                className={({ isActive }) => `flex items-center w-full p-3 mt-1 rounded-md transition-transform duration-300 transform hover:scale-105 cursor-pointer ${isActive ? 'bg-blue-600' : 'bg-gray-800'}`
                                }>
                                <FaTheaterMasks className='mr-3' />Quản lý rạp chiếu
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/quan-ly-suat-chieu"
                                className={({ isActive }) => `flex items-center w-full p-3 mt-1 rounded-md transition-transform duration-300 transform hover:scale-105 cursor-pointer ${isActive ? 'bg-blue-600' : 'bg-gray-800'}`
                                }>
                                <FaCalendarAlt className='mr-3' />Quản lý suất chiếu
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/bao-cao-so-luong-ve"
                                className={({ isActive }) => `flex items-center w-full p-3 mt-1 rounded-md transition-transform duration-300 transform hover:scale-105 cursor-pointer ${isActive ? 'bg-blue-600' : 'bg-gray-800'}`
                                }>
                                <FaChartBar className="mr-3" /> Báo cáo số lượng vé
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/quan-ly-nv"
                                className={({ isActive }) => `flex items-center w-full p-3 mt-1 rounded-md transition-transform duration-300 transform hover:scale-105 cursor-pointer ${isActive ? 'bg-blue-600' : 'bg-gray-800'}`
                                }>
                                <FaUser className="mr-3" /> Quản lý nhân viên
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/quan-ly-kh"
                                className={({ isActive }) => `flex items-center w-full p-3 mt-1 rounded-md transition-transform duration-300 transform hover:scale-105 cursor-pointer ${isActive ? 'bg-blue-600' : 'bg-gray-800'}`
                                }>
                                <FaUser className="mr-3" /> Quản lý khách hàng
                            </NavLink>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
