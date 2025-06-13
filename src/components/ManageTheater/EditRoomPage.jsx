import React, { useEffect, useState } from 'react'
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteRoomById, getRoomById, updateRoomById } from '../../util/roomApi';

const EditRoomPage = () => {
    const navigate=useNavigate();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true)
    const {idRoom} = useParams();
    const [rows, setRows] = useState(0);
    const [cols, setCols] = useState(0);

    useEffect(() => {
        if (room?.positionChair) {
            setRows(room.positionChair.length);
            setCols(room.positionChair[0]?.length || 0);
        }
    }, [room]);
    const resizeChairLayout = (oldChair, newRow, newCol) => {
        const updatedChair = [];

        for (let r = 0; r < newRow; r++) {
            if (r < oldChair.length) {
                // Giữ hàng cũ, thêm/cắt cột
                updatedChair.push([
                    ...oldChair[r].slice(0, newCol),
                    ...Array(Math.max(0, newCol - oldChair[r].length)).fill(0),
                ]);
            } else {
                // Thêm hàng mới
                updatedChair.push(Array(newCol).fill(0));
            }
        }

        return updatedChair;
    };
    const handleRowChange = (e) => {
    const newRow = parseInt(e.target.value);
    setRows(newRow);

    setRoom((prev) => ({
        ...prev,
        positionChair: resizeChairLayout(prev.positionChair || [], newRow, cols),
    }));
};

const handleColChange = (e) => {
    const newCol = parseInt(e.target.value);
    setCols(newCol);

    setRoom((prev) => ({
        ...prev,
        positionChair: resizeChairLayout(prev.positionChair || [], rows, newCol),
    }));
};

    useEffect(() => {
            const fetchMovie = async () => {
                try {
                    const data = await getRoomById(idRoom);
                    setRoom(data);
                    console.log(data);
                } catch (err) {
                    console.error("Lỗi khi lấy dữ liệu phòng:", err);
                    
                } finally {
                    setLoading(false);
                }
            };
            fetchMovie();
        }, [idRoom]);
    const handleUpdateRoom = async () => {
        try {
            // Kiểm tra dữ liệu trước khi gửi
            if (!Array.isArray(room.positionChair) || !Array.isArray(room.positionChair[0])) {
                throw new Error("positionChair phải là mảng lồng mảng, ví dụ: [[1,2],[3,4]]");
            }

            const updatedRoom = {
                name: room.name || "",
                positionChair: room.positionChair,
                branchId: room.branchId || room.branch?.id || "", // ✅ Giữ nguyên branchId cũ nếu có
                status: room.status || "ACTIVE",
                slot: Number(room.slot) || 0
            };

            console.log("Payload gửi đi:", JSON.stringify(updatedRoom, null, 2));

            const result = await updateRoomById(idRoom, updatedRoom);
            alert('Cập nhật thành công!');
        } catch (error) {
            console.error("Update error:", error);
            const detail = error?.response?.data?.detail || error.message;
            alert("Lỗi khi cập nhật: " + detail);
        }
    };

    const handleSeatClickEdit = (rIdx, cIdx) => {
        setRoom(prev => {
            const newMatrix = prev.positionChair.map(row => [...row]);
            const currentValue = newMatrix[rIdx][cIdx];

            if (currentValue === 0) {
                newMatrix[rIdx][cIdx] = 1;
            } else if (currentValue === 1) {
                if (cIdx + 1 < newMatrix[0].length && newMatrix[rIdx][cIdx + 1] === 0) {
                    newMatrix[rIdx][cIdx] = 2; 
                    newMatrix[rIdx][cIdx + 1] = -1; 
                }
            } else if (currentValue === 2) {
                newMatrix[rIdx][cIdx] = 0; 
                if (cIdx + 1 < newMatrix[0].length && newMatrix[rIdx][cIdx + 1] === -1) {
                    newMatrix[rIdx][cIdx + 1] = 0;
                }
            }

            return {
                ...prev,
                positionChair: newMatrix
            };
        });
    };
const handleDeleteRoom = async () => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá phòng này không?");
    if (!confirmDelete) return;

    try {
        const token = localStorage.getItem("token"); // Hoặc lấy từ context/hook nếu dùng
        if (!token) {
            alert("Vui lòng đăng nhập lại.");
            return;
        }

        await deleteRoomById(idRoom, token);
        alert("Xoá phòng thành công!");
        // Có thể điều hướng hoặc reload danh sách phòng tại đây nếu cần
    } catch (error) {
        const detail = error?.response?.data?.detail || error.message;
        alert("Lỗi khi xoá phòng: " + detail);
    }
};

  return (
    <div>
      <ClippedDrawer>
        <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
                <div className="flex items-center text-sm text-gray-600 space-x-2 px-4 pt-2">
                    <button
                        onClick={() => navigate('/admin')}
                        className="hover:underline text-blue-600"
                    >
                        Dashboard
                    </button>
                    <span>/</span>
                    <button
                        onClick={() => navigate('/quan-ly-rap')}
                        className="hover:underline text-blue-600"
                    >
                        Quản lý rạp
                    </button>
                    <span>/</span>
                    {room?.branch?.id && (
                        <>
                            <button
                                onClick={() => navigate(`/quan-ly-rap/chi-tiet-rap/${room.branch.id}`)}
                                className="hover:underline text-blue-600"
                            >
                                Chi tiết rạp
                            </button>
                            <span>/</span>
                        </>
                    )}
                    <span className="text-gray-700 font-medium">Chi tiết phòng</span>
                </div>
                <h2 className="text-xl font-semibold p-4">
                    Chi tiết phòng - {room?.name || 'Đang tải...'} - Rạp {room?.branch?.nameBranch || 'Đang tải...'}
                </h2>
            </div>
            <div className='min-h-screen bg-gray-50'>
                <div className='container'>
                    {loading || !room ? (
  <div className="flex justify-center items-center py-10">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-r-transparent"></div>
    <div className="ml-4 text-blue-600 font-medium text-lg">Đang tải dữ liệu...</div>
  </div>
                    ) : (
                        <div className='mt-5'>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleUpdateRoom}
                                disabled={!room}
                                >
                                Cập nhật
                            </button>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 mt-6">
                                {/* Tên phòng */}
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Tên phòng</label>
                                    <input
                                        type="text"
                                        name='name'
                                        onChange={(e) => setRoom({ ...room, name: e.target.value })}
                                        value={room.name || ''}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* Trạng thái */}
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Trạng thái</label>
                                    <select
                                        id="newRoomStatus"
                                        name='status'
                                        value={room.status || ''}
                                        onChange={(e) => setRoom({ ...room, status: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="ACTIVE">Hoạt động</option>
                                        <option value="DELETE">Ngừng hoạt động</option>
                                    </select>
                                </div>

                            </div>
                            <div className="flex flex-col items-center">
                                <div
                                    className="bg-gray-300 text-center py-2 mb-4 rounded mx-auto"
                                    style={{
                                        width: `${(room.positionChair[0]?.length + 1) * 30}px`,
                                    }}
                                    >
                                    <p className="font-semibold text-gray-700">MÀN HÌNH</p>
                                    </div>

                                <div
                                    className="inline-grid gap-1 justify-center"
                                    style={{
                                    gridTemplateColumns: `repeat(${(room.positionChair[0]?.length || 0) + 1}, minmax(0, 24px))`,
                                    maxWidth: 'fit-content',
                                    margin: '0 auto',
                                    }}
                                >
                                    <div className="w-6 h-6"></div>
                                    {Array.from({ length: room.positionChair[0]?.length || 0 }).map((_, cIdx) => (
                                    <div
                                        key={`col-${cIdx}`}
                                        className="w-6 h-6 flex items-center justify-center text-xs font-semibold text-gray-600"
                                    >
                                        {cIdx + 1}
                                    </div>
                                    ))}

                                    {room.positionChair.map((row, rIdx) => (
                                    <React.Fragment key={`row-${rIdx}`}>
                                        <div className="text-center font-bold text-xs text-gray-600 flex items-center justify-center h-6 w-6">
                                        {String.fromCharCode(65 + rIdx)}
                                        </div>
                                        {row.map((seatValue, cIdx) => {
                                        const isDoublePart2 = cIdx > 0 && row[cIdx - 1] === 2;
                                        if (isDoublePart2) return null;

                                        let bgColor = 'bg-gray-200';
                                        let label = '';
                                        let textColor = 'text-gray-600';

                                        if (seatValue === 1) {
                                            bgColor = 'bg-blue-500';
                                            label = 'S';
                                            textColor = 'text-white';
                                        } else if (seatValue === 2) {
                                            bgColor = 'bg-purple-500';
                                            label = 'D';
                                            textColor = 'text-white';
                                        }

                                        return (
                                            <div
                                            key={`${rIdx}-${cIdx}`}
                                            onClick={() => handleSeatClickEdit(rIdx, cIdx)}
                                            className={`relative flex items-center justify-center border border-gray-300 ${bgColor} ${seatValue === 2 ? 'w-12' : 'w-6'} h-6 rounded text-xs font-semibold ${textColor}`}
                                            style={{
                                                gridColumn: `${cIdx + 2} / span ${seatValue === 2 ? 2 : 1}`,
                                            }}
                                            title={`${String.fromCharCode(65 + rIdx)}${cIdx + 1}`}
                                            >
                                            {label}
                                            </div>
                                        );
                                        })}
                                    </React.Fragment>
                                    ))}
                                </div>

                                {/* Chú thích */}
                                <div className="flex justify-center mt-4 space-x-4">
                                    <div className="flex items-center">
                                    <div className="w-4 h-4 rounded bg-gray-200 border border-gray-300 mr-2"></div>
                                    <span>Trống</span>
                                    </div>
                                    <div className="flex items-center">
                                    <div className="w-4 h-4 rounded bg-blue-500 mr-2"></div>
                                    <span>Ghế đơn</span>
                                    </div>
                                    <div className="flex items-center">
                                    <div className="w-4 h-4 rounded bg-purple-500 mr-2"></div>
                                    <span>Ghế đôi</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
      </ClippedDrawer>
    </div>
  )
}

export default EditRoomPage
