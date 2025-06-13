import axios from "axios";
import { env } from "../components/config/env";

const API_URL = `${env.url.API_BASE_URL}/payment-service/api/ticket`
export const getAllTickets = async ({
  limit = 10,
  page = 0,
  active = "none",
  orderBy = "price",
  asc = "asc",
  q = ""
}) => {
  try {
    const response = await axios.get(`${API_URL}/all`, {
      params: {
        limit,
        page,
        active,
        orderBy,
        asc,
        q
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

export const addTicket = async (ticketData) => {
  try {
    const token=localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/add`, ticketData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding ticket:", error);
    throw error;
  }
};