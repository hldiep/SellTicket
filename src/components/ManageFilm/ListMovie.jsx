import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { fetchMovies, getMovieByStatus } from '../../util/movieApi';

const ListMovie = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');
    const [loading, setLoading] = useState(true);  // Loading cho lần đầu
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (initialLoading) setLoading(true);
            setError(null);

            try {
                if (!filterStatus) {
                    const allMovies = await fetchMovies();
                    setMovies(allMovies);
                } else {
                    const filteredMovies = await getMovieByStatus(filterStatus);
                    setMovies(filteredMovies);
                }
            } catch (err) {
                console.error('Lỗi khi tải phim:', err);
                setError('Không thể tải dữ liệu phim. Vui lòng thử lại.');
            } finally {
                if (initialLoading) {
                    setLoading(false);
                    setInitialLoading(false);
                }
            }
        };
        fetchData();
    }, [filterStatus]);

    return (
        <ClippedDrawer>
            <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                    <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">
                        Dashboard
                    </button>
                    <span>/</span>
                    <span className="text-gray-700 font-medium">Quản lý phim</span>
                </div>
                <div className='flex justify-between text-center items-center'>
                    <h2 className="text-xl font-semibold p-4">Quản lý phim</h2>
                    <div className='space-x-4'>
                        <NavLink to="/quan-ly-phim/them-phim"
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition-transform duration-300 transform hover:scale-105 cursor-pointer">
                            Thêm phim
                        </NavLink>
                        <NavLink to="/quan-ly-phim/quanlyslider"
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition-transform duration-300 transform hover:scale-105 cursor-pointer">
                            Quản lý slider
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
                <div className='container'>

                    <div className="mb-4 text-right">
                        <select
                            className="border text-black px-4 py-2 rounded outline-none"
                            value={filterStatus}
                            onChange={(e) => {
                                setFilterStatus(e.target.value);
                            }}
                        >
                            <option value="">Tất cả</option>
                            <option value="ACTIVE">Đang chiếu</option>
                            <option value="COMMING_SOON">Sắp chiếu</option>
                            <option value="DELETE">Ngừng chiếu</option>
                        </select>
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    {loading ? (
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-r-transparent"></div>
                            <div className="ml-4 text-blue-600 font-medium text-lg">Đang tải dữ liệu...</div>
                        </div>
                    ) : (
                        <table className="w-full bg-white shadow-md rounded text-black">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 text-left">
                                    <th className="p-2">Poster</th>
                                    <th className="p-2">Tên phim</th>
                                    <th className="p-2">Quốc gia</th>
                                    <th className="p-2">Thể loại</th>
                                    <th className="p-2">Thời lượng</th>
                                    <th className="p-2">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map((movie) => (
                                    <tr
                                        key={movie.id}
                                        onClick={() => navigate(`/quan-ly-phim/chi-tiet-phim/${movie.id}`)}
                                        className="border-t hover:bg-gray-50 cursor-pointer"
                                    >
                                        <td className="p-2">
                                            <img src={movie.image} alt={movie.name} className="w-20 h-auto rounded" />
                                        </td>
                                        <td className="p-2">{movie.name}</td>
                                        <td className="p-2">{movie.nation}</td>
                                        <td className="p-2">
                                            {movie.typeFilms && movie.typeFilms.map(type => type.name).join(', ')}
                                        </td>
                                        <td className="p-2">{movie.duration}</td>
                                        <td className="p-2 text-blue-600 font-medium">
                                            {movie.status === "COMMING_SOON" ? "Sắp chiếu" :
                                                movie.status === "ACTIVE" ? "Đang chiếu" :
                                                    movie.status === "DELETED" ? "Ngừng chiếu" : movie.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>)}
                </div>
            </div>
        </ClippedDrawer>
    )
}

export default ListMovie