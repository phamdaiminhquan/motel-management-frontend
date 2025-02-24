import axios from "axios";


const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // Lấy URL từ .env
});

// 🔹 Đăng ký tài khoản
export const registerUser = async (userData: { name: string; email: string; phone: string; password: string; role: string }) => {
  try {
    const response = await API.post(`api/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw (error as any).response?.data || "Lỗi đăng ký.";
  }
};

// 🔹 Đăng nhập
export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await API.post(`api/auth/login`, credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "Lỗi đăng nhập.";
    } else {
      throw "Lỗi đăng nhập.";
    }
  }
};

// 🔹 Đăng xuất (Xóa token)
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
