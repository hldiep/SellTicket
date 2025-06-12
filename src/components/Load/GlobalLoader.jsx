import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const GlobalLoader = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [delayed, setDelayed] = useState(false);

    useEffect(() => {
        setLoading(true);
        setDelayed(false);

        const delayTimer = setTimeout(() => {
            setDelayed(true); // nếu sau 3s chưa xong thì hiện loader mạnh hơn
        }, 3000);

        const timeout = setTimeout(() => {
            setLoading(false);
            setDelayed(false);
        }, 3500); // giả sử load xong sau 3.5s

        return () => {
            clearTimeout(timeout);
            clearTimeout(delayTimer);
        };
    }, [location]);

    if (!loading) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${delayed ? "bg-black/40" : "pointer-events-none"}`}>
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-white"></div>
            {delayed && <p className="text-white mt-2 ml-3 text-sm">Đang tải trang...</p>}
        </div>
    );
};

export default GlobalLoader;
