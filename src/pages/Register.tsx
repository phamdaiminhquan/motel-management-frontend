import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserTag } from "react-icons/fa";

const Register = () => {
    const { login, token } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "EMPLOYEE",
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (token && token !== "null" && token !== "undefined") {
            console.log("Token detected, redirecting to Dashboard...");
            navigate("/"); // Chuyển về Dashboard ngay khi token có
        }
    }, [token, navigate]);

    /**
     * Xử lý chức năng đăng ký.
     * Nếu đăng ký thành công, lưu user & token vào AuthContext, và chuyển hướng về trang Dashboard.
     * Nếu đăng ký thất bại, hiển thị lỗi.
    **/
    const handleRegister = async () => {
        try {
            const { user, token } = await registerUser(formData);
            login(user, token); // Lưu user & token vào AuthContext ngay lập tức
            setSuccess("Đăng ký thành công! Đang chuyển hướng...");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || "Đăng ký thất bại.");
            } else {
                setError("Đăng ký thất bại.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Đăng ký</h2>

                {error && <p className="text-red-500 text-center bg-red-100 p-2 rounded mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center bg-green-100 p-2 rounded mb-4">{success}</p>}

                {/* Tên */}
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium mb-2">Tên đầy đủ</label>
                    <div className="flex items-center border border-gray-300 rounded p-2">
                        <FaUser className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Nhập tên"
                            className="w-full outline-none bg-transparent text-gray-700"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                    <div className="flex items-center border border-gray-300 rounded p-2">
                        <FaEnvelope className="text-gray-400 mr-2" />
                        <input
                            type="email"
                            placeholder="Nhập email"
                            className="w-full outline-none bg-transparent text-gray-700"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                {/* Số điện thoại */}
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium mb-2">Số điện thoại</label>
                    <div className="flex items-center border border-gray-300 rounded p-2">
                        <FaPhone className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Nhập số điện thoại"
                            className="w-full outline-none bg-transparent text-gray-700"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                </div>

                {/* Mật khẩu */}
                <div className="mb-4">
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

                {/* Chọn vai trò */}
                <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-medium mb-2">Vai trò</label>
                    <div className="flex items-center border border-gray-300 rounded p-2">
                        <FaUserTag className="text-gray-400 mr-2" />
                        <select
                            className="w-full outline-none bg-transparent text-gray-700"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="EMPLOYEE">Nhân viên</option>
                            <option value="ADMIN">Quản trị viên</option>
                        </select>
                    </div>
                </div>

                {/* Nút Đăng ký */}
                <button
                    onClick={handleRegister}
                    className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition duration-300"
                >
                    Đăng ký
                </button>

                {/* Chuyển sang đăng nhập */}
                <p className="text-sm text-center text-gray-500 mt-4">
                    Đã có tài khoản?{" "}
                    <span className="cursor-pointer text-blue-500 hover:underline" onClick={() => navigate("/login")}>
                        Đăng nhập
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
