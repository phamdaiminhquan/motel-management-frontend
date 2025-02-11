import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // Lấy URL từ .env
});

export const getHouseDetail = async (houseId: string): Promise<{ name: string; address: string }> => {
  try {
    const response = await API.get<{ name: string; address: string }>(`/api/houses/${houseId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin nhà:", error);
    return { name: "Không xác định", address: "Không có địa chỉ" };
  }
};
