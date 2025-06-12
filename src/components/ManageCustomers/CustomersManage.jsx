import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ClippedDrawer from "../Dashboard/DashboardLayoutBasic";
import { useNavigate } from "react-router-dom";
import { getAllCustomer } from "../../util/customerApi";

const CustomersManage = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [message, setMessage] = useState("");
    const [customerData, setCustomerData] = useState({
        email: "", name: "", phoneNumber: "", timestamp: "", user_name: "", status: ""
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({ ...customerData, [name]: value });
    };
    useEffect(() => {
        const loadData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.log('Không tìm thấy token.');
                    return;
                }
                const res = await getAllCustomer();
                setCustomers(res);
                } catch (error) {
                console.log("Lỗi tải danh sách nhân viên", error);
            } finally{
                setLoading(false);
            }
        };
        loadData();
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            setCustomers(customers.map(customer => customer.id === editing ? { ...customerData, id: editing } : customer));
            setMessage("Cập nhật thông tin thành công!");
        } else {
            setCustomers([...customers, { ...customerData, id: customers.length + 1 }]);
            setMessage("Thêm khách hàng thành công!")
        }
        setCustomerData({ email: "", name: "", phone_number: "", timestamp: "", account_user_name: "", status: "" });
        setEditing(null);
        setShowForm(false);

        setTimeout(() => setMessage(""), 3000);
    };

    const handleEdit = (customer) => {
        setCustomerData(customer);
        setEditing(customer.id);
        setShowForm(true);
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
                    <span className="text-gray-700 font-medium">Quản lý khách hàng</span>
                </div>
                <div className="flex justify-between items-center text-center">
                    <h2 className="text-xl font-semibold p-4">Quản lý khách hàng</h2>
                    <button 
                        className='bg-blue-600 px-4 py-2 rounded text-white mb-4'>
                        Thêm khách hàng
                    </button>
                </div>
            </div>
            <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
                <div className='container'>
                    {message &&
                        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
                            {message}
                        </div>}
                    {showForm && (
                       <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-8 rounded-lg w-full max-w-2xl shadow-lg">
                                <form onSubmit={handleSubmit}>
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                                        Chỉnh sửa khách hàng
                                    </h2>
                                    <div className="text-sm text-gray-700">
                                        <input type='text' name='name' value={customerData.name} onChange={handleInputChange} placeholder='Tên' className='block mb-3 p-2 w-full outline-none rounded' required />
                                        <input type='email' name='email' value={customerData.email} onChange={handleInputChange} placeholder='Email' className='block mb-3 p-2 w-full outline-none rounded' required />
                                        
                                        <input type='text' name='phone_number' value={customerData.phoneNumber} onChange={handleInputChange} placeholder='Số điện thoại' className='block mb-3 p-2 w-full outline-none rounded' required />
                                    </div>
                                    <div className="flex justify-end gap-4 mt-6">
                                        <button type='submit' className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                                        Cập nhật
                                    </button>
                                    <button type='button' onClick={() => setShowForm(false)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                                        Hủy
                                    </button>
                                    </div>
                                    
                                </form>
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
                                <th className='p-2'>Tên</th>
                                <th className='p-2'>Email</th>
                                <th className='p-2'>Số điện thoại</th>
                                <th className='p-2'>Tên tài khoản</th>
                                <th className='p-2'>Trạng thái</th>
                                <th className='p-2'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id} className='border-t hover:bg-gray-50'>
                                    <td className='p-2'>{customer.email}</td>
                                    <td className='p-2'>{customer.name}</td>
                                    <td className='p-2'>{customer.phoneNumber}</td>
                                    <td className='p-2'>{customer?.account?.userName || 'Chưa có'}</td>
                                    <td className='p-2'>{customer.status}</td>
                                    <td className='p-2'>
                                        <button onClick={() => handleEdit(customer)} className='text-yellow-400 mx-2'>Sửa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>)}
                </div>
            </div>
        </ClippedDrawer>
    );
};

export default CustomersManage;
