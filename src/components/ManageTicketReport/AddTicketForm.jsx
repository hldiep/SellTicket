import React, { useState } from "react";

import ClippedDrawer from "../Dashboard/DashboardLayoutBasic";
import { addTicket } from "../../util/ticketApi";
import { useNavigate } from "react-router-dom";

const AddTicketForm = () => {
    const navigate=useNavigate();
  const [ticket, setTicket] = useState({
    id: "",
    name: "",
    price: "",
    typeTicket: "",
    slot: "",
    active: "ACTIVE",
    conditionUse: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = {
      name: ticket.name,
      price: parseFloat(ticket.price),
      typeTicket: ticket.typeTicket, // tên trường phải đúng
      slot: parseInt(ticket.slot),   // tên trường phải đúng
      conditionUse: ticket.conditionUse,
      active: ticket.active,
      id: "" // có thể để trống nếu backend tự sinh
    };

    console.log("Sending data:", data);
    const res = await addTicket(data);
    setMessage("Thêm vé thành công!");
    console.log("Ticket added:", res);
  } catch (err) {
    setMessage("Thêm vé thất bại.");
    console.error("Error:", err);
  }
};


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
                        onClick={() => navigate('/quan-ly-ve')}
                        className="hover:underline text-blue-600"
                    >
                        Quản lý vé
                    </button>
                    <span>/</span>
                    <span className="text-gray-700 font-medium">Thêm vé</span>
                </div>
                <h2 className="text-xl font-semibold p-4">Thêm vé</h2>
            </div>
        
      <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-[calc(100vh-80px)]">
        <div className="container">
        <form className="grid grid-cols-2 gap-6 mt-5" onSubmit={handleSubmit}>
            <input name="name" placeholder="Tên vé" value={ticket.name} onChange={handleChange} required
            className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none" />
            <input name="price" type="number" placeholder="Giá vé" value={ticket.price} onChange={handleChange} required 
            className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"/>
            <input name="typeTicket" placeholder="Loại vé" value={ticket.typeTicket} onChange={handleChange} required 
            className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"/>
            <input name="slot" type="number" placeholder="Số lượng slot" value={ticket.slot} onChange={handleChange} required 
            className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"/>
            <input name="conditionUse" placeholder="Điều kiện sử dụng" value={ticket.conditionUse} onChange={handleChange} 
            className="text-sm outline-none mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"/>
            <button type="submit"
             className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-700 text-white">Thêm vé</button>
        </form>
        </div>
      </div>
      
      <p>{message}</p>

    </ClippedDrawer>
    
  );
};

export default AddTicketForm;
