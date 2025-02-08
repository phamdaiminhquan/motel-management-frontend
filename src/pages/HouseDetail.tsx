import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHouseRooms, Room } from "../../services/api";

const HouseDetail = () => {
  const { houseId } = useParams(); // Lấy ID nhà từ URL
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      if (houseId) {
        const data = await getHouseRooms(houseId);
        setRooms(data);
      }
    };
    fetchRooms();
  }, [houseId]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Danh sách phòng</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white p-4 shadow-lg rounded-lg cursor-pointer hover:bg-gray-100 transition"
            onClick={() =>
              room.type === "Phòng riêng"
                ? navigate(`/roomDetail/${room._id}`)
                : navigate(`/room/${room._id}/beds`)
            }
          >
            <h2 className="text-xl font-semibold">{room.name}</h2>
            <p className="text-gray-600">Loại: {room.type}</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-white mt-2 ${
                room.status === "Trống" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {room.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HouseDetail;
