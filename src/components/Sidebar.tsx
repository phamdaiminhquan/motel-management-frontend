import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaBuilding, FaFileContract, FaUserTie, FaBars, FaSignOutAlt } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth(); // Lấy hàm logout từ context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Chuyển về trang đăng nhập sau khi đăng xuất
  };

  return (
    <>
      {/* Nút Hamburger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-3 bg-white shadow-md rounded-full text-black"
      >
        <FaBars size={24} />
      </button>

      {/* Nút Quay lại */}
      <button
        className="fixed top-4 left-20 z-50 p-3 bg-white shadow-md rounded-full text-black"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={24} className="text-gray-600" />
      </button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white text-black shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-bold">Quản lý</span>
        </div>

        {/* Menu */}
        <nav className="mt-5">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-200 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <TbLayoutDashboardFilled className="text-lg" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/houses"
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-200 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <FaBuilding className="text-lg" />
                <span>Nhà trọ</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/rooms"
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-200 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <FaHome className="text-lg" />
                <span>Phòng trọ</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contracts"
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-200 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <FaFileContract className="text-lg" />
                <span>Hợp đồng</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/staff"
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-200 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <FaUserTie className="text-lg" />
                <span>Nhân viên</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Nút Đăng Xuất */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 flex items-center justify-center space-x-3 mt-4"
        >
          <FaSignOutAlt />
          <span>Đăng Xuất</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
