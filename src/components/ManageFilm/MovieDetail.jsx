import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { getMovieById, updateMovieById } from '../../util/movieApi';
import { getSubFilm, getTypeFilm } from '../../util/typeFilmApi';

const MovieDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [allTypeFilms, setAllTypeFilms] = useState([]);
    const [allSubs, setAllSubs] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [originalMovie, setOriginalMovie] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieById(id);
                setMovie(data);
                setOriginalMovie(data);
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

    useEffect(() => {
        const fetchTypeFilmsAndSubs = async () => {
            try {
                const [typeData, subData] = await Promise.all([
                    getTypeFilm(),
                    getSubFilm()
                ]);
                setAllTypeFilms(typeData);
                setAllSubs(subData);
            } catch (err) {
                console.error("Lỗi khi lấy dữ liệu:", err);
            }
        };
        fetchTypeFilmsAndSubs();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie(prev => ({ ...prev, [name]: value }));
    };

    const handleSubChange = (e) => {
        const selectedSub = allSubs.find((s) => s.name === e.target.value);
        if (selectedSub) {
            setMovie(prev => ({ ...prev, sub: [{ id: selectedSub.id, name: selectedSub.name }] }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedMovie = {
                ...movie,
                typeFilms: movie.typeFilms,
                sub: movie.sub,
            };
              console.log("Dữ liệu gửi lên:", updatedMovie);
            await updateMovieById(id, updatedMovie);
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000);
            setIsEditing(false);
            setOriginalMovie(movie);
            setError(null);
        } catch (err) {
            console.error("Lỗi khi cập nhật phim:", err);
            setError("Không thể lưu thay đổi. Vui lòng thử lại sau.");
        }
    };
    return (
        <ClippedDrawer>
            <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                    <button
                        onClick={() => navigate('/admin')}
                        className="hover:underline text-blue-600"
                    >
                        Dashboard
                    </button>
                    <span>/</span>
                    <button
                        onClick={() => navigate('/quan-ly-phim')}
                        className="hover:underline text-blue-600"
                    >
                        Quản lý phim
                    </button>
                    <span>/</span>
                    <span className="text-gray-700 font-medium">Chi tiết phim</span>
                </div>
                <div className='flex justify-between text-center items-center'>
                    <h2 className="text-xl font-semibold p-4">Chi tiết phim</h2>
                    <div className="flex justify-end p-6">
    {!isEditing ? (
        <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
            Chỉnh sửa
        </button>
    ) : (
        <>
            <button
                type="button"
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
            >
                Lưu
            </button>
            <button
                type="button"
                onClick={() => {
                    setIsEditing(false);
                    setMovie(originalMovie);
                    setError(null);
                }}
                className="ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 text-sm"
            >
                Hủy
            </button>
        </>
    )}
</div>
                </div>

            </div>
            <div className='min-h-screen bg-gray-50'>
                <div className='container'>
                    
                    {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
                    {showSuccessMessage && (
                        <div className="text-green-600 text-sm mb-3">Cập nhật phim thành công!</div>
                    )}
                    {loading ? (
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-r-transparent"></div>
                            <div className="ml-4 text-blue-600 font-medium text-lg">Đang tải dữ liệu...</div>
                        </div>
                    ) : (
                        <div className="p-6 font-sans text-black">

                            <form id="movieForm" onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 text-sm">
                                {/* Cột 1 */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Tên phim</label>
                                    <input type="text" name="name" value={movie.name} onChange={handleChange} readOnly={!isEditing}
                                        className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none" />

                                    <label className="block text-sm font-semibold mt-3 mb-2">Link poster</label>
                                    <input type="text" name="image" value={movie.image} onChange={handleChange} readOnly={!isEditing}
                                        className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none" />

                                    <label className="block text-sm font-semibold mt-3 mb-2">Trailer</label>
                                    <input type="text" name="trailer" value={movie.trailer} onChange={handleChange} readOnly={!isEditing}
                                        className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none" />

                                    <label className="block text-sm font-semibold mt-3 mb-2">Mô tả</label>
                                    <textarea name="description" value={movie.description} onChange={handleChange} readOnly={!isEditing}
                                        className="h-24 text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"></textarea>

                                    <label className="block text-sm font-semibold mt-3 mb-2">Thể loại</label>
                                    {!isEditing ? (
                                        <input
                                            type="text"
                                            name="typeFilm"
                                            value={movie.typeFilms?.map(g => g.name).join(", ") || ""}
                                            readOnly
                                            className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm"
                                        />
                                    ) : (
                                        <div className="max-h-48 overflow-auto border border-gray-300 rounded p-2">
                                            {allTypeFilms.map((type) => {
                                                const checked = movie.typeFilms?.some((tf) => tf.id === type.id);
                                                return (
                                                    <label key={type.id} className="block text-sm mb-1 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            value={type.id}
                                                            checked={checked}
                                                            onChange={(e) => {
                                                                let newTypeFilms = [...(movie.typeFilms || [])];
                                                                if (e.target.checked) {
                                                                    // thêm type film nếu chưa có
                                                                    if (!newTypeFilms.find((tf) => tf.id === type.id)) {
                                                                        newTypeFilms.push(type);
                                                                    }
                                                                } else {
                                                                    // bỏ type film nếu uncheck
                                                                    newTypeFilms = newTypeFilms.filter((tf) => tf.id !== type.id);
                                                                }
                                                                setMovie({ ...movie, typeFilms: newTypeFilms });
                                                            }}
                                                            className="mr-2"
                                                        />
                                                        {type.name}
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}
                                    <label className="block text-sm font-semibold mt-3 mb-2">Đạo diễn, diễn viên</label>
                                    <input type="text" name="content" value={movie.content} onChange={handleChange} readOnly={!isEditing}
                                        className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none" />

                                </div>

                                {/* Cột 2 */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">* Hình thức chiếu</label>
                                {/* <select name="sub" value={movie.sub?.[0]?.name || ''} onChange={handleSubChange} disabled={!isEditing} className="outline-none text-sm block w-full rounded border border-gray-300 px-3 py-2 shadow-sm">
                                    <option value="">Chọn hình thức chiếu</option>
                                    {allSubs.map(sub => <option key={sub.id} value={sub.name}>{sub.name}</option>)}
                                </select> */}
                                {!isEditing ? (
                                        <input
                                            type="text"
                                            name="sub"
                                            value={movie.sub?.map(g => g.name).join(", ") || ""}
                                            readOnly
                                            className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm"
                                        />
                                    ) : (
                                        <div className="max-h-48 overflow-auto border border-gray-300 rounded p-2">
                                            {allSubs.map((type) => {
                                                const checked = movie.sub?.some((s) => s.id === type.id);
                                                return (
                                                    <label key={type.id} className="block text-sm mb-1 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            value={type.id}
                                                            checked={checked}
                                                            onChange={(e) => {
                                                                let newSubs = [...(movie.sub || [])];
                                                                if (e.target.checked) {
                                                                    if (!newSubs.find((tf) => tf.id === type.id)) {
                                                                        newSubs.push(type);
                                                                    }
                                                                } else {
                                                                    newSubs = newSubs.filter((tf) => tf.id !== type.id);
                                                                }
                                                                setMovie({ ...movie, sub: newSubs });
                                                            }}
                                                            className="mr-2"
                                                        />
                                                        {type.name}
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}
                                    <label className="block text-sm font-semibold mt-3 mb-2">Độ tuổi xem phim</label>
                                    <input type="text" name="age" value={movie.age} onChange={handleChange} readOnly={!isEditing}
                                        className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none" />

                                    <label className="block text-sm font-semibold mt-3 mb-2">Thời lượng phim (phút)</label>
                                    <input type="text" name="duration" value={movie.duration} onChange={handleChange} readOnly={!isEditing}
                                        className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none" />

                                    <label className="block text-sm font-semibold mt-3 mb-2">Quốc gia</label>
                                    <input type="text" name="nation" value={movie.nation} onChange={handleChange} readOnly={!isEditing}
                                        className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none" />

                                    <label className="block text-sm font-semibold mt-3 mb-2">Trạng thái</label>
                                    <select
                                        name="status"
                                        value={movie.status}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                                    >
                                        <option value="ACTIVE">Đang chiếu</option>
                                        <option value="COMMING_SOON">Sắp chiếu</option>
                                        <option value="DELETE">Đã xóa</option>
                                    </select>
                                </div>


                            </form>
                        </div>)}
                </div>
            </div>
        </ClippedDrawer>

    )
}

export default MovieDetail