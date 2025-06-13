import React, { useEffect, useState } from "react";
import ClippedDrawer from "../Dashboard/DashboardLayoutBasic";
import { useNavigate } from "react-router-dom";
import { getBranch } from "../../util/branchApi";
import { getRoomByBranch } from "../../util/roomApi";
import { addShowtimeFilm, getShowtime } from "../../util/showtimeApi";
import { getAllSubfilm } from "../../util/subFilm";

const Showtime = () => {
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [showTimes, setShowTimes] = useState([]);
  const [subFilms, setSubFilms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
  timeStart: null,  // dùng Date object
  timeEnd: null,
  timestamp:"",
  status: "ACTIVE",
  subFilmId: "",
  roomId: ""
});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const branches = await getBranch();
        if (branches) {
          setCinemas(branches.map(branch => ({ id: branch.id, name: branch.nameBranch })));
        }
      } catch (error) {
        console.error("Lỗi khi tải rạp chiếu:", error);
      }
    };
    fetchBranches();
  }, []);

  useEffect(() => {
    if (!selectedCinema?.id) return;
    const fetchRooms = async () => {
      try {
        const data = await getRoomByBranch(selectedCinema.id);
        setRooms(data);
      } catch (error) {
        console.error("Không thể tải danh sách phòng:", error);
      }
    };
    fetchRooms();
  }, [selectedCinema]);

  const fetchData = async () => {
    try {
      const data = await getAllSubfilm();
      setSubFilms(data);
    } catch (error) {
      console.error("Lỗi khi tải subfilm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCinemaSelect = (cinema) => {
    setSelectedCinema(cinema);
    setShowForm(false);
    setEditing(null);
    setShowTimes([]);
    setFormData({ roomId: "", timeStart: "", timeEnd: "", timestamp: "", status: "ACTIVE", subFilmId: "" });
  };

  const handleInputChange = (e) => {
  const { name, value } = e.target;

  // Nếu là ngày -> lưu dạng string yyyy-MM-dd
  if (name === "timestamp") {
    setFormData({ ...formData, [name]: value });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  if (!formData.room || !formData.date) {
    alert("Vui lòng chọn phòng chiếu và ngày.");
    return;
  }
  try {
    const res = await getShowtime(formData.room, formData.date);
    if (res) setShowTimes(res);
    else alert("Không tìm thấy suất chiếu.");
  } catch (error) {
    alert("Lỗi khi tải suất chiếu: " + error.message);
  } finally{
    setLoading(false);
  }
};

const handleAddSubmit = async (e) => {
  e.preventDefault();
  const { timestamp, timeStart, timeEnd, ...rest } = formData;

  const fullStart = new Date(`${timestamp}T${timeStart.toTimeString().slice(0, 5)}:00`);
  const fullEnd = new Date(`${timestamp}T${timeEnd.toTimeString().slice(0, 5)}:00`);

  const payload = {
    ...rest,
    timestamp,
    timeStart: fullStart.toISOString(),
    timeEnd: fullEnd.toISOString()
  };

  try {
    const res = await addShowtimeFilm(payload);
    console.log("Cập nhật thành công:", res.data);
  } catch (error) {
    console.error("Lỗi khi gửi request:", error);
  }
};

  const handleEdit = (showtime) => {
    setFormData({
      roomId: showtime.roomId,
      timestamp: showtime.timestamp,
      timeStart: showtime.timeStart,
      timeEnd: showtime.timeEnd,
      status: showtime.status,
      subFilmId: showtime.subFilmId
    });
    setEditing(showtime.id);
    setShowForm(true);
  };
  return (
    <ClippedDrawer>
      <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
        <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
          <button onClick={() => navigate('/admin')} className="hover:underline text-blue-600">Dashboard</button>
          <span>/</span>
          <span className="text-gray-700 font-medium">Quản lý lịch chiếu</span>
        </div>
        <h2 className="text-xl font-semibold p-4">Quản lý lịch chiếu</h2>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
        {!selectedCinema ? (
          <>
            <h1 className="text-lg font-bold mb-6">Chọn rạp chiếu để quản lý</h1>
            <div className="grid grid-cols-2 gap-6">
              {cinemas.map(cinema => (
                <button key={cinema.id} onClick={() => handleCinemaSelect(cinema)} className="text-black bg-gray-200 hover:bg-gray-300 p-6 rounded text-xl font-semibold">
                  {cinema.name}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">Rạp: {selectedCinema.name}</h1>
              <div className="flex items-center gap-4">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <select name="room" value={formData.room} onChange={handleInputChange} className="outline-none text-sm rounded border px-3 py-2">
                    <option value="">Phòng chiếu</option>
                    {rooms.map((room) => <option key={room.id} value={room.id}>{room.name}</option>)}
                  </select>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="outline-none text-sm rounded border px-3 py-2" />
                  <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white">Xem</button>
                </form>
                <button onClick={() => { setShowForm(!showForm); setEditing(null); setFormData({ room: "", timeStart: "", timeEnd: "", date: "", status: "ACTIVE", subFilmId: "" }); }} className="bg-green-600 px-4 py-2 rounded text-white">
                  {showForm ? "Đóng" : "Thêm lịch"}
                </button>
                <button onClick={() => setSelectedCinema(null)} className="bg-red-600 px-4 py-2 rounded text-white">Quay lại</button>
              </div>
            </div>

            {showForm && (
              <form onSubmit={handleAddSubmit} className="bg-gray-200 text-black p-4 rounded mb-6">
                <h2 className="text-lg font-semibold mb-2">{editing ? "Chỉnh sửa lịch chiếu" : "Nhập thông tin lịch chiếu"}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <select name="roomId" value={formData.roomId} onChange={handleInputChange} className="outline-none p-2 border rounded" required>
                    <option value="">Chọn phòng</option>
                    {rooms.map(room => <option key={room.id} value={room.id}>{room.name}</option>)}
                  </select>
                  <input type="date" name="timestamp" value={formData.timestamp} onChange={handleInputChange} className="outline-none p-2 border rounded" required />
                  <input
                    type="time"
                    value={formData.timeStart}
                    onChange={(e) => setFormData({ ...formData, timeStart: e.target.value })}
                    className="outline-none p-2 border rounded"
                  />

                  <input
                    type="time"
                    value={formData.timeEnd}
                    onChange={(e) => setFormData({ ...formData, timeEnd: e.target.value })}
                    className="outline-none p-2 border rounded"
                  />
                  <select name="status" value={formData.status} onChange={handleInputChange} className="outline-none p-2 border rounded">
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                  <select name="subFilmId" value={formData.subFilmId} onChange={handleInputChange} className="outline-none p-2 border rounded">
                    <option value="">Chọn xuất chiếu</option>
                    {subFilms.map(sf => (
                      <option key={sf.id} value={sf.id}>{sf.filmDto.name} - {sf.subDto.name}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="mt-4 bg-blue-600 px-4 py-2 rounded text-white">{editing ? "Cập nhật" : "Thêm"}</button>
              </form>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-r-transparent"></div>
                <div className="ml-4 text-blue-600 font-medium text-lg">Đang tải dữ liệu...</div>
              </div>
            ) : (
              <table className="w-full bg-white shadow-md rounded text-black">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-left">
                    <th className="p-2">Tên phim</th>
                    <th className="p-2">Hình thức chiếu</th>
                    <th className="p-2">Thời gian chiếu</th>
                    <th className="p-2">Trạng thái</th>
                    <th className="p-2">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(showTimes) && showTimes.length > 0 ? (
                    showTimes.map(showtime => (
                      <tr key={showtime.id} className="border-t hover:bg-gray-50">
                        <td className="p-2">{showtime.filmName}</td>
                        <td className="p-2">{showtime.subName}</td>
                        <td className="p-2">{showtime.timeStart} - {showtime.timeEnd}</td>
                        <td className="p-2">{showtime.status}</td>
                        <td className="p-2">
                          <button onClick={() => handleEdit(showtime)} className="bg-yellow-500 px-3 py-1 text-white rounded">Sửa</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-4 text-gray-600">Không có dữ liệu lịch chiếu.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </ClippedDrawer>
  );
};

export default Showtime;
