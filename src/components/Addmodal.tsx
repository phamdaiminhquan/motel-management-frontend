import { useState, useEffect } from "react";
import { X, Home, Bed, DoorOpen, ClipboardList } from "lucide-react";
import { getHouses, House } from "../../services/api";
import AddHouse from "./AddHouse";
import AddRoom from "./AddRoom";
import AddBed from "./AddBed";
import AddTask from "./AddTask";

const AddModal = ({ onClose }: { onClose: () => void }) => {
  const [tab, setTab] = useState(0);
  const [houses, setHouses] = useState<House[]>([]);

  useEffect(() => {
    const fetchHouses = async () => {
      const data = await getHouses();
      setHouses(data);
    };
    fetchHouses();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 max-w-lg p-5 rounded-lg shadow-lg relative">
        {/* Nút Tắt */}
        <button onClick={onClose} className="absolute top-2 left-2 p-2 hover:bg-gray-200 rounded-full">
          <X size={20} />
        </button>

        {/* Tabs Chuyển Đổi */}
        <div className="flex justify-center space-x-4 mb-4">
        <button className={`p-2 rounded ${tab === 0 ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`} onClick={() => setTab(0)}>
            <ClipboardList size={20} />
          </button>
          <button className={`p-2 rounded ${tab === 1 ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`} onClick={() => setTab(1)}>
            <Home size={20} />
          </button>
          <button className={`p-2 rounded ${tab === 2 ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`} onClick={() => setTab(2)}>
            <DoorOpen size={20} />
          </button>
          <button className={`p-2 rounded ${tab === 3 ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`} onClick={() => setTab(3)}>
            <Bed size={20} />
          </button>
        </div>

        {/* Nội dung theo từng tab */}
        {tab === 0 && <AddTask onTaskCreated={() => alert("Nhiệm vụ đã được tạo!")} />}
        {tab === 1 && <AddHouse />}
        {tab === 2 && <AddRoom houses={houses} />}
        {tab === 3 && <AddBed houses={houses} />}
      </div>
    </div>
  );
};

export default AddModal;
