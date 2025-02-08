import { useState } from "react";
import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react"; // Import icon cảnh báo & thành công

interface AddRoomProps {
  houses: { _id: string; name: string }[];
}

const AddRoom: React.FC<AddRoomProps> = ({ houses }) => {
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);
  const [formData, setFormData] = useState({ roomName: "", roomPrice: "" });
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
      const response = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, houseId: selectedHouse }),
      });

      if (!response.ok) throw new Error("Không thể thêm phòng, vui lòng thử lại.");

      console.log("🚪 Thêm phòng thành công");
      setSuccess("🚪 Phòng đã được thêm thành công!");
      setFormData({ roomName: "", roomPrice: "" }); // Reset form
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
