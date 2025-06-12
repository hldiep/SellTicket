import React, { useEffect, useState } from 'react'
import "swiper/css";
import "swiper/css/navigation";
import { FaGlobeAmericas, FaFilm } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { fetchMovies } from '../../util/movieApi';


const SeeMore = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const data = await fetchMovies();
            setMovies(data);
        }
        getMovies();
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
        setVideoUrl("");
    };

    return (
        <div className={"container"}>
            <main className="text-center">
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
                </div>
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
    )
}

export default SeeMore