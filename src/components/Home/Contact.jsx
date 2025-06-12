import { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", formData.name);
        formData.append("email", formData.email);
        formData.append("message", formData.message);

        try {
            const response = await fetch("https://script.google.com/macros/s/AKfycbzhPdnJfYMyKmGT-Sb-OSWzsYRJtgbbUiO5FoSIzP55m4mEFXHzUPZyUjeXOtR1pOpP/exec", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.status === "success") {
                alert("Gửi thông tin thành công!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                alert("Gửi thất bại, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            alert("Không thể gửi thông tin. Vui lòng thử lại sau!");
        }
    };

    return (
        <div div className="min-h-screen pt-20 bg-main flex justify-center">
            <div className='flex justify-center p-6 space-x-5 mt-9'>
                <div
                    className="text-3xl flex flex-col items-center justify-center w-full md:w-1/2 space-y-6 mb-6 md:mb-0">
                    <h2
                        style={{ fontFamily: '"Noto Sans", sans-serif' }}
                        className="mt-5 text-white font-bold uppercase text-center"
                    >
                        Liên Hệ Với Chúng Tôi
                    </h2>
                    <button
                        className="font-bold border border-yellow-600 px-5 py-2 rounded-xl text-yellow-600 w-[220px] hover:bg-yellow-600 hover:text-white transition-all duration-300">
                        FACEBOOK
                    </button>
                    <button
                        className="font-bold border border-yellow-600 px-5 py-2 rounded-xl text-yellow-600 w-[220px] hover:bg-yellow-600 hover:text-white transition-all duration-300">
                        ZALO CHAT
                    </button>
                </div>

                <div className="w-full md:w-2/3 border border-yellow-600 p-6 rounded-lg shadow-lg">
                    <div className="space-y-4 text-white">
                        <h2 className='uppercase font-bold'>Thông tin liên hệ</h2>
                        <p className="flex items-center">
                            <span className="mr-2">📞</span> 1900.0085
                        </p>
                        <p className="flex items-center">
                            <span className="mr-2">📍</span> 97 Đường Man Thiện, Phường Hiệp Phú, Quận 9, TP.HCM
                        </p>
                    </div>

                    <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Họ và tên"
                            className="w-full p-2 border rounded-md text-gray-900 outline-none"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Điền email"
                            className="w-full p-2 border rounded-md text-gray-900 outline-none"
                            required
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Thông tin liên hệ hoặc phản ánh"
                            className="w-full p-2 border rounded-md text-gray-900 outline-none h-20"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="font-bold border border-yellow-600 px-5 py-2 rounded-xl text-yellow-600 w-[120px] hover:bg-yellow-600 hover:text-white transition-all duration-300"
                        >
                            GỬI NGAY
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Contact