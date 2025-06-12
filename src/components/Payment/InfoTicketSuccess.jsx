import React from 'react'
import InfoTicket from './InfoTicket'
import QRCode from "react-qr-code";
const InfoTicketSuccess = () => {
    return (
        <div>
            <div className='min-h-screen pt-20 bg-main flex justify-center'>
                <div className='container'>
                    <div className="text-white mt-24 p-3">
                        <h2 className="uppercase font-bold text-3xl mb-4 text-green-500 ">CHÚC MỪNG BẠN!</h2>
                        <p className="text-sm mb-4">Việc mua vé online của bạn đã thành công. Xin chân thành cảm ơn bạn đã chọn chúng tôi để phục vụ nhu cầu giải trí của bạn. Vui lòng xem thông tin đặt vé dưới đây.</p>

                        <div className="flex flex-col items-center mb-10 mt-10">
                            <QRCode value="https://cinestar.com.vn/ticket/123456" size={120} bgColor="#ffffff" fgColor="#000000" />
                            <p className="font-bold mt-2">Mã vào khán phòng:</p>
                            <p className="text-lg font-bold text-green-500 ">WNRHLHK</p>
                        </div>

                        <div className="text-sm space-y-2 text-center mb-10">
                            <p><strong>Mã đặt vé:</strong> 291276</p>
                            <p><strong>Rạp:</strong> Cinestar Quốc Thanh (TP.HCM)</p>
                            <p><strong>Thông tin phim:</strong> QUỶ NHẬP TRÀNG</p>
                            <p><strong>Suất chiếu:</strong> 20:10 Thứ Tư 05/03/2025</p>
                            <p><strong>Thông tin vé:</strong> 1 Người lớn (70,000 VND)</p>
                            <p><strong>Phòng - Ghế: </strong> 4 - H08</p>
                            <p><strong>Đồ ăn và Thức uống:</strong> Không</p>
                            <p className="font-bold text-lg">Tổng cộng: <span className="text-green-500 ">70,000 VND</span></p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default InfoTicketSuccess