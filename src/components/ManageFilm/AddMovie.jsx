import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { getSubFilm, getTypeFilm } from '../../util/typeFilmApi';
import { addFilmById } from '../../util/movieApi';

const AddMovie = () => {
    const navigate = useNavigate();
    const [allTypeFilms, setAllTypeFilms] = useState([]);
    const [allSubs, setAllSubs] = useState([]);
   const [film, setFilm] = useState({
        name: "",
        age: "",
        sub: [],
        image: "",
        nation: "",
        duration: "",
        description: "",
        content: "",
        trailer: "",
        typeFilms: [],
        status: "ACTIVE",
    });

    useEffect(() => {
        const fetchTypeFilmsAndSubs = async () => {
            try {
                const [typeData, subData] = await Promise.all([
                    getTypeFilm(),
                    getSubFilm()
                ]);
                if (typeData) setAllTypeFilms(typeData);
                if (subData) setAllSubs(subData);
            } catch (err) {
                console.error("Lỗi khi lấy dữ liệu:", err);
            }
        };
        fetchTypeFilmsAndSubs();
    }, []);

    const handleCheckboxChange = (e, type) => {
        const isChecked = e.target.checked;
        const updatedTypes = isChecked
            ? [...film.typeFilms, { id: type.id, name: type.name, active: 'ACTIVE' }]
            : film.typeFilms.filter((tf) => tf.id !== type.id);
        setFilm({ ...film, typeFilms: updatedTypes });
    };
    const handleSubChange = (e, type) =>{
        const isChecked = e.target.checked;
        const updateSub = isChecked
                ? [...film.sub, { id: type.id, name: type.name}]
            : film.sub.filter((s) => s.id !== type.id);
        setFilm({ ...film, sub: updateSub });
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilm({ ...film, [name]: value });
    };

    // const handleSubChange = (e) => {
    //     const selectedSub = allSubs.find((s) => s.name === e.target.value);
    //     if (selectedSub) {
    //         setFilm({ ...film, sub: [{ id: selectedSub.id, name: selectedSub.name }] });
    //     }
    // };
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!film.name || !film.image || !film.trailer) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
      }
      const res = await addFilmById(film);
      alert('Thêm phim thành công!');
      console.log(res);
      navigate('/quan-ly-phim');
    } catch (error) {
      alert('Thêm thất bại: ' + error.message);
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
                    <span className="text-gray-700 font-medium">Thêm mới</span>
                </div>
                <h2 className="text-xl font-semibold p-4">Thêm phim mới</h2>
            </div>
            <div className='min-h-screen bg-gray-50'>
                <div className='container'>

                    <div className="p-6 font-sans text-black">

                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                            {/* Cột 1 */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">* Tên phim</label>
                                <input type="text" name="name" required onChange={handleChange}
                                    className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none" />
                                <label className="block text-sm font-semibold mt-3 mb-2">* Link poster</label>
                                <input type="text" name="image" required onChange={handleChange}
                                    className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none" />

                                <label className="block text-sm font-semibold mt-3 mb-2">* Trailer</label>
                                 <input type="text" name="trailer" required onChange={handleChange}
                                    className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none" />

                                <label className="block text-sm font-semibold mt-3 mb-2">* Mô tả</label>
                                <textarea name="description" required onChange={handleChange}
                                    className="h-24 text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"></textarea>

                                <label className="block text-sm font-semibold mt-3 mb-2">Thể loại</label>
                                <div className="max-h-48 overflow-auto border rounded p-2">
                                    {allTypeFilms.map((type) => {
                                    const isChecked = film.typeFilms.some((tf) => tf.id === type.id);
                                    return (
                                        <label key={type.id} className="block text-sm mb-1 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={(e) => handleCheckboxChange(e, type)}
                                            className="mr-2"
                                        />
                                        {type.name}
                                        </label>
                                    );
                                    })}
                                </div>

                                <label className="block text-sm font-semibold mt-3 mb-2">Đạo diễn, diễn viên</label>
                                <input type="text" name="content" onChange={handleChange}
                                    className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none" />

                            </div>

                            {/* Cột 2 */}
                            <div>

                                <label className="block text-sm font-semibold mb-2">* Hình thức chiếu</label>
                                {/* <select name="sub" onChange={handleSubChange} className="outline-none text-sm w-full rounded border px-3 py-2">
                                    <option value="">Chọn hình thức chiếu</option>
                                    {allSubs.map((sub) => (
                                        <option key={sub.id} value={sub.name}>{sub.name}</option>
                                    ))}
                                </select> */}
                                 <div className="max-h-48 overflow-auto border rounded p-2">
                                    {allSubs.map((type) => {
                                    const isChecked = film.sub.some((s) => s.id === type.id);
                                    return (
                                        <label key={type.id} className="block text-sm mb-1 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={(e) => handleSubChange(e, type)}
                                            className="mr-2"
                                        />
                                        {type.name}
                                        </label>
                                    );
                                    })}
                                </div>
                                <label className="block text-sm font-semibold mt-3 mb-2">* Độ tuổi xem phim</label>
                                <input type="text" name="age" required onChange={handleChange}
                                    className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none" />

                                <label className="block text-sm font-semibold mt-3 mb-2">Thời lượng phim (phút)</label>
                                 <input type="text" name="duration" onChange={handleChange}
                                    className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none" />

                                <label className="block text-sm font-semibold mt-3 mb-2">Trạng thái</label>
                                <select name="status" onChange={handleChange} value={film.status}
                                    className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none">
                                    
                                    <option value="ACTIVE">Đang chiếu</option>
                                    <option value="COMMING_SOON">Sắp chiếu</option>
                                </select>

                                <label className="block text-sm font-semibold mt-3 mb-2">Quốc gia</label>
                                <input type="text" name="nation" onChange={handleChange}
                                    className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none" />
                            </div>

                            <div >
                                <button type="submit" className="text-white bg-blue-500 p-2 hover:bg-blue-700 rounded-lg">Tạo phim</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ClippedDrawer>

    )
}
export default AddMovie