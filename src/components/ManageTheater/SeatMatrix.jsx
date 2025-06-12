import React, { useState, useEffect } from 'react';

const SeatMatrix = ({ onClose, onSaveRoom, initialPositionChair }) => {
    const cols = 14;
    const rows = 14;

    // selectedSeats lưu theo dạng mảng vị trí ghế: 
    // ví dụ: [{type: 'single', row: 1, col: 1}, {type: 'pair', seats: [{r:2,c:3}, {r:2,c:4}]}]
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatType, setSeatType] = useState(0); // 0: đơn, 1: đôi
    const [roomName, setRoomName] = useState('');
    const [createDate, setCreateDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setCreateDate(formattedDate);

        // Nếu có dữ liệu ghế từ API (initialPositionChair), load vào selectedSeats
        if (initialPositionChair && Array.isArray(initialPositionChair)) {
            const loadedSeats = [];
            for (let r = 0; r < initialPositionChair.length; r++) {
                for (let c = 0; c < initialPositionChair[r].length; c++) {
                    const val = initialPositionChair[r][c];
                    if (val === 1) {
                        loadedSeats.push({ type: 'single', row: r, col: c });
                    } else if (val === 2) {
                        // Ghế đôi: chỉ thêm ghế đầu tiên của cặp
                        if (
                            c < cols - 1 &&
                            initialPositionChair[r][c + 1] === 2 &&
                            !loadedSeats.some(
                                (seat) =>
                                    seat.type === 'pair' &&
                                    seat.seats.some(
                                        (s) => s.row === r && (s.col === c || s.col === c + 1)
                                    )
                            )
                        ) {
                            loadedSeats.push({
                                type: 'pair',
                                seats: [
                                    { row: r, col: c },
                                    { row: r, col: c + 1 }
                                ]
                            });
                        }
                    }
                }
            }
            setSelectedSeats(loadedSeats);
        }
    }, [initialPositionChair]);

    // Hàm kiểm tra ghế có được chọn chưa
    const isSeatSelected = (row, col) => {
        return selectedSeats.some(seat => {
            if (seat.type === 'single') {
                return seat.row === row && seat.col === col;
            } else if (seat.type === 'pair') {
                return seat.seats.some(s => s.row === row && s.col === col);
            }
            return false;
        });
    };

    // Xử lý click chọn ghế
    const toggleSeat = (row, col) => {
        if (seatType === 0) {
            // Ghế đơn
            if (isSeatSelected(row, col)) {
                // Bỏ chọn ghế đơn
                setSelectedSeats(prev =>
                    prev.filter(
                        seat => !(seat.type === 'single' && seat.row === row && seat.col === col)
                    )
                );
            } else {
                // Thêm ghế đơn
                setSelectedSeats(prev => [...prev, { type: 'single', row, col }]);
            }
        } else {
            // Ghế đôi: chọn cặp ghế (c, c+1)
            if (col === cols - 1) {
                alert('Ghế đôi không thể chọn ghế cuối cùng một mình!');
                return;
            }
            // Kiểm tra xem ghế c hoặc c+1 có đang được chọn rồi không
            if (
                isSeatSelected(row, col) ||
                isSeatSelected(row, col + 1)
            ) {
                alert('Một trong hai ghế đã được chọn rồi!');
                return;
            }
            // Thêm ghế đôi
            setSelectedSeats(prev => [
                ...prev,
                { type: 'pair', seats: [{ row, col }, { row, col: col + 1 }] }
            ]);
        }
    };

    // Chuyển selectedSeats thành ma trận 2D để lưu
    const buildPositionChairMatrix = () => {
        const matrix = Array(rows)
            .fill(0)
            .map(() => Array(cols).fill(0));

        selectedSeats.forEach(seat => {
            if (seat.type === 'single') {
                matrix[seat.row][seat.col] = 1;
            } else if (seat.type === 'pair') {
                seat.seats.forEach(s => {
                    matrix[s.row][s.col] = 2;
                });
            }
        });
        return matrix;
    };

    const handleSave = () => {
        if (!roomName.trim()) {
            alert('Vui lòng nhập tên phòng chiếu!');
            return;
        }

        const positionChair = buildPositionChairMatrix();

        const room = {
            name: roomName,
            positionChair, // gửi về API dạng ma trận 2D
            createdAt: createDate,
        };

        onSaveRoom(room);
        onClose();
    };

    // Tạo ma trận ghế hiển thị
    const seatMatrix = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const selected = isSeatSelected(r, c);
            // Xác định màu ghế: ghế đôi có 2 ghế liền nhau
            let isPair = false;
            if (selected) {
                // Kiểm tra xem ghế này thuộc ghế đôi không
                const seat = selectedSeats.find(seat => {
                    if (seat.type === 'pair') {
                        return seat.seats.some(s => s.row === r && s.col === c);
                    }
                    return false;
                });
                isPair = Boolean(seat);
            }

            seatMatrix.push(
                <button
                    key={`${r}-${c}`}
                    onClick={() => toggleSeat(r, c)}
                    className={`w-6 h-6 rounded border mr-0.5 mb-0.5 ${selected
                            ? isPair
                                ? 'bg-purple-600'
                                : 'bg-blue-600'
                            : 'bg-gray-200 hover:bg-blue-300'
                        }`}
                    title={`${String.fromCharCode(65 + r)}${(c + 1).toString().padStart(2, '0')}`}
                    type="button"
                />
            );
        }
    }

    return (
        <div className="absolute top-20 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex justify-center items-start z-50 p-4 overflow-auto">
            <div className="bg-white text-black rounded-lg p-6 w-[90vw] max-w-6xl max-h-[90vh] overflow-auto shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Chọn sơ đồ ghế</h2>
                    <button
                        onClick={onClose}
                        className="text-red-600 hover:text-red-800 text-xl font-bold"
                        type="button"
                    >
                        ✕
                    </button>
                </div>

                {/* Nhập tên phòng chiếu + hiển thị ngày tạo */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">Tên phòng chiếu:</label>
                        <input
                            type="text"
                            value={roomName}
                            onChange={e => setRoomName(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                            placeholder="Nhập tên phòng chiếu..."
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">Ngày tạo:</label>
                        <div className="px-3 py-2 border rounded bg-gray-100">{createDate}</div>
                    </div>
                </div>

                <div className="flex gap-4 mb-4">
                    <button
                        className={`px-4 py-1 rounded border ${seatType === 0 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                            }`}
                        onClick={() => setSeatType(0)}
                        type="button"
                    >
                        Ghế đơn
                    </button>
                    <button
                        className={`px-4 py-1 rounded border ${seatType === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                            }`}
                        onClick={() => setSeatType(1)}
                        type="button"
                    >
                        Ghế đôi
                    </button>
                </div>

                <div
                    className="grid grid-cols-14 gap-1 mb-4"
                    style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                >
                    {seatMatrix}
                </div>

                <div className="text-sm mb-4">
                    <strong>Số ghế đơn:</strong>{' '}
                    {selectedSeats.filter(seat => seat.type === 'single').length} <br />
                    <strong>Số ghế đôi:</strong>{' '}
                    {selectedSeats.filter(seat => seat.type === 'pair').length} <br />
                    <div className="text-green-600 font-semibold">
                        <strong>Tổng số ghế:</strong>{' '}
                        {selectedSeats.filter(seat => seat.type === 'single').length +
                            selectedSeats.filter(seat => seat.type === 'pair').length * 2}
                    </div>
                </div>

                <button
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={handleSave}
                    type="button"
                >
                    Lưu
                </button>
            </div>
        </div>
    );
};

export default SeatMatrix;
