import React, { useState } from 'react'
import SeatMatrix from './SeatMatrix';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { addBranch } from '../../util/branchApi';

const AddTheater = () => {
    const navigate = useNavigate();
    const [theater, setTheater] = useState({
    nameBranch: "",
    address: "",
    status: "ACTIVE"
})
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTheater((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await addBranch(theater);
        if (result) {
            alert("Thêm rạp chiếu thành công!");
            setTheater({ nameBranch: "", address: "", status: "ACTIVE" }); 
        } else {
            alert("Thêm thất bại!");
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
                        onClick={() => navigate('/quan-ly-rap')}
                        className="hover:underline text-blue-600"
                    >
                        Quản lý rạp
                    </button>
                    <span>/</span>
                    <span className="text-gray-700 font-medium">Thêm rạp</span>
                </div>
                <h2 className="text-xl font-semibold p-4">Thêm rạp</h2>
            </div>
            <div className='min-h-screen bg-gray-50'>
                <div className='container'>
                    <div className="p-6 font-sans text-black">
<form className="grid grid-cols-2 gap-6 text-sm" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-semibold mb-2">* Tên rạp chiếu</label>
                    <input
                        type="text"
                        name="nameBranch"
                        value={theater.nameBranch}
                        onChange={handleChange}
                        className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm"
                        required
                    />
                    <label className="block text-sm font-semibold mt-3 mb-2">* Địa chỉ rạp</label>
                    <input
                        type="text"
                        name="address"
                        value={theater.address}
                        onChange={handleChange}
                        className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm"
                        required
                    />
                    <button
                        type="submit"
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Thêm rạp
                    </button>
                </div>
            </form>
                    </div>

                </div>

            </div >
        </ClippedDrawer >
    )
}

export default AddTheater
