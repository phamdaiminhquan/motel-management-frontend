import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Lấy URL từ .env
});

// Định nghĩa kiểu cho người được giao nhiệm vụ
export interface AssignedUser {
  _id: string;
  name: string;
  email: string;
}

// Cập nhật interface Task để phù hợp với dữ liệu trả về từ API
export interface Task {
  _id: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  assignedTo?: AssignedUser | null;
  status: "PENDING" | "ASSIGNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";
  startTime?: string | null;
  completionTime?: string | null;
  cancelReason?: string | null;
}

// Định nghĩa dữ liệu cần gửi khi tạo nhiệm vụ
export interface TaskInput {
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  assignedTo?: string | null;
}

// Gọi API để tạo nhiệm vụ mới
export const createTask = async (taskData: TaskInput): Promise<boolean> => {
  try {
    const response = await API.post("/api/tasks", taskData);
    return response.status === 201;
  } catch (error) {
    console.error("Lỗi khi tạo nhiệm vụ:", error);
    return false;
  }
};

// Hàm lấy danh sách nhiệm vụ
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await API.get<Task[]>("/api/tasks");
    console.log("Danh sách nhiệm vụ:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tải danh sách nhiệm vụ:", error);
    throw new Error("Không thể tải danh sách nhiệm vụ.");
  }
};

// Nhận nhiệm vụ (Assign Task)
export const assignTask = async (taskId: string, userId: string): Promise<boolean> => {
  try {
    const response = await API.patch(`/api/tasks/${taskId}/assign`, { assignedTo: userId });
    console.log("Nhận nhiệm vụ:", response.data);
    return response.status === 200;
  } catch (error) {
    console.error("Lỗi khi nhận nhiệm vụ:", error);
    return false;
  }
};

// Bắt đầu nhiệm vụ
export const startTask = async (taskId: string): Promise<boolean> => {
  try {
    const response = await API.patch(`/api/tasks/${taskId}/start`);
    return response.status === 200;
  } catch (error) {
    console.error("Lỗi khi bắt đầu nhiệm vụ:", error);
    return false;
  }
};

// Hoàn tất nhiệm vụ
export const completeTask = async (taskId: string, expenses: { description: string; amount: number }[] = []) => {
  try {
    const response = await API.patch(`/api/tasks/${taskId}/complete`, {
      costIncurred: expenses.length > 0, // true nếu có chi tiêu
      expenses,
    });
    return response.status === 200;
  } catch (error) {
    console.error("Lỗi khi hoàn tất nhiệm vụ:", error);
    return false;
  }
};

// Hủy nhiệm vụ
export const cancelTask = async (taskId: string, reason: string) => {
  try {
    const response = await API.patch(`/api/tasks/${taskId}/cancel`, { reason });
    return response.status === 200;
  } catch (error) {
    console.error("Lỗi khi hủy nhiệm vụ:", error);
    return false;
  }
};

