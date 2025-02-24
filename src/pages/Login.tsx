import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token && token !== "null" && token !== "undefined") {
      console.log("Token detected, redirecting to Dashboard...");
      navigate("/"); // Chuyển hướng khi đã đăng nhập
    }
  }, [token, navigate]);

  const handleLogin = async () => {
    try {
      const { user, token } = await loginUser(formData);
      login(user, token);
      navigate("/"); // Chuyển hướng về trang chính
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Đăng nhập thất bại");
      } else {
        setError("Đăng nhập thất bại");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Đăng nhập</h2>

        {/* Hiển thị lỗi */}
        {error && <p className="text-red-500 text-center bg-red-100 p-2 rounded mb-4">{error}</p>}

        {/* Input Email */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
          <div className="flex items-center border border-gray-300 rounded p-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Nhập email"
              className="w-full outline-none bg-transparent text-gray-700"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        {/* Input Mật khẩu */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-medium mb-2">Mật khẩu</label>
          <div className="flex items-center border border-gray-300 rounded p-2">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="w-full outline-none bg-transparent text-gray-700"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>

        {/* Nút Đăng nhập */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition duration-300"
        >
          Đăng nhập
        </button>

        {/* Quên mật khẩu */}
        <p className="text-sm text-center text-gray-500 mt-4 cursor-pointer hover:underline">
          Quên mật khẩu?
        </p>
        {/* Chuyển sang đăng nhập */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Chưa có tài khoản?{" "}
          <span className="cursor-pointer text-blue-500 hover:underline" onClick={() => navigate("/register")}>
            Đăng ký
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
