import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav"; // Import Bottom Navigation

import Dashboard from "./pages/Dashboard";
import Houses from "./pages/Houses";
import Rooms from "./pages/Rooms";
import Beds from "./pages/Beds";
import HouseDetail from "./pages/HouseDetail";
import HouseInfo from "./pages/HouseInfo";
import Tasks from "./pages/Tasks";
import RoomDetail from "./pages/RoomDetail";
import BedDetail from "./pages/BedDetail";
import HouseBeds from "./pages/HouseBeds";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar /> {/* Sidebar có chiều rộng cố định */}
        <div className="flex-1 flex flex-col">
          <div className="px-10 py-16 flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/houses" element={<Houses />} />
              <Route path="/houses/:houseId/beds" element={<HouseBeds />} />

              <Route path="/houseDetail/:houseId" element={<HouseDetail />} />
              <Route path="/houseInfo/:houseId" element={<HouseInfo />} />

              <Route path="/rooms" element={<Rooms />} />
              <Route path="/roomDetail/:roomId" element={<RoomDetail />} />
              <Route path="/rooms/:roomId/beds" element={<Beds />} />

              <Route path="/beds/:bedId" element={<BedDetail />} />

              <Route path="/tasks" element={<Tasks />} />

              <Route path="/contracts" element={<h2 className="text-2xl">Trang Hợp đồng</h2>} />
              <Route path="/staff" element={<h2 className="text-2xl">Trang Nhân viên</h2>} />
            </Routes>
          </div>
          <BottomNav /> {/* Luôn hiển thị thanh điều hướng */}
        </div>
      </div>
    </Router>
  );
}

export default App;
