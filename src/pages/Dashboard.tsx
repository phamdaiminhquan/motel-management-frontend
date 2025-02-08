import { useState } from "react";

const Dashboard = () => {
  // Dữ liệu giả lập về nhà trọ
  const [stats] = useState({
    houses: 5,
    rooms: 50,
    availableRooms: 20,
    contracts: 35,
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>

      {/* Cards hiển thị thông tin tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 shadow-md rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold">🏠 Số nhà trọ</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.houses}</p>
        </div>
        <div className="bg-white p-5 shadow-md rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold">🛏️ Số phòng</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.rooms}</p>
        </div>
        <div className="bg-white p-5 shadow-md rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold">✅ Phòng trống</h3>
          <p className="text-3xl font-bold text-green-500">{stats.availableRooms}</p>
        </div>
        <div className="bg-white p-5 shadow-md rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold">📄 Hợp đồng đang hoạt động</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.contracts}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
