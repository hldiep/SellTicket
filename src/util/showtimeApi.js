import { env } from "./Contrainst";

const API_URL = `${env.url.API_BASE_URL}/filmshowtime-service/api/filmshowtime`;

export const addShowtimeFilm = async () => {
  try {
    const token=localStorage.getItem('token')
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Lỗi khi thêm showtime:", error);
      return null;
    }

    const result = await response.json();
    console.log("Thêm showtime thành công:", result);
    return result;

  } catch (error) {
    console.error("Lỗi mạng hoặc server:", error);
    return null;
  }
};
export const getShowtime = async (roomId, date) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/${roomId}/all?date=${date}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Lỗi:", error);
      return null;
    }

    const result = await response.json();
    console.log("Lấy showtime thành công:", result);
    return result.data;
  } catch (error) {
    console.error("Lỗi mạng hoặc server:", error);
    return null;
  }
};
