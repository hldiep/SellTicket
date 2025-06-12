import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useAuth } from '../../util/AuthContext';

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  setLoading(true);

  const form = e.target;
  const username = form.username.value.trim();
  const password = form.password.value;

  try {
    await login(username, password); 

    const currentUser = JSON.parse(localStorage.getItem('user'));

    const roles = currentUser?.roles || [];

    if (roles.includes("ROLE_ADMIN")) {
      navigate('/admin');
    } else if (roles.includes("ROLE_USER")) {
      navigate('/');
    } else {
    
      navigate('/');
    }

    setSuccess("Đăng nhập thành công!");
    setLoading(false);

  } catch (err) {
    setError(err.message || "Đăng nhập thất bại");
    setLoading(false);
  }
};

    return (
        <div className="min-h-screen pt-20 bg-main flex justify-center text-white">
            <div className="container max-w-xl w-full">
                <main className="p-8 text-center">
                    <div className="mt-20">
                        <h1 className="uppercase font-bold text-3xl">Đăng Nhập</h1>

                        {error && <p className="text-red-500 mt-4">{error}</p>}
                        {success && <p className="text-green-500 mt-4">{success}</p>}

                        <form
                            className="border border-yellow-600 mt-8 p-6 rounded-lg shadow-lg"
                            onSubmit={handleSubmit}
                        >
                            <div className="text-left text-sm mb-4">
                                <label className="block mb-2">Tài khoản, email hoặc số điện thoại</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="w-full p-2 border rounded-md text-gray-900 outline-none"
                                    required
                                />
                            </div>

                            <div className="text-left text-sm mt-4">
                                <label className="block mb-2">Mật khẩu</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="w-full p-2 border rounded-md text-gray-900 outline-none"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center mt-2 text-black"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="text-right mt-4 italic text-sm">
                                <Link to="/forgetPwd" className="text-yellow-600 hover:underline">Quên mật khẩu?</Link>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`mt-6 w-full border border-yellow-600 font-bold py-2 rounded-lg transition-all ${loading
                                    ? 'bg-yellow-600 opacity-70 cursor-not-allowed'
                                    : 'hover:bg-yellow-600 hover:text-white'
                                    }`}
                            >
                                {loading ? 'Đang đăng nhập...' : 'ĐĂNG NHẬP'}
                            </button>

                            <div className="mt-4 flex justify-center text-sm italic">
                                <p>Bạn chưa có tài khoản?</p>
                                <Link to="/register" className="ml-1 text-yellow-600 hover:underline">Đăng ký tại đây</Link>
                            </div>

                            {/* Social login */}
                            <div className="flex justify-center space-x-4 mt-6">
                                <SocialButton icon={<FaFacebook className="text-xl" />} label="Facebook" />
                                <SocialButton icon={<FaGoogle className="text-xl" />} label="Google" />
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

const SocialButton = ({ icon, label }) => (
    <button
        type="button"
        className="flex items-center border border-yellow-600 py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
    >
        <span className="text-white">{icon}</span>
        <span className="ml-2 text-white font-bold">Đăng nhập bằng {label}</span>
    </button>
);

export default Login;
