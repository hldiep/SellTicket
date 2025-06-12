import axios from "axios";

const API_URL = "/room-service/api/branch"
export const getBranch = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin rạp phim:', error);
        return null;
    }
}

export const getBranchId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin phòng:', error);
        return null;
    }
};

export const addBranch = async (brand) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
        }
        const response = await axios.post(`${API_URL}/add`, brand, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        });
        console.log("Thêm rạp phim thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm rạp phim:", error.response?.data || error.message);
        return null;
    }
};

export const updateBranchById = async (id, updatedData) =>{
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
            console.error("Lỗi khi cập nhật rạp phim:", error.response?.data || error.message);
    throw error;
        }
}