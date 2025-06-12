import React, { useEffect, useState } from "react";
import Book from './Book';
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from '../../util/movieApi';
const MovieDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const handleGoBack = () => {
        navigate(-1); // quay lại trang trước
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setVideoUrl("");
    };
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieById(id);
                setMovie(data);
                setError(null);
            } catch (err) {
                console.error("Lỗi khi lấy dữ liệu phim:", err);
                setError("Không thể tải dữ liệu phim. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    return (

        <div className='min-h-screen pt-20 bg-main flex justify-center'>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-r-transparent"></div>
                    <div className="ml-4 text-blue-600 font-medium text-lg">Đang tải dữ liệu...</div>
                </div>
            ) : (
                <div className={'container'}>
                    <div className=' ' >
                        <div>
                            <button
                                onClick={handleGoBack}
                                className="cursor-pointer mt-14 p-6 text-white italic hover:text-yellow-500"
                            >
                                Quay lại
                            </button>
                        </div>
                        <div className="flex flex-wrap md:flex-nowrap gap-8 p-6 justify-center">
                            <div className="w-full md:w-[400px] flex justify-center">
                                <img
                                    src={movie?.image || "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"}
                                    alt={movie?.name || "poster"}
                                    className="w-full h-[500px] object-cover rounded-md shadow-lg"
                                />
                            </div>

                            <div className="flex-1 text-white">
                                <h1 className="text-3xl font-bold">{movie?.name}</h1>
                                <div className="flex items-center space-x-4 mt-3">
                                    <span>🌍 {movie?.nation}</span>
                                    <span>⏳ {movie?.duration}</span>
                                </div>
                                <div className="flex space-x-4">
                                    <p className="mt-3 bg-yellow-400 text-black px-3 py-1 rounded inline-block">
                                        {movie?.age}+
                                    </p>
                                    {movie?.sub?.length > 0 && (
                                        <p className="mt-3 bg-red-400 text-black px-3 py-1 rounded inline-block">
                                            {movie.sub.map(item => item.name).join(", ")}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-5 space-y-2">
                                    <h2 className="text-xl font-semibold">MÔ TẢ</h2>
                                    <p>🎬 {movie?.content}</p>
                                    <p>🎞️ Thể loại: {movie?.typeFilms?.map(t => t?.name).join(', ')}</p>
                                </div>

                                <div className="mt-5">
                                    <h2 className="text-xl font-semibold">NỘI DUNG PHIM</h2>
                                    <p className="text-gray-300">{movie?.description}</p>
                                </div>

                                <div className="flex space-x-4 mt-6">
                                    <button
                                        onClick={() => {
                                            setIsModalOpen(true);
                                            setVideoUrl(movie?.trailer);
                                        }}
                                        className="uppercase text-white border border-white rounded-xl px-5 py-2 hover:bg-gray-900 transition-all duration-300"
                                    >
                                        Xem Trailer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Book />
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
        </div >
    )
}

export default MovieDetailPage