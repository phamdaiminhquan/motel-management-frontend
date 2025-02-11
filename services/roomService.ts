import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // Lấy URL từ .env
});

export interface Bed {
    _id: string;
    name: string;
    status: "Trống" | "Đã thuê";
}

export interface Contract {
    _id: string;
    tenantName: string;
    startDate: string;
    endDate: string;
}

export interface Room {
    _id: string;
    name: string;
    house: string;
    type: string;
    status: "Trống" | "Đã thuê";
    beds?: Bed[];
    currentContract?: Contract;
}

export const getRooms = async () => {
    const response = await API.get("/api/rooms");
    return response.data;
};

export const getRoomById = async (roomId: string) => {
    const response = await API.get<Room>(`/api/rooms/${roomId}`);
    return response.data;
};