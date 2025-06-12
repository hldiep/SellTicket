import React from 'react'

const InfoTicket = () => {
    return (
        <div>
            <span className='uppercase font-bold text-2xl'>THÔNG TIN VÉ</span>
            <div className='space-y-4'>
                <h3 className="text-xl font-bold mt-4">QUỶ NHẬP TRÀNG (T18)</h3>
                <p className="text-sm text-yellow-400">Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)</p>
                <p className="mt-2 text-xl">Cinestar Quốc Thanh (TP.HCM)</p>
                <p className="text-sm">271 Nguyễn Trãi, Quận 1, TP. HCM</p>
                <p className="mt-2 text-yellow-400">Thời gian </p>
                <p><strong>20:10 Thứ Tư 05/03/2025</strong></p>
                <div className='flex text-yellow-400 space-x-5'>
                    <p>Phòng chiếu</p>
                    <p>Số vé</p>
                    <p>Loại vé</p>
                </div>
                <div className='flex'>
                    <p><strong>04</strong></p>
                    <p className='ml-[90px]'><strong>1</strong></p>
                    <p className='ml-[50px]'><strong>Người Lớn</strong></p>
                </div>
                <p>Loại ghế: <strong className='text-yellow-400'>Ghế thường</strong> - Số ghế: <strong className='text-yellow-400'>H08</strong></p>
                <p className="mt-2 font-bold">SỐ TIỀN CẦN THANH TOÁN: <span className="text-yellow-400">70,000 VND</span></p>
            </div>
        </div>
    )
}

export default InfoTicket