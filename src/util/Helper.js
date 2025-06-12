// import axios from "axios";
// import { env } from "./Contrainst";

// export const loginAccount = async (username, password) => {
//     try {
//         const response = await axios.post(`${env.url.API_BASE_URL}/api/authenticate`, {
//             username: username,
//             password: password
//         });
//         return response;
//     } catch (error) {
//         console.error("Login error:", error);
//         return error.response || { status: 500, message: "Internal Server Error" };
//     }
// }

// export const parseJwt = (token) => {
//     if (!token) return null;
//     try {
//         const base64Url = token.split('.')[1];
//         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//         return JSON.parse(atob(base64));
//     } catch (error) {
//         console.error("Invalid token:", error);
//         return null;
//     }
// }