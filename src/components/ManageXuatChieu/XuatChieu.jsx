import React, { useEffect, useState } from 'react'
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic'
import { useNavigate } from 'react-router-dom'
import { addSubFilm, getAllSubfilm } from '../../util/subFilm';

const XuatChieu = () => {
    const navigate = useNavigate();
    const [subFilms, setSubFilms] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newFilmId, setNewFilmId] = useState('');
    const [newSubId, setNewSubId] = useState('');
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
            try {
                const data = await getAllSubfilm();
                setSubFilms(data);
            } catch (error) {
                console.error("Lỗi khi tải rạp chiếu:", error);
            } finally{
                setLoading(false);
            }
        };
    useEffect(()=>{
        
        fetchData();
    },[]);
    const handleAdd = async () => {
        if (!newFilmId || !newSubId) {
            alert("Vui lòng chọn đầy đủ thông tin.");
            return;
        }

        const data = {
            filmId: newFilmId,
            subId: newSubId
        };

        const result = await addSubFilm(data);
        if (result) {
            alert("Thêm suất chiếu thành công!");
            setShowForm(false);
            setNewFilmId('');
            setNewSubId('');
            fetchData();
        } else {
            alert("Thêm thất bại. Vui lòng thử lại.");
        }
    };
  return (
    <div>
        <ClippedDrawer>
            <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                    <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">Dashboard</button>
                    <span>/</span>
                    <span className="text-gray-700 font-medium">Quản lý suất chiếu</span>
                </div>
                <div className='flex justify-between '>
                    <h2 className="text-xl font-semibold p-4">Quản lý suất chiếu</h2> 
                    <div>
                        <button onClick={() => setShowForm(true)} className='bg-blue-500 hover:bg-blue-600 p-2 text-white rounded-md'>Thêm</button>
                    </div>
                </div>
            </div>
            <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
                {showForm && (
                        <div className="bg-white p-4 rounded shadow space-y-4 mt-4">
                            <h3 className="text-lg font-semibold">Thêm suất chiếu</h3>
                            <div className="space-y-2">
                                <label className="block font-medium">Chọn phim</label>
                                <select
                                    value={newFilmId}
                                    onChange={(e) => setNewFilmId(e.target.value)}
                                    className="border p-2 rounded w-full outline-none"
                                >
                                    <option value="">-- Chọn phim --</option>
                                    {[...new Map(subFilms.map(sub => [sub.filmDto.id, sub.filmDto])).values()].map(film => (
                                        <option key={film.id} value={film.id}>{film.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block font-medium">Chọn hình thức chiếu</label>
                                <select
                                    value={newSubId}
                                    onChange={(e) => setNewSubId(e.target.value)}
                                    className="border p-2 rounded w-full outline-none"
                                >
                                    <option value="">-- Chọn hình thức chiếu --</option>
                                    {[...new Map(subFilms.map(sub => [sub.subDto.id, sub.subDto])).values()].map(sub => (
                                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleAdd}
                                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                                >
                                    Lưu
                                </button>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    )}
                    {loading ? (
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-r-transparent"></div>
                            <div className="ml-4 text-blue-600 font-medium text-lg">Đang tải dữ liệu...</div>
                        </div>
                    ) : (
                <table className="w-full bg-white shadow-md rounded text-black">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 text-left">
                            <th className="p-2">Tên phim</th>
                            <th className="p-2">Hình thức chiếu</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        
                        {Array.isArray(subFilms) && subFilms.length > 0 ? (
                            subFilms.map(sub => (
                                <tr key={sub.id} className="border-t hover:bg-gray-50">
                                    <td className="p-2">{sub.filmDto.name}</td>
                                    <td className="p-2">{sub.subDto.name}</td>
                                    
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">Không có dữ liệu suất chiếu</td>
                            </tr>
                        )}
                    </tbody>
                    
                </table>)}
            </div>
            
        </ClippedDrawer>
    </div>
  )
}

export default XuatChieu
