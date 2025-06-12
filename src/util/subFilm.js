import axios from "axios";

const API_URL = "/film-service/api/subfilm"
export const getAllSubfilm = async () => {
    try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
            }
            const response = await axios.get(`${API_URL}/get/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const employees = response.data.data;
        return employees;
        } catch (error) {
            console.error("Lỗi khi cập nhật danh sách subfilm:", error);
        throw error;
        }
}

export const addSubFilm = async (data) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
        }
        const response = await axios.post(`${API_URL}/add`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        });
        console.log("Thêm suất chiếu thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm suất chiếu:", error.response?.data || error.message);
        return null;
    }
};