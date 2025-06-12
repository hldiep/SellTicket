import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const PaymentSuccess = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div>
                <div className="min-h-screen pt-20 bg-main flex justify-center">
                    <div className="container">
                        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
                            <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                            <h2 className="text-3xl font-bold">THANH TOÁN THÀNH CÔNG</h2>
                            <p className="mt-2 text-lg">Cảm ơn bạn đã đặt vé. Chúng tôi đã gửi xác nhận qua email.</p>
                            <button onClick={() => navigate("/payment-success-viewticket")}
                                className="mt-6 border border-yellow-600 text-white px-6 py-2 rounded font-bold hover:bg-yellow-600">
                                XEM VÉ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess