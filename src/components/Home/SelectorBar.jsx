import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectorBar = () => {
    const navigate = useNavigate();
    const [selectedCinema, setSelectedCinema] = useState("");
    const [selectedMovie, setSelectedMovie] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedShowtime, setSelectedShowtime] = useState("");

    const movies = [
        { id: 1, title: "Bộ tứ báo thủ", image: "/images/bo-tu-bao-thu-official.webp", category: "Hài, tình cảm", duration: "120 phút", country: "Việt Nam", trailer: "https://www.youtube.com/embed/zKMOgOWn8lQ" },
        { id: 2, title: "Nụ hôn bạc tỷ", image: "/images/nu-hon-bac-ty-poster.webp", category: "Hài, tình cảm", duration: "110 phút", country: "Việt Nam", trailer: "https://www.youtube.com/embed/wr6MeifZCUs" },
        { id: 3, title: "Đèn âm hồn", image: "/images/den-am-hon-poster.webp", category: "Hồi hộp, kinh dị", duration: "98 phút", country: "Mỹ", trailer: "https://www.youtube.com/embed/t62Rifc9OXI" },
        { id: 4, title: "Nhóc quậy", image: "/images/nhoc-quay-va-khu-rung-ky-dieu.webp", category: "Hoạt hình", duration: "95 phút", country: "Nhật Bản", trailer: "https://www.youtube.com/embed/kkRPcZfF7cQ" },
        { id: 5, title: "Yêu nhầm bạn thân", image: "/images/yeu-nham-ban-than-poster.webp", category: "Tình cảm, tâm lý", duration: "125 phút", country: "Hàn Quốc", trailer: "https://www.youtube.com/embed/Z7AbUpnfcW8" },
        { id: 6, title: "Đại chiến người khổng lồ: Lần tấn công cuối cùng", image: "/images/AOT.webp", category: "Hoạt hình, anime", duration: "130 phút", country: "Nhật Bản", trailer: "https://www.youtube.com/embed/i1hiyahxa4Y" },
    ];
    return (
        <>
            <div className="rounded-sm p-4 bg-bar w-full">
                <div className="grid grid-rows-4 grid-cols-2 gap-4 items-center justify-center w-full lg:grid-cols-4 lg:grid-rows-2 xl:grid-cols-6 xl:grid-rows-1">
                    <h2 className="text-white font-[1000] text-xl uppercase text-center md:text-left col-span-2 lg:col-span-5 xl:col-span-1">
                        Đặt vé nhanh
                    </h2>

                    <select
                        className="py-2 border border-yellow-700 font-[500] text-xl rounded-lg text-yellow-600 outline-none px-2 bg-bar col-span-1"
                        value={selectedCinema}
                        onChange={(e) => setSelectedCinema(e.target.value)}
                    >
                        <option value="">Chọn Rạp</option>
                        <option value="Cinestar Quốc Thanh">Cinestar Quốc Thanh</option>
                        <option value="Cinestar Hai Bà Trưng">Cinestar Hai Bà Trưng (TP.HCM)</option>
                        <option value="Cinestar Sinh Viên">Cinestar Sinh Viên (Bình Dương)</option>
                    </select>

                    {/* Chọn phim */}
                    <select
                        className="py-2 border border-yellow-700 font-[500] text-xl rounded-lg text-yellow-600 outline-none px-2 bg-bar col-span-1"
                        value={selectedMovie}
                        onChange={(e) => setSelectedMovie(e.target.value)}
                        disabled={!selectedCinema}
                    >
                        <option value="">Chọn Phim</option>
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.title}>
                                {movie.title}
                            </option>
                        ))}
                    </select>

                    {/* Chọn ngày */}
                    <select
                        className="py-2 border border-yellow-700 font-[500] text-xl rounded-lg text-yellow-600 outline-none px-2 bg-bar col-span-1"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        disabled={!selectedCinema || !selectedMovie}
                    >
                        <option value="">Chọn Ngày</option>
                        <option value="2025-03-03">3/3</option>
                        <option value="2025-03-04">4/3</option>
                        <option value="2025-03-05">5/3</option>
                        <option value="2025-03-06">6/3</option>
                    </select>

                    {/* Chọn suất */}
                    <select
                        className="py-2 border border-yellow-700 font-[500] text-xl rounded-lg text-yellow-600 outline-none px-2 bg-bar col-span-1"
                        value={selectedShowtime} // Sử dụng đúng state
                        onChange={(e) => setSelectedShowtime(e.target.value)} // Cập nhật giá trị state
                        disabled={!selectedCinema || !selectedMovie || !selectedDate}
                    >
                        <option value="">Chọn Suất Chiếu</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                    </select>

                    {/* Nút Đặt vé */}
                    <div className={'w-full flex items-center justify-center col-span-2 lg:col-span-1'}>
                        <button onClick={() => navigate("/dat-ve")}
                            className={`
                            px-6 
                            py-2 
                            rounded-lg 
                            text-white 
                            transition 
                            duration-300
                            cursor-pointer
                            hover:bg-yellow-600
                            hover:text-white
                            min-w-[200px]
                            bg-main
                            text-base
                            font-bold
                            " 
                        }`}
                            disabled={!selectedShowtime}
                        >
                            ĐẶT NGAY
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectorBar;