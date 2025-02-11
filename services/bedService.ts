import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // Lấy URL từ .env
});

// -------------------- 🛏️ BEDS --------------------

export interface Bed {
    _id: string;
    name: string;
    roomId: string;
    houseId: string;
    status: "Trống" | "Đã thuê";
}

// 🔹 Omit để loại bỏ `_id` khi gửi dữ liệu giường lên backend
export type BedInput        = Omit<Bed, "_id" | "houseId">;
export type BedOfHouseInput = Omit<Bed, "_id" | "roomId">;
// 🔹 Lấy danh sách giường trong một phòng giường
export const getRoomBeds = async (roomId: string): Promise<Bed[]> => {
    try {
        const response = await API.get<Bed[]>(`/api/rooms/${roomId}/beds`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách giường:", error);
        return [];
    }
};

// 🔹 Lấy chi tiết giường theo ID
export const getBedDetail = async (bedId: string): Promise<Bed | null> => {
    try {
        const response = await API.get<Bed>(`/api/beds/${bedId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết giường:", error);
        return null;
    }
};

// 🔹 Thêm giường vào một phòng giường
export const addBed = async (bedData: BedInput): Promise<boolean> => {
    try {
        const response = await API.post<Bed>(`/api/beds/create`, bedData);
        return response.status === 201;
    } catch (error) {
        console.error("Lỗi khi thêm giường:", error);
        return false;
    }
};

// 🔹 Thêm giường trực tiếp vào nhà ký tự xá (không cần phòng)
export const addBedOfHouse = async (bedData: BedOfHouseInput, houseId: string): Promise<boolean> => {
    try {
        const response = await API.post(`/api/houses/${houseId}/beds`, bedData);
        return response.status === 201;
    } catch (error) {
        console.error("Lỗi khi thêm giường vào nhà ký tự xá:", error);
        return false;
    }
};

// 🔹 Xóa giường
export const deleteBed = async (bedId: string): Promise<boolean> => {
    try {
        const response = await API.delete(`/api/beds/${bedId}`);
        return response.status === 200;
    } catch (error) {
        console.error("Lỗi khi xóa giường:", error);
        return false;
    }
};

export const getHouseBeds = async (houseId: string): Promise<Bed[]> => {
    try {
        const response = await API.get<Bed[]>(`/api/houses/${houseId}/beds`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách giường:", error);
        return [];
    }
};
