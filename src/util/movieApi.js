import axios from 'axios'
import { env } from "../components/config/env";
const API_URL = `${env.url.API_BASE_URL}/film-service/api/film`
export const fetchMovies = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phim: ', error);
        return [];
    }
};
export const getMovieById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin phim:', error);
        return null;
    }
};
export const getMovieByStatus = async (status) => {
    try {
        const response = await axios.get(`${API_URL}/get/status/${status}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const updateMovieById = async (id, data) => {
    try {
        const token = localStorage.getItem('token');
        console.log('Token: ',token);
        const response = await fetch(`${API_URL}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi cập nhật phim');
        }
const responseData = await response.json(); 
        return responseData;
    } catch (error) {
        console.error("Lỗi khi cập nhật phim:", error);
        throw error;
    }
};

export const addFilmById = async (addData) => {
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
        console.error("Lỗi khi thêm phim:", error.response?.data || error.message);
        throw error;
    }
};

