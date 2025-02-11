import { useState } from "react";
import { AlertTriangle } from "lucide-react"; // Import icon cảnh báo
import { addHouse, HouseInput } from "../../services/api"; // Import service và kiểu House

const AddHouse = () => {
  const [formData, setFormData] = useState({
    houseName: "",
    houseAddress: "",
    houseType: "Thường", // Mặc định là "Nhà thường"
  });

  const [error, setError] = useState<string | null>(null); // Lưu thông báo lỗi
  const [success, setSuccess] = useState<string | null>(null); // Lưu thông báo thành công

  const handleAddHouse = async () => {
    if (!formData.houseName.trim()) {
      setError("Tên nhà không được để trống.");
      return;
    }
    if (!formData.houseAddress.trim()) {
      setError("Địa chỉ không được để trống.");
      return;
    }

    setError(null); // Xóa lỗi nếu dữ liệu hợp lệ

    try {
      // Khai báo đối tượng house với các thuộc tính cần thiết
      const house: HouseInput = {
        name: formData.houseName,
        address: formData.houseAddress,
        type: formData.houseType, // Sử dụng giá trị từ radio button
      };

      const response = await addHouse(house);

      if (!response) throw new Error("Không thể thêm nhà, vui lòng thử lại.");

      console.log("🏠 Thêm nhà thành công");
      setSuccess("🏠 Nhà đã được thêm thành công!");
      setFormData({ houseName: "", houseAddress: "", houseType: "Thường" }); // Reset form
    } catch (error) {
      console.error("❌ Lỗi khi thêm nhà:", error);
      setError("Không thể thêm nhà, vui lòng thử lại.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Thêm Nhà 🏠</h2>

      {/* Hiển thị lỗi nếu có */}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-3 flex items-center">
          <AlertTriangle size={18} className="mr-2" />
          <span>{error}</span>
        </div>
      )}

      {/* Hiển thị thông báo thành công nếu có */}
      {success && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-3">
          {success}
        </div>
      )}

      {/* Form nhập thông tin nhà */}
      <input
        type="text"
        placeholder="Tên nhà trọ"
        className="w-full p-2 border rounded mt-2"
        value={formData.houseName}
        onChange={(e) => setFormData({ ...formData, houseName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Địa chỉ"
        className="w-full p-2 border rounded mt-2"
        value={formData.houseAddress}
        onChange={(e) => setFormData({ ...formData, houseAddress: e.target.value })}
      />

      {/* Radio Button Chọn Loại Nhà */}
      <div className="mt-3">
        <p className="font-medium text-gray-700">Loại nhà:</p>
        <div className="flex flex-col space-y-2 mt-1">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="houseType"
              value="Thường"
              checked={formData.houseType === "Thường"}
              onChange={(e) => setFormData({ ...formData, houseType: e.target.value })}
              className="hidden"
            />
            <div
              className={`w-5 h-5 rounded-full border-2 ${formData.houseType === "Thường" ? "bg-blue-500 border-blue-500" : "border-gray-400"}`}
            ></div>
            <span className="text-gray-700">Nhà trọ thường</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="houseType"
              value="Ký túc xá"
              checked={formData.houseType === "Ký túc xá"}
              onChange={(e) => setFormData({ ...formData, houseType: e.target.value })}
              className="hidden"
            />
            <div
              className={`w-5 h-5 rounded-full border-2 ${formData.houseType === "Ký túc xá" ? "bg-blue-500 border-blue-500" : "border-gray-400"}`}
            ></div>
            <span className="text-gray-700">Ký túc xá</span>
          </label>
        </div>
      </div>

      {/* Nút Thêm */}
      <button
        onClick={handleAddHouse}
        className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Thêm
      </button>
    </div>
  );
};

export default AddHouse;
