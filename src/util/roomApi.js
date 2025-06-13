import axios from "axios";
import { env } from "../components/config/env";

const API_URL = `/room-service/api/room`
export const getRoom = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin phòng:', error);
        return null;
    }
}
export const getRoombyId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin phòng:', error);
        return null;
    }
}
export const getRoomByBranch = async (branchId) => {
    try {
        const response = await fetch(`${API_URL}/get/branch/${branchId}`, {
            method: 'GET',
            headers: {
                'Accept': '*/*'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.statusCode === 200) {
            return result.data;
        } else {
            throw new Error(`API error! Message: ${result.message}`);
        }
    } catch (error) {
        console.error('Failed to get rooms by branch:', error);
        throw error;
    }
};


export const addRoom = async (room) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
        }
        const response = await axios.post(`${API_URL}/add`, room, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        });
        console.log("Thêm phòng thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm phòng:", error.response?.data || error.message);
        return null;
    }
};

export const updateRoomById = async (id, updatedData) =>{
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
                    console.error("Lỗi khi cập nhật phòng chiếu", error.response?.data || error.message);
            throw error;
                }
}
export const getRoomById = async (id) => {
    try {
        const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
            }
        const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
        });
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin phòng:', error);
        return null;
    }
};

export const deleteRoomById = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Delete error:", error);
        throw error;
    }
};