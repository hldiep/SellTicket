import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showPolicy, setShowPolicy] = useState(false);
    const [agreePolicy, setAgreePolicy] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        birthDate: "",
        phoneNumber: "",
        username: "",
        email: "",
        idNumber: "",
        password: "",
        confirmPassword: ""
    });
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFormErrors({ ...formErrors, [e.target.name]: "" }); // Xóa lỗi khi nhập dữ liệu
    };

    const validateForm = () => {
        let errors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                errors[key] = "Vui lòng không để trống ô này";
            }
        });

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Mật khẩu xác nhận không khớp";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm() && agreePolicy) {
            navigate("/xac-minh");
        }
    };

    return (
        <div className="min-h-screen pt-20 bg-main flex justify-center">
            <div className="container max-w-xl w-full">
                <main className="p-8 text-center">
                    <div className='mt-20 text-white'>
                        <span className='uppercase font-bold text-3xl'>Đăng ký</span>
                        <form onSubmit={handleSubmit} className='block text-left text-sm border border-yellow-600 mt-8 p-6 rounded-lg shadow-lg'>
                            {[
                                { label: "Họ và tên", name: "fullName", type: "text" },
                                { label: "Ngày sinh", name: "birthDate", type: "date" },
                                { label: "Số điện thoại", name: "phoneNumber", type: "text" },
                                { label: "Tên đăng nhập", name: "username", type: "text" },
                                { label: "Email", name: "email", type: "email" },
                                { label: "CCCD/CMND", name: "idNumber", type: "text" }
                            ].map((field, index) => (
                                <div key={index}>
                                    <p className='flex items-center mt-4'>
                                        <span>{field.label}</span>
                                    </p>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        className="mt-2 w-full p-2 border rounded-md text-gray-900 outline-none"
                                    />
                                    {formErrors[field.name] && <p className="text-red-500 text-sm">{formErrors[field.name]}</p>}
                                </div>
                            ))}

                            {["Mật khẩu", "Xác thực mật khẩu"].map((label, index) => (
                                <div key={index}>
                                    <p className='flex items-center mt-4'>
                                        <span>{label}</span>
                                    </p>
                                    <div className='relative'>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name={index === 0 ? "password" : "confirmPassword"}
                                            value={index === 0 ? formData.password : formData.confirmPassword}
                                            onChange={handleChange}
                                            className="mt-2 w-full p-2 border rounded-md text-gray-900 outline-none"
                                        />
                                        <button
                                            type="button"
                                            className="text-black absolute inset-y-0 right-3 mt-2 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    {formErrors[index === 0 ? "password" : "confirmPassword"] && (
                                        <p className="text-red-500 text-sm">{formErrors[index === 0 ? "password" : "confirmPassword"]}</p>
                                    )}
                                </div>
                            ))}

                            <div className="mt-6 text-left">
                                <button
                                    type="button"
                                    onClick={() => setShowPolicy(!showPolicy)}
                                    className="text-yellow-600 italic"
                                >
                                    Xem chính sách bảo mật
                                </button>
                            </div>

                            {showPolicy && (
                                <div className="mt-4 p-4 border border-gray-400 bg-gray-100 text-black text-sm rounded">
                                    <h3 className="font-bold">Chính sách bảo mật</h3>
                                    <p>
                                        Lưu ý: Khách hàng dưới 16 tuổi chỉ được đồng ý sau khi có sự đồng ý của cha mẹ
                                        hoặc người giám hộ hợp pháp...
                                    </p>
                                </div>
                            )}

                            <div className="mt-4 flex items-center">
                                <input
                                    type="checkbox"
                                    id="agreePolicy"
                                    checked={agreePolicy}
                                    onChange={() => setAgreePolicy(!agreePolicy)}
                                    className="mr-2"
                                />
                                <label htmlFor="agreePolicy" className="text-sm">
                                    Tôi đồng ý với <span className="font-bold">chính sách bảo mật</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className={`mt-6 w-full font-bold py-2 rounded-lg ${agreePolicy ? "border border-yellow-600 hover:bg-yellow-600" : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                disabled={!agreePolicy}
                            >
                                ĐĂNG KÝ
                            </button>

                            <div className='flex justify-center mt-4'>
                                <p className='italic'>Bạn đã có tài khoản? Đăng nhập </p>
                                <Link to="/login" className='ml-1 italic text-yellow-600'>tại đây</Link>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Register;
