import { LayoutDashboard, Home, ClipboardCheck, UserRoundPen, Plus } from "lucide-react"; // Import icon từ lucide-react
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import AddModal from "./Addmodal.tsx"; // Import Popup nhập dữ liệu

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false); // State để mở/đóng popup

  // Ẩn thanh điều hướng nếu đang ở trang đăng nhập
  if (location.pathname === "/login") return null;

  return (
    <>
      {/* Popup nhập dữ liệu */}
      {isModalOpen && <AddModal onClose={() => setIsModalOpen(false)} />} 

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around p-2 border-t">
        <button onClick={() => navigate("/")} className="p-2 hover:text-blue-500">
          <LayoutDashboard size={24} />
        </button>

        <button onClick={() => navigate("/tasks")} className="p-2 hover:text-blue-500">
          <ClipboardCheck size={24}/>
        </button>

        {/* Nút Thêm ➕ mở Popup */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          <Plus size={28} />
        </button>

        <button onClick={() => navigate("/houses")} className="p-2 hover:text-blue-500">
          <Home size={24} />
        </button>

        <button onClick={() => navigate("/settings")} className="p-2 hover:text-blue-500">
          <UserRoundPen size={24} />
        </button>
      </div>
    </>
  );
};

export default BottomNav;
