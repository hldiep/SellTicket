import axios from "axios";
import { env } from "./Contrainst";

const API_URL = `${env.url.API_BASE_URL}/film-service/api/typefilm`
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
        const response = await axios.get(`${env.url.API_BASE_URL}/film-service/api/sub/all`);
        return response.data.data;
        
    } catch (error) {
        console.error('Lỗi khi lấy thông tin thể loại:', error);
        return null;
    }
}
