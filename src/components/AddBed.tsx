import { useState } from "react";
import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react"; // Import icon cảnh báo & thành công
import { getHouseRooms, House, Room } from "../../services/api"; // API lấy danh sách phòng
import { addBed, addBedOfHouse, BedInput, BedOfHouseInput } from "../../services/bedService";

interface AddBedProps {
  houses: House[];
}

const AddBed: React.FC<AddBedProps> = ({ houses }) => {
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null); // Nhà được chọn
  const [rooms, setRooms] = useState<Room[]>([]); // Danh sách phòng
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null); // Phòng được chọn
  const [bedName, setBedName] = useState(""); // Dữ liệu form nhập giường
  const [error, setError] = useState<string | null>(null); // Lưu thông báo lỗi
  const [success, setSuccess] = useState<string | null>(null); // Lưu thông báo thành công

  // Khi chọn nhà, nếu là nhà thường thì lấy danh sách phòng
  const handleSelectHouse = async (house: House) => {
    setSelectedHouse(house);
    setSelectedRoom(null); // Reset phòng khi chọn lại nhà
    setBedName(""); // Reset tên giường khi đổi nhà
    setError(null); // Xóa lỗi cũ nếu có
    setSuccess(null); // Xóa thông báo thành công nếu có

    if (house.type === "Thường") {
      try {
        const roomsData = await getHouseRooms(house._id); // Gọi API lấy danh sách phòng
        setRooms(roomsData);
      } catch (error) {
        console.error("❌ Lỗi lấy danh sách phòng:", error);
        setError("Không thể tải danh sách phòng.");
      }
    }
  };

  // Khi bấm "Thêm", kiểm tra đầu vào trước khi gửi
  const handleAddBed = async () => {
    if (!selectedHouse) {
      setError("Vui lòng chọn nhà trước khi thêm giường.");
      return;
    }

    if (selectedHouse.type === "Thường" && !selectedRoom) {
      setError("Vui lòng chọn phòng trước khi thêm giường.");
      return;
    }

    if (!bedName.trim()) {
      setError("Tên giường không được để trống.");
      return;
    }

    setError(null); // Xóa lỗi nếu dữ liệu hợp lệ

    try {
      let success = false;

      if (selectedHouse.type === "Thường") {
        // Sử dụng biến trung gian thay vì setState ngay
        const tempBedInput: BedInput = { name: bedName, status: "Trống", roomId: selectedRoom!._id };
        success = await addBed(tempBedInput);
      } else {
        // Sử dụng biến trung gian cho nhà KTX
        const tempBedOfHouseInput: BedOfHouseInput = { name: bedName, status: "Trống", houseId: selectedHouse._id };
        console.log(tempBedOfHouseInput); // Kiểm tra dữ liệu trước khi gửi API
        success = await addBedOfHouse(tempBedOfHouseInput, selectedHouse._id);
      }

      if (success) {
        console.log(`🛏️ ${bedName} Thêm thành công`);
        setSuccess(`🛏️ ${bedName} được thêm thành công!`);
        setBedName(""); // Làm mới form nhập giường
      } else {
        throw new Error(`Không thể thêm giường ${bedName}, vui lòng thử lại.`);
      }
    } catch (error) {
      console.error(`❌ Lỗi khi thêm giường ${bedName}:`, error);
      setError(`Không thể thêm giường ${bedName}, vui lòng thử lại.`);
    }
  };



  return (
    <div>
      <h2 className="text-lg font-bold">Thêm Giường 🛏️</h2>

      {/* Hiển thị lỗi nếu có */}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-3 flex items-center">
          <AlertTriangle size={18} className="mr-2" />
          <span>{error}</span>
        </div>
      )}

      {/* Hiển thị thông báo thành công */}
      {success && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-3 flex items-center">
          <CheckCircle size={18} className="mr-2" />
          <span>{success}</span>
        </div>
      )}

      {/* Chọn nhà trước */}
      {!selectedHouse ? (
        <div>
          <p className="text-gray-600 mb-2">Chọn nhà để thêm giường:</p>
          <div className="max-h-40 overflow-y-auto border rounded">
            {houses.length === 0 ? (
              <p className="text-red-500 p-3"> Hiện tại chưa có nhà nào trong hệ thống, vui lòng thêm nhà trước!</p>
            ) : (
              <div>
                {houses.map((house) => (
                  <button key={house._id} onClick={() => handleSelectHouse(house)}
                    className="block w-full text-left p-2 border-b hover:bg-gray-200">
                    {house.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : selectedHouse.type === "Thường" && !selectedRoom ? (
        <div>
          {/* Nút quay lại chọn nhà */}
          <div className="flex items-center mb-2">
            <button onClick={() => setSelectedHouse(null)} className="p-2 hover:bg-gray-200 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <p className="text-gray-700 ml-2">Nhà: <strong>{selectedHouse.name}</strong></p>
          </div>

          {/* Chọn phòng để thêm giường */}
          <p className="text-gray-600 mb-2">Chọn phòng để thêm giường:</p>
          <div className="max-h-40 overflow-y-auto border rounded">
            {rooms.length === 0 ? (
              <p className="text-red-500 p-3"> Hiện tại nhà này chưa có phòng nào, vui lòng thêm phòng trước!</p>
            ) : (
              <div>
                {rooms.map((room) => (
                  <button key={room._id} onClick={() => setSelectedRoom(room)}
                    className="block w-full text-left p-2 border-b hover:bg-gray-200">
                    {room.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* Nút quay lại chọn phòng */}
          <div className="flex items-center mb-2">
            <button onClick={() => setSelectedRoom(null)} className="p-2 hover:bg-gray-200 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <p className="text-gray-700 ml-2">Nhà: <strong>{selectedHouse.name}</strong></p>
            {selectedRoom && <p className="text-gray-700 ml-2">Phòng: <strong>{selectedRoom.name}</strong></p>}
          </div>

          {/* Nhập thông tin giường */}
          <input type="text" placeholder="Tên giường"
            className="w-full p-2 border rounded mt-2"
            value={bedName}
            onChange={(e) => setBedName(e.target.value)}
          />

          {/* Nút Thêm */}
          <button onClick={handleAddBed} className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
            Thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBed;
