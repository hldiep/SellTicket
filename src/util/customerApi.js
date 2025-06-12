import axios from "axios";

const API_URL = '/user-service/api/customer';
export const getAllCustomer = async () => {
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
        console.error("Lỗi khi cập nhật danh sách khách hàng:", error);
    throw error;
    }
}