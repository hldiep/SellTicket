import React, { useEffect, useState } from 'react';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { useNavigate } from 'react-router-dom';
import { getAllTickets } from '../../util/ticketApi';

const TicketReportManage = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        getAllTickets({
            limit: 10,
            page: 0,
            active: "none",
            orderBy: "price",
            asc: "asc",
            q: ""
        }).then(res => {
            if (res?.data?.content) {
                setTickets(res.data.content);
                console.log("Tickets:", res.data.content);
            }
        }).catch(err => {
            console.error("Error loading tickets:", err);
        });
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
                    <span className="text-gray-700 font-medium">Quản lý vé</span>
                </div>
                <h2 className="text-xl font-semibold p-4">Quản lý vé</h2>
            </div>

            <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
                <div><button onClick={()=>navigate('/bao-cao-so-luong-ve/them-ve')} className='bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white'>Thêm loại vé</button></div>
                <div className='container'>
                    <table className="w-full bg-white shadow-md rounded text-black">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-left">
                                <th className='p-2'>Tên vé</th>
                                <th className='p-2'>Giá</th>
                                <th className='p-2'>Loại vé</th>
                                <th className='p-2'>Số chỗ</th>
                                <th className='p-2'>Tình trạng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((item, index) => (
                                <tr key={index} className='border-t hover:bg-gray-50'>
                                    <td className='p-2'>{item.name}</td>
                                    <td className='p-2'>{item.price.toLocaleString()} VNĐ</td>
                                    <td className='p-2'>{item.typeTicket}</td>
                                    <td className='p-2'>{item.slot}</td>
                                    <td className='p-2'>
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                                item.active === 'ACTIVE'
                                                    ? 'bg-green-100 text-green-700'
                                                    : item.active === 'DELETE'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            {item.active}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default TicketReportManage;