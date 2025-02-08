import { useState, useEffect } from "react";
import { getTasks, Task } from "../../services/taskService";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | "ALL">("ALL");
  const [assignedFilter, setAssignedFilter] = useState<string | "ALL">("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
        setFilteredTasks(data); // Khởi tạo bộ lọc với toàn bộ dữ liệu
      } catch (err) {
        setError("Không thể tải danh sách nhiệm vụ.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Hàm lọc nhiệm vụ
  useEffect(() => {
    let filtered = tasks;

    if (statusFilter === "ALL") {
      // Chỉ lấy nhiệm vụ chưa hoàn thành và không bị hủy
      filtered = filtered.filter((task) => task.status !== "CANCELED");
    } else {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    if (assignedFilter !== "ALL") {
      filtered = filtered.filter((task) => task.assignedTo?._id === assignedFilter);
    }

    // Sắp xếp thứ tự hiển thị
    const sortOrder: Record<string, number> = {
      PENDING: 1,
      ASSIGNED: 2,
      IN_PROGRESS: 3,
      COMPLETED: 4,
    };

    filtered.sort((a, b) => sortOrder[a.status] - sortOrder[b.status]);

    setFilteredTasks(filtered);
  }, [statusFilter, assignedFilter, tasks]);

  if (loading) return <p>Đang tải danh sách nhiệm vụ...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh Sách Nhiệm Vụ</h2>

      {/* Bộ lọc */}
      <div className="flex gap-4 mb-4">
        <select
          className="p-2 border rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">Nhiệm vụ</option> {/* Đổi nhãn thành Nhiệm vụ còn lại */}
          <option value="PENDING">Chưa nhận</option>
          <option value="ASSIGNED">Đã nhận</option>
          <option value="IN_PROGRESS">Đang làm</option>
          <option value="COMPLETED">Đã xong</option>
          <option value="CANCELED">Đã hủy</option>
        </select>


        <select
          className="p-2 border rounded"
          value={assignedFilter}
          onChange={(e) => setAssignedFilter(e.target.value)}
        >
          <option value="ALL">Tất cả nhân viên</option>
          {Array.from(
            new Map(
              tasks
                .filter((task) => task.assignedTo !== null)
                .map((task) => [task.assignedTo?._id, task.assignedTo]) // Dùng Map để loại trùng
            ).values()
          )
            .filter(Boolean) // Loại bỏ null/undefined trước khi map
            .map((employee) => (
              <option key={employee?._id} value={employee?._id}>
                {employee?.name}
              </option>
            ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
