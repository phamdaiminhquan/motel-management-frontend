import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Suspense, lazy } from "react";

// ✅ Lazy Load Sidebar & BottomNav
const Sidebar = lazy(() => import("./components/Sidebar"));
const BottomNav = lazy(() => import("./components/BottomNav"));
const LoadingScreen = lazy(() => import("./components/LoadingScreen"));

// ✅ Lazy Load các Trang Chính
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Houses = lazy(() => import("./pages/Houses"));
const Rooms = lazy(() => import("./pages/Rooms"));
const Beds = lazy(() => import("./pages/Beds"));
const HouseDetail = lazy(() => import("./pages/HouseDetail"));
const HouseInfo = lazy(() => import("./pages/HouseInfo"));
const Tasks = lazy(() => import("./pages/Tasks"));
const RoomDetail = lazy(() => import("./pages/RoomDetail"));
const BedDetail = lazy(() => import("./pages/BedDetail"));
const HouseBeds = lazy(() => import("./pages/HouseBeds"));

function ProtectedLayout() {
  const { token } = useAuth();
  const location = useLocation();

  console.log("token", token);
  if (!token || token === "null" || token === "undefined") {
    return <Navigate to="/login" replace />;
  }

  // ✅ Ẩn Sidebar & BottomNav khi ở trang login hoặc register
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex h-screen">
      {!hideLayout && (
        <Suspense>
          <Sidebar />
        </Suspense>
      )}
      <div className="flex-1 flex flex-col">
        <div className="px-10 py-16 flex-1">
          <Suspense fallback={<LoadingScreen />}>
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
            </Routes>
          </Suspense>
        </div>
        {!hideLayout && (
          <Suspense>
            <BottomNav />
          </Suspense>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<ProtectedLayout />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
