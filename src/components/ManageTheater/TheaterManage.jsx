import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClippedDrawer from "../Dashboard/DashboardLayoutBasic";
import { getBranch } from "../../util/branchApi";

const TheaterManage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [branch, setBranch] = useState([]);

    useEffect(() => {
        const fetchBranch = async () => {
            try {
                const branchData = await getBranch();
                setBranch(branchData);
            } catch (error) {
                console.error("Error fetching branch:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBranch();
    }, []);

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
                    <span className="text-gray-700 font-medium">Quản lý rạp</span>
                </div>
                <div className='flex justify-between text-center items-center'>
                    <h2 className="text-xl font-semibold p-4">Quản lý rạp</h2>
                    <button onClick={() => navigate("/quan-ly-rap/them-rap")}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">Thêm rạp</button>
                </div>
            </div>
            <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
                <div className='container'>
                    {loading ? (
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-r-transparent"></div>
                            <div className="ml-4 text-blue-600 font-medium text-lg">Đang tải dữ liệu...</div>
                        </div>
                    ) : (
                        <table className="w-full bg-white shadow-md rounded text-black">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 text-left">
                                    <th className="p-2 border ">Tên rạp</th>
                                    <th className="p-2 border ">Địa chỉ</th>
                                    <th className="p-2 border ">Trạng thái</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    branch.map((item) => (
                                        <tr key={item.id} className="border-t hover:bg-gray-50">
                                            <td onClick={() => navigate(`/quan-ly-rap/chi-tiet-rap/${item.id}`)}
                                                className="p-2 border ">{item.nameBranch}</td>
                                            <td className="p-2 border ">{item.address}</td>
                                            <td className="p-2 border ">{item.status}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>
                    )}
                </div>
            </div>
        </ClippedDrawer>

    )
}

export default TheaterManage