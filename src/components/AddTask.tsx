import { useState } from "react";
import { createTask, TaskInput } from "../../services/taskService";

interface AddTaskProps {
    onTaskCreated: () => void; // Callback để cập nhật danh sách nhiệm vụ
}

const AddTask: React.FC<AddTaskProps> = ({ onTaskCreated }) => {
    const [formData, setFormData] = useState<TaskInput>({
        description: "",
        priority: "MEDIUM",
        assignedTo: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const success = await createTask(formData);
        if (success) {
            setFormData({ description: "", priority: "MEDIUM", assignedTo: null });
            setSuccess("✅ Nhiệm vụ đã được tạo thành công!");
            onTaskCreated(); // Cập nhật danh sách nhiệm vụ sau khi tạo
        } else {
            setError("❌ Không thể tạo nhiệm vụ. Vui lòng thử lại.");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                Tạo Nhiệm Vụ Mới 📋
            </h2>

            {/* Hiển thị thông báo lỗi hoặc thành công */}
            {error && (
                <p className="text-red-500 bg-red-100 p-2 rounded flex items-center gap-2">
                    ⚠️ {error}
                </p>
            )}
            {success && (
                <p className="text-green-500 bg-green-100 p-2 rounded flex items-center gap-2">
                    🔄 {success}
                </p>
            )}

            <label className="block mb-3">
                <label className="block mb-3">
                    <span className="flex items-center gap-2">
                        📋 Mô tả nhiệm vụ:
                    </span>
                    <textarea
                        className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-400 resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3} // Chiều cao mặc định là 3 dòng
                        required
                    />
                </label>

            </label>

            <label className="block mb-3">
                <span className="flex items-center gap-2">
                    🚩 Mức độ ưu tiên:
                </span>
                <select
                    className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-yellow-400"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskInput["priority"] })}
                >
                    <option value="LOW">🟢 Thấp</option>
                    <option value="MEDIUM">🟡 Trung bình</option>
                    <option value="HIGH">🟠 Cao</option>
                </select>
            </label>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full flex items-center justify-center gap-2 disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "🔄" : "➕ Tạo Nhiệm Vụ"}
            </button>
        </form>
    );
};

export default AddTask;
