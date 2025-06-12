import React, { useEffect, useState } from 'react'
import SeeMore from './SeeMore'
import { useNavigate } from 'react-router-dom';
import { getMovieByStatus } from '../../util/movieApi';
import { FaFilm, FaGlobeAmericas } from 'react-icons/fa';

const PhimDangChieu = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setVideoUrl("");
    };
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await getMovieByStatus("ACTIVE");
                setMovies(moviesData);
            } catch (error) {
                console.error("Error fetching movie:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);
    return (
        <div className="min-h-screen pt-20 bg-main flex justify-center">
            <div className={"container"}>
                <main className="p-8 text-center">
                    <div className="text-4xl font-bold mt-10 flex items-start justify-center">
                        <span className="text-white">PHIM ĐA</span>
                        <span className="text-yellow-600 relative top-2">NG CHIẾU</span>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-r-transparent"></div>
                            <div className="ml-4 text-blue-600 font-medium text-lg">Đang tải dữ liệu...</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8 px-4">
                            {movies.map((movie) => (
                                <div
                                    key={movie.id}
                                    className="relative group cursor-pointer"
                                >
                                    <div className="relative" onClick={() => navigate(`/movie/${movie.id}`)}>
                                        <img
                                            src={movie.image || "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"}
                                            alt={movie.name}
                                            className="w-full h-[420px] object-cover rounded-sm"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-start 
                                        text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                                        rounded-sm p-4 text-center">
                                            <h2 className="text-xl font-bold uppercase">{movie.name}</h2>
                                            <p className="text-sm mt-2 flex items-center gap-2">
                                                <FaFilm className="w-4 h-4 text-yellow-400" />
                                                {movie.typeFilms?.map(t => t.name).join(', ') || 'Chưa rõ'}
                                            </p>

                                            <p className="text-sm mt-1 flex items-center gap-2">
                                                <FaGlobeAmericas className="w-4 h-4 text-green-400" />
                                                {movie.nation}
                                            </p>
                                        </div>
                                    </div>
                                    <h2 className="text-lg text-white hover:text-yellow-500 uppercase font-semibold text-center mt-3 h-16 overflow-hidden text-ellipsis">
                                        {movie.name}
                                    </h2>
                                    <div className="flex justify-center space-x-4 mt-2">
                                        <button
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setVideoUrl(movie.trailer);
                                            }}
                                            className="uppercase text-white border border-white rounded-xl px-5 py-2 hover:bg-gray-900 transition-all duration-300"
                                        >
                                            Xem Trailer
                                        </button>
                                        <button
                                            onClick={() => navigate(`/movie/${movie.id}`)}
                                            className="uppercase border border-yellow-600 bg-yellow-600 text-white rounded-xl px-5 py-2 w-[120px] hover:bg-transparent hover:text-yellow-600 transition-all duration-300">
                                            Đặt Vé
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>)}
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-6 relative max-w-lg w-full rounded-md shadow-lg">
                                <button onClick={closeModal}
                                    className="absolute top-2 right-2 text-gray-700 text-xl hover:text-red-600">
                                    &times;
                                </button>
                                <div className="aspect-w-16 aspect-h-9">
                                    <iframe
                                        className="w-full h-64 rounded-sm"
                                        src={videoUrl}
                                        title="YouTube trailer"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    )
}

export default PhimDangChieu