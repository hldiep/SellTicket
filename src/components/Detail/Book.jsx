import React, { useEffect, useState } from 'react'
import SectionFood from './SectionFood';
import { useNavigate } from 'react-router-dom';
const seats = [
    ["A01", "A02", "", "A03", "A04", "A05", "A06"],
    ["B01", "B02", "", "B03", "B04", "B05", "B06"],
    ["C01", "C02", "", "C03", "C04", "C05", "C06"],
    ["D01", "D02", "", "D03", "D04", "D05", "D06"],
    ["E01", "E02", "", "E03", "E04", "E05", ""],
    ["F01", "F02", "", "", "", "", ""]
];


const Book = () => {
    const navigate = useNavigate();

    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [isDateSelected, setIsDateSelected] = useState(false);

    useEffect(() => {
        const today = new Date();
        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            return `${day}/${month}`;
        };

        const tempDates = [];
        for (let i = 0; i < 3; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            tempDates.push(formatDate(date));
        }

        setDates(tempDates);
    }, []);

    const theaters = [
        {
            name: "Cinestar Quốc Thanh",
            address: "271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, TP.HCM",
            showtimes: ["10:30", "12:30", "14:30", "16:30"]
        },
        {
            name: "Cinestar Hai Bà Trưng (TP.HCM)",
            address: "135 Hai Bà Trưng, Phường Bến Nghé, Quận 1, TP.HCM",
            showtimes: ["10:00", "12:00", "14:00", "16:00"]
        }
    ];
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [selectedShowtime, setSelectedShowtime] = useState(null);

    const [adultTickets, setAdultTickets] = useState(0);
    const [studentSeniorTickets, setStudentSeniorTickets] = useState(0);

    const [selectedSeats, setSelectedSeats] = useState([]);

    const [countdown, setCountdown] = useState(300);
    const [timerActive, setTimerActive] = useState(false);
    const totalTickets = adultTickets + studentSeniorTickets;
    const totalPrice = adultTickets * 100000 + studentSeniorTickets * 55000;
    // useEffect để đếm ngược
    useEffect(() => {
        let timer;
        if (timerActive && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        }
        if (countdown === 0) {
            setSelectedSeats([]);
            setTimerActive(false);
            alert("Hết thời gian giữ vé, vui lòng chọn lại!");
        }
        return () => clearInterval(timer);
    }, [timerActive, countdown]);
    // Bắt đầu đếm khi chọn đủ số ghế
    useEffect(() => {
        if (selectedSeats.length === totalTickets && totalTickets > 0) {
            setCountdown(300);
            setTimerActive(true);
        } else {
            setTimerActive(false);
        }
    }, [selectedSeats, totalTickets]);

    const handleIncrease = (type) => {
        if (type === 'adult') setAdultTickets(adultTickets + 1);
        if (type === 'studentSenior') setStudentSeniorTickets(studentSeniorTickets + 1);
    };

    const handleDecrease = (type) => {
        if (type === 'adult' && adultTickets > 0) setAdultTickets(adultTickets - 1);
        if (type === 'studentSenior' && studentSeniorTickets > 0) setStudentSeniorTickets(studentSeniorTickets - 1);
    };

    const toggleSeat = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else if (selectedSeats.length < totalTickets) {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    return (

        <div className="text-white text-center p-5">

            <h1 className="text-3xl font-bold uppercase">Lịch Chiếu</h1>
            <div className='flex justify-center mt-4 space-x-4'>
                {dates.map((date, index) => (
                    <button
                        key={index}
                        className={`border px-3 py-1 rounded-md ${selectedDate === date ? 'bg-yellow-600' : 'bg-gray-500'}`}
                        onClick={() => {
                            setSelectedDate(date);
                        }}
                    >
                        {date}
                    </button>
                ))}
            </div>

            {selectedDate && (
                <div className='mt-10'>
                    <h1 className='text-3xl font-bold uppercase'>Danh Sách Rạp</h1>
                    {theaters.map((theater, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-lg mt-6 cursor-pointer ${selectedTheater === theater.name ? 'bg-yellow-600' : 'bg-gray-700'}`}
                            onClick={() => setSelectedTheater(theater.name)}>
                            <h2 className='text-xl font-bold'>{theater.name}</h2>
                            <p className='text-gray-200'>{theater.address}</p>
                        </div>
                    ))}
                </div>
            )}

            {selectedTheater && (
                <div className='mt-10'>
                    <h1 className='text-3xl font-bold uppercase'>Chọn Suất Chiếu</h1>
                    <div className='flex flex-wrap justify-center mt-4 space-x-2'>
                        {theaters.find(t => t.name === selectedTheater).showtimes.map((time, idx) => (
                            <button
                                key={idx}
                                className={`border px-3 py-1 rounded-md ${selectedShowtime === time ? 'bg-yellow-600' : 'bg-gray-500'}`}
                                onClick={() => { setTimerActive(false); setSelectedShowtime(time) }
                                }>
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {selectedShowtime && (
                <div className="mt-10">
                    <h1 className="text-3xl font-bold uppercase">Chọn Loại Vé</h1>
                    <div className="flex justify-center mt-6 space-x-10">
                        <div className="border p-6 rounded-md w-1/4">
                            <h2 className="text-lg font-semibold">Người Lớn</h2>
                            <p className="text-yellow-400 font-bold">100,000 VNĐ</p>
                            <div className="flex items-center justify-center mt-4">
                                <button onClick={() => handleDecrease('adult')} className="bg-gray-500 px-4 py-2 rounded-l">-</button>
                                <span className="px-4 text-lg">{adultTickets}</span>
                                <button onClick={() => handleIncrease('adult')} className="bg-gray-500 px-4 py-2 rounded-r">+</button>
                            </div>
                        </div>
                        <div className="border p-6 rounded-md w-1/4">
                            <h2 className="text-lg font-semibold">HSSV - Người Cao Tuổi</h2>
                            <p className="text-yellow-400 font-bold">55,000 VNĐ</p>
                            <div className="flex items-center justify-center mt-4">
                                <button onClick={() => handleDecrease('studentSenior')} className="bg-gray-500 px-4 py-2 rounded-l">-</button>
                                <span className="px-4 text-lg">{studentSeniorTickets}</span>
                                <button onClick={() => handleIncrease('studentSenior')} className="bg-gray-500 px-4 py-2 rounded-r">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedShowtime && (
                <div className="mt-10">
                    <h1 className="text-3xl font-bold uppercase">Chọn Ghế</h1>
                    <div className="p-4 rounded-md">
                        <div className="flex justify-center mb-3">
                            <div className="text-black w-1/2 h-8 bg-gray-300 rounded text-center pt-1 mb-4">Màn hình</div>
                        </div>
                        {seats.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex justify-center gap-9 mb-4">
                                {row.map((seat, colIndex) => (
                                    <button
                                        key={colIndex}
                                        className={`w-12 h-12 text-sm text-black flex items-center justify-center rounded-md ${selectedSeats.includes(seat) ? 'bg-yellow-600' : 'bg-gray-400 hover:bg-gray-100'}`}
                                        onClick={() => toggleSeat(seat)}
                                    >
                                        {seat}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="mt-5">
                        <h2 className="text-xl">Ghế đã chọn:</h2>
                        <p>{selectedSeats.length > 0 ? selectedSeats.join(", ") : "Chưa chọn ghế nào"}</p>
                    </div>
                    <SectionFood />
                    <hr className="border-white mt-5" />

                </div>
            )}
            {selectedSeats.length > 0 && (
                <div className="sticky bottom-0 left-0 w-full bg-gray-900 p-4 shadow-lg z-50">
                    <div className="flex items-center justify-between text-white max-w-4xl mx-auto">
                        <div>
                            <h2 className='text-xl font-bold uppercase'>Nụ hôn bạc tỷ</h2>
                            <p className='font-bold'>{selectedTheater} | {totalTickets} vé</p>
                            <p className='font-bold'>Ghế: {selectedSeats.join(", ")}</p>
                            <p className='font-bold'>Suất chiếu: {selectedShowtime}, {selectedDate}</p>
                        </div>
                        {timerActive && (
                            <p className='text-red-400 font-bold mt-2'>
                                Giữ ghế còn lại: {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
                            </p>
                        )}
                        <div className='flex items-center space-x-4'>
                            <div>
                                <p className='text-gray-400 text-sm'>Tổng tiền</p>
                                <p className='text-xl font-bold'>{totalPrice.toLocaleString()} VNĐ</p>
                            </div>

                            <button
                                onClick={() => navigate("/payment")}
                                disabled={selectedSeats.length < totalTickets}
                                className={`border border-yellow-600 rounded-xl px-5 py-2 w-[120px] transition-all duration-300 ${selectedSeats.length < totalTickets
                                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                    : 'bg-yellow-600 text-white hover:bg-transparent hover:text-yellow-600'
                                    }`}
                            >
                                Đặt vé
                            </button>
                        </div>

                    </div>
                </div>
            )}
            {selectedSeats.length < totalTickets && (
                <div className='fixed top-32 right-4 bg-red-500 text-white text-sm p-3 rounded shadow-lg'>
                    Vui lòng chọn đủ số lượng ghế tương ứng với số vé.
                </div>
            )}
        </div>
    )
}

export default Book