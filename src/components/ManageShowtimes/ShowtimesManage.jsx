import React, { useState } from "react";
const initialShowTimes = [
  { id: 1, movie: "Nhà Gia Tiên", room: "Phòng 1", timeStart: "7:00 AM", timeEnd: "9:00 AM", date: "2025-03-12", status: "Đang hoạt động" },
  { id: 2, movie: "Bố Già", room: "Phòng 2", timeStart: "9:30 AM", timeEnd: "11:30 AM", date: "2025-03-12", status: "Đang hoạt động" },
  { id: 3, movie: "Mắt Biếc", room: "Phòng 3", timeStart: "12:00 PM", timeEnd: "2:00 PM", date: "2025-03-12", status: "Sắp chiếu" },
  { id: 4, movie: "Gái Già Lắm Chiêu", room: "Phòng 1", timeStart: "3:00 PM", timeEnd: "5:00 PM", date: "2025-03-12", status: "Đang hoạt động" },
  { id: 5, movie: "Em và Trịnh", room: "Phòng 2", timeStart: "6:00 PM", timeEnd: "8:00 PM", date: "2025-03-12", status: "Đã chiếu" },
  { id: 6, movie: "Thanh Sói", room: "Phòng 3", timeStart: "8:30 PM", timeEnd: "10:30 PM", date: "2025-03-12", status: "Sắp chiếu" }
];
const ShowtimesManage = () => {
  const [showTime, setShowTime] = useState(initialShowTimes);
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");
  const [showTimeData, setShowTimeData] = useState({
    movie: "", room: "", timeStart: "", timeEnd: "", date: "", status: ""
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShowTimeData({ ...showTimeData, [name]: value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setShowTime(showTime.map((showTime) => showTime.id === editing ? { ...showTimeData, id: editing } : showTime));
      setMessage("Cập nhật thông tin thành công!");
    } else {
      setShowTime([...showTime, { ...showTimeData, id: showTime.length + 1 }]);
      setMessage("Thêm thành công!");
    }
    setShowTimeData({ movie: "", room: "", timeStart: "", timeEnd: "", date: "", status: "" });
    setEditing(null);
    setShowForm(false);
    setTimeout(() => setMessage(""), 3000);
  }
  const handleEdit = (showTime) => {
    setShowTimeData(showTime);
    setEditing(showTime.id);
    setShowForm(true);
  }
  const [filterStatus, setFilterStatus] = useState("");
  const filterShowtime = filterStatus ? showTime.filter(showtime => showtime.status === filterStatus) : showTime;
  return (
    <div className='min-h-screen bg-main text-white'>
      <div className='container'>
        <div className='ml-[220px] flex-1 p-10'>
          <div className="p-6 font-sans">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Quản lý lịch chiếu</h1>
              <button onClick={() => { setShowForm(!showForm); setEditing(null); setShowTimeData({ movie: "", room: "", timeStart: "", timeEnd: "", date: "", status: "" }) }}
                className="bg-blue-600 px-4 py-2 rounded text-white">
                {showForm ? "Đóng" : "Thêm lịch chiếu"}
              </button>
            </div>
            {message && <div className="text-green-500 font-semibold mb-2">{message}</div>}
            {showForm && (
              <form onSubmit={handleSubmit} className="bg-gray-200 text-black p-4 rounded-md mb-4">
                <h2 className="text-lg font-semibold mb-2">{editing ? "Chỉnh sửa lịch chiếu" : "Nhập thông tin lịch chiếu"}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="room" value={showTimeData.room} onChange={handleInputChange} placeholder="Tên phòng" className="p-2 border rounded border-blue-700 outline-none" required />
                  <input type="text" name="movie" value={showTimeData.movie} onChange={handleInputChange} placeholder="Tên phim" className="p-2 border rounded border-blue-700 outline-none" required />
                  <input type="date" name="date" value={showTimeData.date} onChange={handleInputChange} placeholder="Ngày chiếu" className="p-2 border rounded border-blue-700 outline-none" required />
                  <input type="text" name="timeStart" value={showTimeData.timeStart} onChange={handleInputChange} placeholder="Thời gian bắt đầu" className="p-2 border rounded border-blue-700 outline-none" required />
                  <input type="text" name="timeEnd" value={showTimeData.timeEnd} onChange={handleInputChange} placeholder="Thời gian kết thúc" className="p-2 border rounded border-blue-700 outline-none" required />
                  <select name="status" value={showTimeData.status} onChange={handleInputChange} className="p-2 border rounded border-blue-700 outline-none" required>
                    <option value="">Chọn trạng thái</option>
                    <option value="Đang hoạt động">Đang hoạt động</option>
                    <option value="Sắp chiếu">Sắp chiếu</option>
                    <option value="Đã chiếu">Đã chiếu</option>
                  </select>
                </div>
                <button type="submit" className="mt-4 bg-green-600 px-4 py-2 rounded text-white">
                  {editing ? "Cập nhật" : "Thêm"}
                </button>
              </form>
            )}

            <div className="space-y-3 mt-5">
              <div className="flex justify-between">
                <div><h2 className="font-bold text-lg">CGV Vincom</h2></div>
                <div className="mb-4 text-right">
                  <select
                    className="bg-gray-700 text-white px-4 py-2 rounded outline-none"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="">Lọc theo trạng thái</option>
                    <option value="Đang hoạt động">Đang hoạt động</option>
                    <option value="Sắp chiếu">Sắp chiếu</option>
                    <option value="Đã chiếu">Đã chiếu</option>
                  </select>
                </div>
              </div>
              <table className="w-full border-collapse border border-gray-700">
                <thead>
                  <tr className="bg-gray-800 text-left">
                    <th className="p-2 border border-gray-700">Tên phòng</th>
                    <th className="p-2 border border-gray-700">Tên phim</th>
                    <th className="p-2 border border-gray-700">Thời gian chiếu</th>
                    <th className="p-2 border border-gray-700">Trạng thái</th>
                    <th className="p-2 border border-gray-700">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filterShowtime.map((showtime) => (
                    <tr key={showtime.id} className="border border-gray-700">
                      <td className="p-2 border border-gray-700">{showtime.room}</td>
                      <td className="p-2 border border-gray-700">{showtime.movie}</td>
                      <td className="p-2 border border-gray-700">{showtime.timeStart} - {showtime.timeEnd} - Ngày: {showtime.date}</td>
                      <td className="p-2 border border-gray-700">{showtime.status}</td>
                      <td className="p-2 border border-gray-700">
                        <div className="flex justify-center items-center gap-4">
                          <button onClick={() => handleEdit(showtime)} className="text-yellow-400">Sửa</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowtimesManage;
