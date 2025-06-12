import React, { useEffect, useState } from "react";
import ClippedDrawer from "../Dashboard/DashboardLayoutBasic";
import { useNavigate } from "react-router-dom";
import { addEmployeeById, getAllEmployee, updateEmployeeById } from "../../util/employeeApi";

const EmployeesManage = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showFormAdd, setShowFormAdd] = useState(false);
    const [editing, setEditing] = useState(null);
    const [message, setMessage] = useState("");
    const [employeesData, setEmployeesData] = useState({
       name: "", cccd: "", user_name: "", email: "", status: "", password: ""
    });
    const [employeesDataAdd, setEmployeesDataAdd] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        cccd: "",
        roleId: 2,
        status: "ACTIVE"
        });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeesData({ ...employeesData, [name]: value });
    };
    const handleInputChangeAdd = (e) => {
        const { name, value } = e.target;
        setEmployeesDataAdd({ ...employeesDataAdd, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let payload = {
                name: employeesData.name,
                email: employeesData.email,
                cccd: employeesData.cccd,
            };
            if (employeesData.password?.trim()) {
                payload.password = employeesData.password;
            }

            if (editing) {
                await updateEmployeeById(editing, payload); 
                setMessage("Cập nhật thông tin thành công!");
            } else {
                setMessage("Thêm nhân viên mới cần thực hiện ở API khác.");
            }

            setEditing(null);
            setShowForm(false);
            setEmployeesData({
                name: "", cccd: "", user_name: "", email: "", status: "", password: ""
            });
            const res = await getAllEmployee(); 
            setEmployees(res);
        } catch (err) {
            console.error(err);
            setMessage("Lỗi khi cập nhật thông tin!");
        } finally{
            setLoading(false);
        }

        setTimeout(() => setMessage(""), 3000);
    };
    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        const submitData = {
            name: employeesDataAdd.name,
            email: employeesDataAdd.email,
            userName: employeesDataAdd.username, 
            password: employeesDataAdd.password || undefined, 
            roleId: 2,
            status: "ACTIVE",
            cccd: employeesDataAdd.cccd
        };

        try {
            await addEmployeeById(submitData);
            alert("Thêm nhân viên thành công!");
            setShowFormAdd(false); 
            setEmployeesDataAdd({  
            name: "",
            email: "",
            username: "",
            password: "",
            cccd: "",
            roleId: 2,
            status: "ACTIVE"
            });
            const res = await getAllEmployee(); 
            setEmployees(res);
        } catch (error) {
            alert("Lỗi khi thêm nhân viên: " + (error.response?.data?.message || error.message));
        } finally{
            setLoading(false);
        }
         setTimeout(() => setMessage(""), 3000);
    };
    const handleEdit = (employee) => {
        setEmployeesData({
            name: employee.name,
            cccd: employee.cccd,
            user_name: employee?.account?.userName || employee.user_name || "",
            email: employee.email,
            status: employee.status || "ACTIVE",
            password: "" 
        });
        setEditing(employee.id);
        setShowForm(true);
    };


    useEffect(() => {
        const loadData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.log('Không tìm thấy token.');
                    return;
                }
                const res = await getAllEmployee();
                setEmployees(res);
                } catch (error) {
                console.log("Lỗi tải danh sách nhân viên", error);
            } finally{
                setLoading(false);
            }
        };
        loadData();
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
                    <span className="text-gray-700 font-medium">Quản lý nhân viên</span>
                </div>
                <div className="flex justify-between items-center text-center">
                    <h2 className="text-xl font-semibold p-4">Quản lý nhân viên</h2>
                    <button
                        onClick={() => {
                            setShowFormAdd(!showFormAdd);
                            setEditing(null);
                            setEmployeesData({
                                name: "", email: "", userName: "", password: "", roleId: "", cccd: "", status: ""
                            });
                        }}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white mb-4"
                    >
                        Thêm nhân viên
                    </button>
                </div>
            </div>

            <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
                <div className='container'>
                    {message && (
                        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
                            {message}
                        </div>
                    )}

                    {showForm && (
                        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-8 rounded-lg w-full max-w-2xl shadow-lg">
                                <form onSubmit={handleSubmit}>
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                                        Chỉnh sửa thông tin nhân viên
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                                        <div className="flex flex-col">
                                            <label className="mb-1">Họ tên</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={employeesData.name}
                                                onChange={handleInputChange}
                                                placeholder="Nhập họ tên"
                                                className="p-2 border rounded outline-none"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="mb-1">CCCD</label>
                                            <input
                                                type="text"
                                                name="cccd"
                                                value={employeesData.cccd}
                                                onChange={handleInputChange}
                                                placeholder="Nhập CCCD"
                                                className="p-2 border rounded outline-none"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="mb-1">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={employeesData.email}
                                                onChange={handleInputChange}
                                                placeholder="Nhập email"
                                                className="p-2 border rounded outline-none"
                                                required
                                            />
                                        </div>
                                        
                                        <div className="flex flex-col">
                                            <label className="mb-1">Mật khẩu</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={employeesData.password}
                                                    onChange={handleInputChange}
                                                    placeholder="Nhập mật khẩu mới"
                                                    className="p-2 border rounded outline-none"
                                                    required={!editing}
                                                />
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                        >
                                            Cập nhật
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {showFormAdd && (
                        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-8 rounded-lg w-full max-w-2xl shadow-lg">
                                <form onSubmit={handleSubmitAdd}>
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                                        Thêm nhân viên mới
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                                        <div className="flex flex-col">
                                            <label className="mb-1">Họ tên</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={employeesDataAdd.name}
                                                onChange={handleInputChangeAdd}
                                                placeholder="Nhập họ tên"
                                                className="p-2 border rounded outline-none"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="mb-1">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={employeesDataAdd.email}
                                                onChange={handleInputChangeAdd}
                                                placeholder="Nhập email"
                                                className="p-2 border rounded outline-none"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                        <label className="mb-1">Tên đăng nhập</label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={employeesDataAdd.username}
                                                onChange={handleInputChangeAdd}
                                                placeholder="Nhập tên đăng nhập"
                                                className="p-2 border rounded outline-none"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="mb-1">Password</label>
                                            <input
                                                type="text"
                                                name="password"
                                                value={employeesDataAdd.password}
                                                onChange={handleInputChangeAdd}
                                                placeholder="Nhập password"
                                                className="p-2 border rounded outline-none"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="mb-1">CCCD</label>
                                            <input
                                                type="text"
                                                name="cccd"
                                                value={employeesDataAdd.cccd}
                                                onChange={handleInputChangeAdd}
                                                placeholder="Nhập CCCD"
                                                pattern="^\d{10,12}$"
                                                title="CCCD phải gồm 10 đến 12 chữ số"
                                                className="p-2 border rounded outline-none"
                                                required
                                                />
                                        </div>
                                        
                                    </div>

                                    <div className="flex justify-end gap-4 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => setShowFormAdd(false)}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                        >
                                            Thêm mới
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
                                <th className='p-2'>Họ tên</th>
                                <th className='p-2'>Email</th>
                                <th className='p-2'>Tên tài khoản</th>
                                <th className='p-2'>CCCD</th>
                                <th className='p-2'>Trạng thái</th>
                                <th className='p-2'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id} className="border-t hover:bg-gray-50">
                                    <td className='p-2'>{employee.name}</td>
                                    <td className='p-2'>{employee.email}</td>
                                    <td className='p-2'>{employee?.account?.userName || employee.user_name}</td>
                                    <td className='p-2'>{employee.cccd}</td>
                                    <td className='p-2'>{employee.status}</td>
                                    <td className='p-2'>
                                        <button onClick={() => handleEdit(employee)} className='text-yellow-400 mx-2'>
                                            Sửa
                                        </button>
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

export default EmployeesManage;
