import axios from "axios";
import { env } from "./Contrainst";
const API_URL = `${env.url.API_BASE_URL}/film-service/api/slider`
export const getSlider = async () => {
    try {
        const response = await axios.get(`${API_URL}/get`);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin slider:', error);
        return null;
    }
}

// export const deleteSlider = async (id) => {
//     try {
//         const response = await axios.delete(`${API_URL}/remove/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error(`Lỗi khi xóa slider với id ${id}:`, error);
//         return null;
//     }
// }

export const addSlider = async (slider) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
        }
        const response = await axios.post(`${API_URL}/add`, slider, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        console.log("Thêm phòng thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi thêm slider (fetch):', error);
        return null;
    }
};