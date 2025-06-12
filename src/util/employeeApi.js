import axios from "axios";

const API_URL = '/user-service/api/employment';
export const getAllEmployee = async () => {
    try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
            }
            const response = await axios.get(`${API_URL}/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const employees = response.data.data?.[0] || [];
        return employees;
        } catch (error) {
            console.error("Lỗi khi cập nhật danh sách nhân viên:", error);
        throw error;
        }
}

export const updateEmployeeById = async (id, updatedData) =>{
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
            }
            const response = await axios.put(`${API_URL}/update/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: '*/*'
      },
    });
            console.log("Cập nhật thành công:", response.data);
    return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật nhân viên:", error.response?.data || error.message);
    throw error;
        }
}

export const addEmployeeById = async (addData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
        }
        const response = await axios.post(`${API_URL}/add`, addData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: '*/*'
            },
        });
        console.log("Thêm thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm nhân viên:", error.response?.data || error.message);
        throw error;
    }
};
