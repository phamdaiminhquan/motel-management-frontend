import { useState } from "react";
import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react"; // Import icon cảnh báo & thành công
import { addRoom, roomInput } from "../../services/roomService";

interface AddRoomProps {
  houses: { _id: string; name: string }[];
}

const AddRoom: React.FC<AddRoomProps> = ({ houses }) => {
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);
  const [formData, setFormData] = useState({ roomName: "", roomPrice: "", roomType: "Phòng riêng" });
  const [error, setError] = useState<string | null>(null); // Lưu thông báo lỗi
  const [success, setSuccess] = useState<string | null>(null); // Lưu thông báo thành công

  const handleAddRoom = async () => {
    if (!selectedHouse) {
      setError("Vui lòng chọn nhà trước khi thêm phòng.");
      return;
    }
    if (!formData.roomName.trim()) {
      setError("Tên phòng không được để trống.");
      return;
    }
    if (!formData.roomPrice.trim() || isNaN(Number(formData.roomPrice))) {
      setError("Giá phòng phải là một số hợp lệ.");
      return;
    }

    setError(null); // Xóa lỗi nếu dữ liệu hợp lệ

    try {
      const tempRoomInput: roomInput = { name: formData.roomName, price: Number(formData.roomPrice), type: formData.roomType };
      const response = await addRoom(tempRoomInput, selectedHouse);

      if (!response) throw new Error("Không thể thêm phòng, vui lòng thử lại.");

      console.log("🚪 Thêm phòng thành công");
      setSuccess("🚪 Phòng đã được thêm thành công!");
      setFormData({ roomName: "", roomPrice: "" , roomType: "Phòng riêng" }); // Reset form
    } catch (error) {
      console.error("❌ Lỗi khi thêm phòng:", error);
      setError("Không thể thêm phòng, vui lòng thử lại.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Thêm Phòng 🚪</h2>

      {/* Hiển thị lỗi nếu có */}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-3 flex items-center">
          <AlertTriangle size={18} className="mr-2" />
          <span>{error}</span>
        </div>
      )}

      {/* Hiển thị thông báo thành công nếu có */}
      {success && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-3 flex items-center">
          <CheckCircle size={18} className="mr-2" />
          <span>{success}</span>
        </div>
      )}

      {/* Chọn nhà trước */}
      {!selectedHouse ? (
        <div>
          <p className="text-gray-600 mb-2">Chọn nhà để thêm phòng:</p>
          <div className="max-h-40 overflow-y-auto border rounded">
            {houses.length === 0 ? (
              <p className="text-red-500 p-3">Hiện tại chưa có nhà nào trong hệ thống, vui lòng thêm nhà trước!</p>
            ) : (
              <div>
                {houses.map((house) => (
                  <button
                    key={house._id}
                    onClick={() => setSelectedHouse(house._id)}
                    className="block w-full text-left p-2 border-b hover:bg-gray-200"
                  >
                    {house.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* Nút quay lại chọn nhà */}
          <div className="flex items-center mb-2">
            <button onClick={() => setSelectedHouse(null)} className="p-2 hover:bg-gray-200 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <p className="text-gray-700 ml-2">
              Đang tạo phòng cho: <strong>{houses.find((house) => house._id === selectedHouse)?.name}</strong>
            </p>
          </div>

          {/* Nhập thông tin phòng */}
          <input
            type="text"
            placeholder="Tên phòng"
            className="w-full p-2 border rounded mt-2"
            value={formData.roomName}
            onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
          />

          {/* Radio Button Chọn Loại Phòng */}
          <div className="mt-3">
            <p className="font-medium text-gray-700">Loại Phòng:</p>
            <div className="flex flex-col space-y-2 mt-1">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="roomType"
                  value="Phòng riêng"
                  checked={formData.roomType === "Phòng riêng"}
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 ${formData.roomType === "Phòng riêng" ? "bg-blue-500 border-blue-500" : "border-gray-400"}`}
                ></div>
                <span className="text-gray-700">Phòng riêng</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="roomType"
                  value="Phòng giường"
                  checked={formData.roomType === "Phòng giường"}
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 ${formData.roomType === "Phòng giường" ? "bg-blue-500 border-blue-500" : "border-gray-400"}`}
                ></div>
                <span className="text-gray-700">Phòng giường</span>
              </label>
            </div>
          </div>
          {/* Input Giá Phòng */}
          <input
            type="number"
            placeholder="Giá thuê"
            className="w-full p-2 border rounded mt-2"
            value={formData.roomPrice}
            onChange={(e) => setFormData({ ...formData, roomPrice: e.target.value })}
          />

          {/* Nút Thêm */}
          <button onClick={handleAddRoom} className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
            Thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default AddRoom;
