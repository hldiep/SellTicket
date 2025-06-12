import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClippedDrawer from '../Dashboard/DashboardLayoutBasic';
import { getBranchId, updateBranchById } from '../../util/branchApi';
import { addRoom, getRoomByBranch } from '../../util/roomApi';

const TheaterDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [branch, setBranch] = useState({});
    const [rooms, setRooms] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [originalBranch, setOriginalBranch] = useState({}); 

    const [showAddRoomModal, setShowAddRoomModal] = useState(false);
    const [newRoomName, setNewRoomName] = useState('');
    const [newRoomStatus, setNewRoomStatus] = useState('ACTIVE');
    const [newRoomRows, setNewRoomRows] = useState(14); 
    const [newRoomCols, setNewRoomCols] = useState(20); 
    const [newRoomPositionChair, setNewRoomPositionChair] = useState([]);
    const handleChange = (e) => {
    const { name, value } = e.target;
        setBranch((prev) => ({
            ...prev,
            [name]: value, 
        }));
    };

    const toggleEdit = () => {
        setIsEditing((prev) => !prev);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const branchData = await getBranchId(id);
                setBranch(branchData);
                setOriginalBranch(branchData); 

                const roomData = await getRoomByBranch(id);
                setRooms(roomData);
                setError(null);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu:', err);
                setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleUpdateBranch = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Dữ liệu branch đang gửi đi:", branch);
        try {
            const updated = await updateBranchById(id, {
                nameBranch: branch.nameBranch, 
                address: branch.address,    
                status: branch.status   
            });
            setBranch(updated.data);
            setShowSuccess(true); 
            setTimeout(() => setShowSuccess(false), 3000);
            setIsEditing(false); 
        } catch (err) {
            console.error("Lỗi khi cập nhật rạp:", err);
            alert("Lỗi khi cập nhật rạp: " + (err.message || "Đã xảy ra lỗi không xác định."));
        } finally {
            setLoading(false); 
        }
    };

    const handleCancelEdit = () => {
        setBranch(originalBranch); 
        setIsEditing(false);
    };

    const selectedRoom = rooms.find(r => r.id === selectedRoomId) || { positionChair: [] };

    const handleAddRoomClick = () => {
        setShowAddRoomModal(true);
        setNewRoomName('');
        setNewRoomStatus('ACTIVE');
        setNewRoomRows(14); 
        setNewRoomCols(20); 
        
        setNewRoomPositionChair(Array.from({ length: 14 }, () => Array(20).fill(0)));
    };

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            
            let totalSlots = 0;
            newRoomPositionChair.forEach(row => {
                row.forEach(seatValue => {
                    if (seatValue === 1) totalSlots += 1; // Ghế đơn
                    if (seatValue === 2) totalSlots += 2; // Ghế đôi chiếm 2 chỗ
                });
            });

            const roomData = {
                branchId: id, 
                name: newRoomName,
                status: newRoomStatus,
                positionChair: newRoomPositionChair,
                slot: totalSlots, 
            };
            console.log("Dữ liệu phòng mới gửi đi:", roomData);

            const createdRoom = await addRoom(roomData); 
            setRooms((prevRooms) => [...prevRooms, createdRoom.data]); 
            setShowAddRoomModal(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            setError(null);
        } catch (err) {
            console.error("Lỗi khi thêm phòng:", err);
            if (err.response && err.response.data && err.response.data.message) {
                alert(`Thêm phòng thất bại: ${err.response.data.message}`);
            } else {
                alert("Thêm phòng thất bại: " + (err.message || "Đã xảy ra lỗi không xác định."));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSeatClick = (rowIdx, colIdx) => {
    const newChairLayout = [...newRoomPositionChair.map(row => [...row])]; // clone mảng 2D
    const currentValue = newChairLayout[rowIdx][colIdx];

    if (currentValue === 0) {
        newChairLayout[rowIdx][colIdx] = 1; // Trống → ghế đơn
    } 
    else if (currentValue === 1) {
        const canPlaceDoubleSeat =
            colIdx < newChairLayout[0].length - 1 &&
            newChairLayout[rowIdx][colIdx + 1] === 0 &&
            (colIdx === 0 || newChairLayout[rowIdx][colIdx - 1] !== 2); // không sát ghế đôi bên trái

        if (canPlaceDoubleSeat) {
            newChairLayout[rowIdx][colIdx] = 2;
            newChairLayout[rowIdx][colIdx + 1] = -1;
        } else {
            newChairLayout[rowIdx][colIdx] = 0; // không ghép đôi được thì xóa ghế đơn
        }
    } 
    else if (currentValue === 2) {
        newChairLayout[rowIdx][colIdx] = 0;
        if (colIdx < newChairLayout[0].length - 1 && newChairLayout[rowIdx][colIdx + 1] === -1) {
            newChairLayout[rowIdx][colIdx + 1] = 0;
        }
    }

    setNewRoomPositionChair(newChairLayout);
};

    useEffect(() => {
        if (selectedRoom && selectedRoom.positionChair) {
            setNewRoomRows(selectedRoom.positionChair.length);
            setNewRoomCols(selectedRoom.positionChair[0]?.length || 0);
        }
    }, [selectedRoom]);
    return (
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
                    <span className="text-gray-700 font-medium">Chi tiết rạp</span>
                </div>
                <h2 className="text-xl font-semibold p-4">Chi tiết rạp</h2>
            </div>
            <div className='min-h-screen bg-gray-50'>
                <div className='container'>
                    
                    <div className="p-6 font-sans text-black">
                       
                        {!isEditing && (
                            <button
                                onClick={toggleEdit}
                                className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
                            >
                                Chỉnh sửa
                            </button>
                        )}
                      
                        <form className="grid grid-cols-2 gap-6 text-sm mt-5" onSubmit={handleUpdateBranch}>
                           
                            {isEditing && (
                                <div className="flex space-x-2 col-span-2 mb-4">
                                    <button
                                        type="submit" 
                                        className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-700 text-white"
                                    >
                                        Lưu
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="px-4 py-2 rounded-md bg-gray-400 hover:bg-gray-600 text-white"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold mb-2">Tên rạp chiếu</label>
                                <input
                                    type="text"
                                    name="nameBranch"
                                    value={branch.nameBranch || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Địa chỉ rạp</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={branch.address || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                                />

                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Trạng thái</label>
                                <select
                                    name="status"
                                    value={branch.status || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                                >
                                    <option value="">Chọn trạng thái</option>
                                    <option value="ACTIVE">Hoạt động</option>
                                    <option value="DELETE">Ngừng hoạt động</option>
                                </select>
                            </div>
                        </form>

                        <div>
                            <div className='flex item-center text-center justify-between mt-5 mb-5'>
                                <h2 className="text-lg font-semibold text-black">Danh sách phòng chiếu</h2>
                                <div>
                                    <button onClick={handleAddRoomClick}
                                    className='text-white bg-blue-500 hover:bg-blue-700 p-2 rounded-md'>Thêm phòng chiếu</button>
                                </div>
                            </div>
                            

                            {loading && <p>Đang tải dữ liệu...</p>}
                            {error && <p className="text-red-500">{error}</p>}

                            {!loading && !error && rooms.length === 0 && <p>Không có phòng chiếu nào.</p>}

                            {!loading && !error && rooms.length > 0 && (
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    {rooms.map(room => (
                                        <li
                                            key={room.id}
                                            className={`cursor-pointer p-4 border rounded shadow-sm ${selectedRoomId === room.id ? 'bg-blue-100' : 'bg-white'
                                                }`}
                                            //onClick={() => setSelectedRoomId(room.id)}
                                            onClick={() => {
                                                setSelectedRoomId(room.id);
                                                navigate(`/quan-ly-rap/chi-tiet-rap/${id}/chi-tiet-phong/${room.id}`);
                                                }}
                                        >
                                            <h3 className="font-semibold text-lg">{room.name}</h3>
                                            <p><strong>Trạng thái:</strong> {room.status}</p>
                                            {room.positionChair && (
                                                <>
                                                    <p>
                                                        <strong>Số ghế đơn:</strong>{' '}
                                                        {room.positionChair.flat().filter(seat => seat === 1).length}
                                                    </p>
                                                    <p>
                                                        <strong>Số ghế đôi:</strong>{' '}
                                                        {room.positionChair.flat().filter(seat => seat === 2).length}
                                                    </p>
                                                    <p>
                                                        <strong>Tổng số chỗ ngồi:</strong>{' '}
                                                        {room.positionChair.flat().reduce((total, seat) => {
                                                            if (seat === 1) return total + 1; // ghế đơn = 1 chỗ
                                                            if (seat === 2) return total + 2; // ghế đôi = 2 chỗ
                                                            return total;
                                                        }, 0)}
                                                    </p>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {showAddRoomModal && (
                                <>
                                    <div
                                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                                        onClick={() => setShowAddRoomModal(false)}
                                    />
                                    <div className="fixed inset-0 flex items-center justify-center z-[9999] px-4 py-8">
                                        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto relative p-6">
                                            <h3 className="text-2xl font-bold mb-6 text-gray-800">Thêm phòng chiếu mới</h3>
                                            <form onSubmit={handleCreateRoom}>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                                    <div>
                                                        <label htmlFor="newRoomName" className="block text-sm font-semibold mb-1">Tên phòng</label>
                                                        <input
                                                            type="text"
                                                            id="newRoomName"
                                                            value={newRoomName}
                                                            onChange={(e) => setNewRoomName(e.target.value)}
                                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="newRoomStatus" className="block text-sm font-semibold mb-1">Trạng thái</label>
                                                        <select
                                                            id="newRoomStatus"
                                                            value={newRoomStatus}
                                                            onChange={(e) => setNewRoomStatus(e.target.value)}
                                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        >
                                                            <option value="ACTIVE">Hoạt động</option>
                                                            <option value="DELETE">Ngừng hoạt động</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <h4 className="text-lg font-semibold mb-3">Thiết kế sơ đồ ghế:</h4>
                                                <div className="overflow-x-auto p-4 border border-gray-300 rounded-md bg-gray-50 mb-6">
                                                    {/* Khu vực màn hình */}
                                                    <div className="bg-gray-300 text-center py-2 mb-4 rounded">
                                                        <p className="font-semibold text-gray-700">MÀN HÌNH</p>
                                                    </div>

                                                    <div
                                                        className="inline-grid gap-1 justify-center items-center"
                                                        style={{
                                                            gridTemplateColumns: `repeat(${newRoomCols + 1}, minmax(0, 24px))`,
                                                            maxWidth: 'fit-content',
                                                            margin: '0 auto',
                                                        }}
                                                    >
                                                        <div className="w-6 h-6"></div> 
                                                        {Array.from({ length: newRoomCols }).map((_, cIdx) => (
                                                            <div key={`col-header-${cIdx}`} className="w-6 h-6 flex items-center justify-center text-xs font-semibold text-gray-600">
                                                                {cIdx + 1}
                                                            </div>
                                                        ))}

                                                        {newRoomPositionChair.map((row, rIdx) => (
                                                            <React.Fragment key={`new-row-${rIdx}`}>
                                                               <div className="col-start-1 text-center font-bold text-xs text-gray-600 flex items-center justify-center h-6 w-6">
                                                                    {String.fromCharCode(65 + rIdx)}
                                                                </div>
                                                                {row.map((seatValue, cIdx) => {
                                                                    let bgColor = 'bg-gray-200'; 
                                                                    let label = '';
                                                                    let textColor = 'text-gray-500';

                                                                    const isDoubleSeatPart2 = cIdx > 0 && newRoomPositionChair[rIdx][cIdx - 1] === 2;
                                                                    if (isDoubleSeatPart2) {
                                                                      
                                                                        return null; 
                                                                    }

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
                                                                            className={`relative flex items-center justify-center border border-gray-300 cursor-pointer transition-colors duration-100 ease-in-out ${bgColor} ${seatValue === 2 ? 'w-12' : 'w-6'} h-6 rounded text-xs font-semibold ${textColor}`}
                                                                            onClick={() => handleSeatClick(rIdx, cIdx)}
                                                                            title={`${String.fromCharCode(65 + rIdx)}${cIdx + 1}`}
                                                                            style={{
                                                                                gridColumn: `${cIdx + 2} / span ${seatValue === 2 ? 2 : 1}` 
                                                                            }}
                                                                        >
                                                                            {label}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </React.Fragment>
                                                        ))}
                                                    </div>

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

                                                <div className="flex justify-end space-x-3 mt-6">
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowAddRoomModal(false)}
                                                        className="px-5 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
                                                    >
                                                        Hủy
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                                                    >
                                                        Tạo phòng
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {showSuccess && (
                    <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-all duration-500">
                        Lưu thành công!
                    </div>
                )}

            </div>
        </ClippedDrawer >

    );
};

export default TheaterDetail;
