import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHouseInfo, House } from "../../services/api";
import DropdownMenu from '../components/DropdownMenu';

const HouseInfo = () => {
  const { houseId } = useParams();
  const [house, setHouse] = useState<House | null>(null);

  useEffect(() => {
    const fetchHouse = async () => {
      if (houseId) {
        const data = await getHouseInfo(houseId);
        setHouse(data);
      }
    };
    fetchHouse();
  }, [houseId]);

  if (!house) return <p>Đang tải...</p>;

  return (
    // Áp dụng relative cho container để các phần tử con định vị theo container này
    <div className="relative p-5">
      {/* DropdownMenu sẽ được định vị ở góc phải trên cùng */}
      <DropdownMenu />

      <h1 className="text-2xl font-bold text-gray-800 mb-4">{house.name}</h1>
      <p className="text-gray-600">📍 Địa chỉ: {house.address}</p>
      <p className="text-gray-600">📋 Trạng thái: {house.status}</p>
      <p className="text-gray-600">📅 Thời gian tạo: {house.createdAt}</p>
      <p className="text-gray-600">📅 Thời gian cập nhật: {house.updatedAt}</p>
    </div>
  );
};

export default HouseInfo;
