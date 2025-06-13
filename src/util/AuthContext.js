import { createContext, useContext, useState } from "react";
import { env } from "../components/config/env";
// import { env } from "./Contrainst";

const AuthContext = createContext(null);

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
}

function isTokenExpired(token) {
    const decoded = parseJwt(token);
    if (!decoded?.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
}

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('token');
        return storedToken && !isTokenExpired(storedToken) ? storedToken : null;
    });

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : (token ? parseJwt(token) : null);
    });

    const login = async (username, password) => {
  try {
    const res = await fetch(`/api/authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg || 'Đăng nhập thất bại');
    }

    const newToken = data.accessToken;
    if (!newToken) throw new Error('Token không hợp lệ');

    const userData = parseJwt(newToken);

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);

  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

    const logout = async () => {
    try {
        const res = await fetch(`/api/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'OK') {
            console.error('Logout failed:', data.message || res.statusText);
        } else {
            console.log('Logout success:', data.message);
        }
    } catch (error) {
        console.error('Logout error:', error.message);
    } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    }
};

    const isAuthenticated = !!token;

    const roles = user?.role?.map(r => r.authority.replace('ROLE_', '')) || [];

    return (
        <AuthContext.Provider value={{ isAuthenticated, roles, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
