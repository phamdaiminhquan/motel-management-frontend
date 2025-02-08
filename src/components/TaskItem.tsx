import { useState } from "react";
import { Task, assignTask, startTask, completeTask, cancelTask } from "../../services/taskService";
import CancelModal from "./CancelModal";

import { Hourglass, Check, User, AlertTriangle, Flag, X, ClipboardList, PackagePlus, Play, Loader2, XCircle, MessageSquareX } from "lucide-react";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [currentTask, setCurrentTask] = useState<Task>(task);
  const [loading, setLoading] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenses, setExpenses] = useState<{ description: string; amount: number }[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleAction = async (action: "assign" | "start" | "complete" | "cancel") => {
    setLoading(true);
    let success = false;

    console.log("Hành động:", action);

    if (action === "complete") {
      console.log("Mở modal nhập chi tiêu...");
      setShowExpenseModal(true);
      setLoading(false);
      return;
    }

    if (action === "cancel") {
      setShowCancelModal(true);
      setLoading(false);
      return;
    }

    switch (action) {
      case "assign":
        success = await assignTask(currentTask._id, "67a321693625ea0f83528d70");
        if (success) {
          setCurrentTask({
            ...currentTask,
            status: "ASSIGNED",
            assignedTo: { _id: "67a321693625ea0f83528d70", name: "Nguyễn Văn A", email: "nguyenvana@example.com" }
          });
        }
        break;
      case "start":
        success = await startTask(currentTask._id);
        if (success) setCurrentTask({ ...currentTask, status: "IN_PROGRESS", startTime: new Date().toISOString() });
        break;
    }

    setLoading(false);
  };

  const handleSubmitExpense = async (hasExpense: boolean) => {
    setLoading(true);
    console.log("Gửi API hoàn tất nhiệm vụ:", { taskId: currentTask._id, expenses: hasExpense ? expenses : [] });

    const success = await completeTask(currentTask._id, hasExpense ? expenses : []);
    if (success) {
      setCurrentTask({ ...currentTask, status: "COMPLETED", completionTime: new Date().toISOString() });
      setShowExpenseModal(false);
    }
    setLoading(false);
  };

  const handleSubmitCancel = async (reason: string) => {
    if (!reason.trim()) return alert("Vui lòng nhập lý do hủy nhiệm vụ!");

    setLoading(true);
    const success = await cancelTask(currentTask._id, reason);
    if (success) {
      setCurrentTask({ ...currentTask, status: "CANCELED" });
      setShowCancelModal(false);
    }
    setLoading(false);
  };


  return (
    <>
      <div className="flex justify-between items-center p-4 border rounded-3xl rounded-r-none shadow-lg bg-gray-500 text-white relative">
        {/* Nội dung nhiệm vụ */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold break-all">{currentTask.description}</h3>

          {/* Trạng thái nhiệm vụ */}
          <>
            {currentTask.status === "COMPLETED" && (
              <p className="text-green-400 font-semibold">Hoàn thành</p>
            )}
            {currentTask.status === "CANCELED" && (
              <>
                <p className="text-red-400 font-semibold">Huỷ</p>
                {currentTask.cancelReason && (
                  <p className="text-gray-300 flex items-center gap-2">
                    <MessageSquareX size={16} className="text-blue-400" />Lý do hủy: <span className="font-bold">{currentTask.cancelReason}</span>
                  </p>
                )}
              </>
            )}
            {currentTask.status === "ASSIGNED" && (
              <p className="text-blue-400 font-semibold">Đã nhận</p>
            )}
            {currentTask.status === "IN_PROGRESS" && (
              <p className="text-yellow-400 font-semibold">Đang thực hiện</p>
            )}
          </>

          {/* Thông tin nhiệm vụ */}
          <>
            {currentTask.assignedTo ? (
              <p className="text-gray-300 flex items-center gap-2">
                <User size={16} className="text-blue-400" />Bởi: <span className="font-bold">{currentTask.assignedTo.name}</span>
              </p>
            ) : (
              <p className="text-red-400 flex items-center gap-2">
                <AlertTriangle size={16} className="text-red-400" /> Chưa có người nhận
              </p>
            )}
            <p className="text-gray-300 mt-1 flex items-center gap-2">
              <Flag className="text-yellow-500" size={18} /> Mức độ ưu tiên: <span className="font-bold">{currentTask.priority}</span>
            </p>
            {currentTask.startTime && (
              <p className="text-gray-400 flex items-center gap-2">
                <Hourglass size={16} className="text-yellow-400" /> Bắt đầu: {new Date(currentTask.startTime).toLocaleString()}
              </p>
            )}
            {currentTask.completionTime && (
              <p className="text-green-400 flex items-center gap-2">
                <Check size={16} className="text-green-400" /> Hoàn thành: {new Date(currentTask.completionTime).toLocaleString()}
              </p>
            )}
          </>

        </div>

        {/* Nút Hành Động */}
        <div className="flex flex-col items-center gap-2">
          {!currentTask.assignedTo && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full rounded-r-none hover:bg-blue-600 h-32 w-32 flex items-center justify-center"
              onClick={() => handleAction("assign")}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" size={32} /> : <PackagePlus size={32} />}
            </button>
          )}

          {currentTask.status === "ASSIGNED" && (
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded-full rounded-r-none hover:bg-yellow-600 h-16 w-32 flex items-center justify-center"
              onClick={() => handleAction("start")}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Play size={24} />}
            </button>
          )}

          {currentTask.status === "IN_PROGRESS" && (
            <button
              className="bg-green-600 text-white px-3 py-1 rounded-full rounded-r-none hover:bg-green-600 h-16 w-32 flex items-center justify-center"
              onClick={() => handleAction("complete")}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Check size={24} />}
            </button>
          )}

          {(currentTask.status === "ASSIGNED" || currentTask.status === "IN_PROGRESS") && (
            <button
              className="bg-red-600 text-white px-3 py-1 rounded-r-none rounded-full hover:bg-red-600 h-16 w-32 flex items-center justify-center"
              onClick={() => handleAction("cancel")}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <X size={24} />}
            </button>
          )}
        </div>

      </div>

      {/* Modal nhập chi phí */}
      {showExpenseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 max-w-md p-5 rounded-lg shadow-lg relative">
            <button onClick={() => setShowExpenseModal(false)} className="absolute top-2 right-2 p-2 hover:bg-gray-200 rounded-full">
              <XCircle size={20} className="text-red-500" />
            </button>

            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ClipboardList className="text-blue-500" size={24} /> Nhập Chi Tiêu Phát Sinh
            </h2>

            {expenses.map((expense, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input type="text" className="w-full p-2 border rounded" placeholder="Mô tả chi phí"
                  value={expense.description} onChange={(e) =>
                    setExpenses((prev) =>
                      prev.map((ex, i) => (i === index ? { ...ex, description: e.target.value } : ex))
                    )} />
                <input type="number" className="w-24 p-2 border rounded" placeholder="VNĐ"
                  value={expense.amount} onChange={(e) =>
                    setExpenses((prev) =>
                      prev.map((ex, i) => (i === index ? { ...ex, amount: Number(e.target.value) } : ex))
                    )} />
              </div>
            ))}

            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mb-4 w-full"
              onClick={() => setExpenses([...expenses, { description: "", amount: 0 }])}>
              ➕ Thêm khoản chi
            </button>

            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
              onClick={() => handleSubmitExpense(true)} disabled={loading}>
              {loading ? "⏳" : "✅ Gửi Chi Tiêu"}
            </button>
          </div>
        </div>
      )}

      {/* Modal nhập lý do hủy nhiệm vụ */}
      <CancelModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onSubmit={handleSubmitCancel}
        title="Nhập lý do hủy nhiệm vụ"
        placeholder="Vui lòng nhập lý do hủy nhiệm vụ này..."
      />

    </>
  );
};

export default TaskItem;
