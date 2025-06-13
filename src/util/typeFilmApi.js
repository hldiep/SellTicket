import axios from "axios";
import { env } from "../components/config/env";

const API_URL = `/film-service/api/typefilm`
export const getTypeFilm = async () => {
    try {
        const response = await axios.get(`${API_URL}/get/all`);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin thể loại:', error);
        return null;
    }
}
export const getSubFilm = async () => {
    try {
        const response = await axios.get(`/film-service/api/sub/all`);
        return response.data.data;
        
    } catch (error) {
        console.error('Lỗi khi lấy thông tin thể loại:', error);
        return null;
    }
}
