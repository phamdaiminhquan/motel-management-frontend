import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // Lấy URL từ .env
});

export interface House {
  _id: string;
  name: string;
  address: string;
  type: string;
  status: "Còn phòng" | "Hết phòng";
  rooms: Room[];
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  _id: string;
  name: string;
  type: "Phòng riêng" | "Phòng giường";
  status: "Trống" | "Đã thuê";
}

export const getHouseDetail = async (houseId: string): Promise<House> => {
  try {
    const response = await API.get<House>(`/api/houses/${houseId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin nhà:", error);
    return {} as House;
  }
};
