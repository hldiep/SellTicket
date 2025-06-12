import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


const initialMovies = [
    { id: 1, name: "Nhà Gia Tiên", age: "18+", description: "Đạo diễn: Huỳnh Lập Diễn viên: Huỳnh Lập, Phương Mỹ Chi, NSƯT Hạnh Thuý, NSƯT Huỳnh Đông, Puka, Đào Anh Tuấn, Trung Dân, Kiều Linh, Lê Nam, Chí Tâm, Thanh Thức, Trác Thuý Miêu, Mai Thế Hiệp, NS Mạnh Dung, NSƯT Thanh Dậu, NS Thanh Hiền, Nguyễn Anh Tú,… Khởi chiếu: Thứ Sáu, 21/02/2025", content: "Nhà Gia Tiên xoay quanh câu chuyện đa góc nhìn về các thế hệ khác nhau trong một gia đình, có hai nhân vật chính là Gia Minh (Huỳnh Lập) và Mỹ Tiên (Phương Mỹ Chi).", sub: "Tiếng Việt", trailer: "https://www.youtube.com/watch?v=xdRQvnZyQes&t=3s", status: "Đang chiếu", image: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F02_2025%2Fnha-gia-tien-sneak.jpg&w=1920&q=75" },
    { id: 2, name: "Bộ Tứ Báo Thủ", age: "16+", description: "Đạo diễn: Trấn Thành Diễn viên: Trấn Thành, Lê Giang, Lê Dương Bảo Lâm, Uyển ÂnKhởi chiếu: Thứ Tư, 29/01/2025", content: "Quốc Anh và Quỳnh Anh yêu nhau đang đến lúc “nhạt”. Nhận ra điều này, Quỳnh Anh lên kế hoạch hâm nóng mối quan hệ của mình, với sự quân sư giúp đỡ Bộ tứ thân thiết (Dì 4, Cậu 11, Kiều và Jessica). Tuy nhiên, “giúp đâu, hỏng đấy”, hành trình “thêm muối” của những Báo Thủ này gặp phải những trở ngại gì nữa?", sub: "Tiếng Anh", trailer: "https://www.youtube.com/watch?v=WmfHN9KRHF0", status: "Ngừng chiếu", image: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F01-2025%2Fbo-tu-bao-thu-official.jpg&w=1920&q=75" },
];
const FilmManage = () => {
    const [movies, setMovies] = useState(initialMovies);
    const [showForm, setShowForm] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [message, setMessage] = useState("");
    const [movieData, setMovieData] = useState({
        name: "", age: "", description: "", content: "", sub: "", trailer: "", status: "", image: ""
    });

    const deleteMovie = (id) => {
        setMovies(movies.filter((movie) => movie.id !== id));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovieData({ ...movieData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingMovie) {
            setMovies(movies.map((movie) => movie.id === editingMovie ? { ...movieData, id: editingMovie } : movie));
            setMessage("Cập nhật thông tin thành công!");
        } else {
            setMovies([...movies, { ...movieData, id: movies.length + 1 }]);
            setMessage("Thêm thành công!");
        }
        setMovieData({ name: "", age: "", description: "", content: "", sub: "", trailer: "", status: "", image: "" });
        setEditingMovie(null);
        setShowForm(false);

        setTimeout(() => setMessage(""), 3000);
    };

    const handleEdit = (movie) => {
        setMovieData(movie);
        setEditingMovie(movie.id);
        setShowForm(true);
    };
    const [filterStatus, setFilterStatus] = useState("");
    const filterMovies = filterStatus ? movies.filter(movie => movie.status === filterStatus) : movies;
    return (
        <div className='min-h-screen bg-main text-white'>
            <div className='container'>
                <div className='ml-[220px] flex-1 p-10'>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold">Quản lý phim</h1>
                            <NavLink to="/them-phim"
                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition-transform duration-300 transform hover:scale-105 cursor-pointer">
                                Thêm phim
                            </NavLink>
                        </div>
                        {message && (<div className="text-green-500 font-semibold mb-2">{message}</div>)}
                        {showForm && (
                            <form onSubmit={handleSubmit} className="bg-gray-200 text-black p-4 rounded-md mb-4">
                                <h2 className="text-lg font-semibold mb-2">{editingMovie ? "Chỉnh sửa phim" : "Nhập thông tin phim"}</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" name="name" value={movieData.name} onChange={handleInputChange} placeholder="Tên phim" className="p-2 border rounded border-blue-700 outline-none" required />
                                    <input type="text" name="age" value={movieData.age} onChange={handleInputChange} placeholder="Độ tuổi" className="p-2 border rounded border-blue-700 outline-none" />
                                    <input type="text" name="description" value={movieData.description} onChange={handleInputChange} placeholder="Mô tả" className="p-2 border rounded border-blue-700 outline-none" />
                                    <input type="text" name="content" value={movieData.content} onChange={handleInputChange} placeholder="Nội dung" className="p-2 border rounded border-blue-700 outline-none" />
                                    <input type="text" name="sub" value={movieData.sub} onChange={handleInputChange} placeholder="Phụ đề" className="p-2 border rounded border-blue-700 outline-none" />
                                    <input type="url" name="trailer" value={movieData.trailer} onChange={handleInputChange} placeholder="Link trailer" className="p-2 border rounded border-blue-700 outline-none" required />
                                    <input type="url" name="image" value={movieData.image} onChange={handleInputChange} placeholder="Link ảnh" className="p-2 border rounded border-blue-700 outline-none" />
                                    <select name='status' value={movieData.status} onChange={handleInputChange} className='p-2 border rounded border-blue-700 outline-none' required>
                                        <option value=''>Chọn trạng thái</option>
                                        <option value='Đang chiếu'>Đang chiếu</option>
                                        <option value='Sắp chiếu'>Sắp chiếu</option>
                                        <option value='Ngừng chiếu'>Ngừng chiếu</option>
                                    </select>
                                </div>
                                <button type="submit" className="mt-4 bg-green-600 px-4 py-2 rounded text-white">
                                    {editingMovie ? "Cập nhật" : "Thêm"}
                                </button>
                            </form>
                        )}
                        <div className="mb-4 text-right">
                            <select className="bg-gray-700 text-white px-4 py-2 rounded outline-none justify-end items-end" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                <option value="">Lọc theo trạng thái</option>
                                <option value="Đang chiếu">Đang chiếu</option>
                                <option value="Sắp chiếu">Sắp chiếu</option>
                                <option value="Ngừng chiếu">Ngừng chiếu</option>
                            </select>
                        </div>
                        <table className="w-full border-collapse border border-gray-700">
                            <thead>
                                <tr className="bg-gray-800 text-left">
                                    <th className="p-2 border border-gray-700">Ảnh</th>
                                    <th className="p-2 border border-gray-700">Tên phim</th>
                                    <th className="p-2 border border-gray-700">Độ tuổi</th>
                                    <th className="p-2 border border-gray-700">Mô tả</th>
                                    <th className="p-2 border border-gray-700">Nội dung</th>
                                    <th className="p-2 border border-gray-700">Phụ đề</th>
                                    <th className="p-2 border border-gray-700">Trailer</th>
                                    <th className="p-2 border border-gray-700">Trạng thái</th>
                                    <th className="p-2 border border-gray-700">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterMovies.map((movie) => (
                                    <tr key={movie.id} className="border border-gray-700">
                                        <td className="p-2 border border-gray-700"><img src={movie.image} alt={movie.name} className="w-16 h-16 object-cover" /></td>
                                        <td className="p-2 border border-gray-700">{movie.name}</td>
                                        <td className="p-2 border border-gray-700">{movie.age}</td>
                                        <td className="p-2 border border-gray-700">{movie.description}</td>
                                        <td className="p-2 border border-gray-700">{movie.content}</td>
                                        <td className="p-2 border border-gray-700">{movie.sub}</td>
                                        <td className="p-2 border border-gray-700"><a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Xem trailer</a></td>
                                        <td className="p-2 border border-gray-700">
                                            <span className={
                                                movie.status === "Đang chiếu" ? "text-green-500 font-semibold" :
                                                    movie.status === "Sắp chiếu" ? "text-yellow-500 font-semibold" :
                                                        "text-red-500 font-semibold"
                                            }>
                                                {movie.status}
                                            </span>
                                        </td>
                                        <td className="p-2 border border-gray-700">
                                            <div className="flex justify-center items-center gap-4">
                                                <button className="text-yellow-400" onClick={() => handleEdit(movie)}>Sửa</button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-center mt-3 items-center">
                            <button className="border p-1 px-3 rounded-md">&lt;</button>
                            <span className="mx-3">1</span>
                            <button className="border p-1 px-3 rounded-md">&gt;</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default FilmManage;