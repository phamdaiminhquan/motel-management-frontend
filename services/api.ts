import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Lấy URL từ .env
});

// -------------------- 🏠 HOUSES --------------------

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

// 🔹 Omit để loại bỏ `_id`, `createdAt`, `updatedAt` khi gửi lên backend
export type HouseInput = Omit<House, "_id" | "rooms" | "createdAt" | "updatedAt" | "status">;

// 🔹 Lấy danh sách nhà trọ
export const getHouses = async (): Promise<House[]> => {
  try {
    const response = await API.get<House[]>("/api/houses");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách nhà trọ:", error);
    return [];
  }
};

// 🔹 Lấy thông tin chi tiết của 1 nhà trọ
export const getHouseInfo = async (houseId: string): Promise<House | null> => {
  try {
    const response = await API.get<House>(`/api/houses/${houseId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin nhà trọ:", error);
    return null;
  }
};

// 🔹 Thêm nhà trọ
export const addHouse = async (house: HouseInput): Promise<boolean> => {
  try {
    const response = await API.post<House>("/api/houses", house);
    return response.status === 201;
  } catch (error) {
    console.error("Lỗi khi thêm nhà trọ:", error);
    return false;
  }
};

// -------------------- 🚪 ROOMS --------------------

export interface Room {
  _id: string;
  name: string;
  type: "Phòng riêng" | "Phòng giường";
  status: "Trống" | "Đã thuê";
}

// 🔹 Omit để loại bỏ `_id` khi gửi dữ liệu phòng lên backend
export type RoomInput = Omit<Room, "_id">;

// 🔹 Lấy danh sách phòng
export const getRooms = async (): Promise<Room[]> => {
  try {
    const response = await API.get<Room[]>("/api/rooms");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phòng:", error);
    return [];
  }
};

// 🔹 Lấy danh sách phòng theo nhà trọ
export const getHouseRooms = async (houseId: string): Promise<Room[]> => {
  try {
    const response = await API.get<Room[]>(`/api/houses/${houseId}/rooms`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phòng:", error);
    return [];
  }
};
