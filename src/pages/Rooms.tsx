import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRooms, Room } from "../../services/api";

const Rooms= () => {
  const navigate = useNavigate(); // Hook để chuyển trang
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getRooms();
      setRooms(data);
    };
    fetchRooms();
  }, []);

  const handleRoomClick = (room: Room) => {
    if (room.type === "Phòng riêng") {
      navigate(`/roomDetail/${room._id}`); // Nếu là phòng riêng, chuyển đến trang RoomDetail
    } else if (room.type === "Phòng giường") {
      navigate(`/beds/${room._id}`); // Nếu là phòng giường, chuyển đến trang Beds
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Danh sách phòng</h1>

      {rooms.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white p-4 shadow-lg rounded-lg border border-gray-200 cursor-pointer hover:scale-105 transition"
              onClick={() => handleRoomClick(room)} // Chuyển trang khi bấm vào phòng
            >
              <h2 className="text-lg font-semibold">{room.name}</h2>
              <p className="text-gray-600">{room.type}</p>
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
      ) : (
        <p className="text-gray-500">Không có phòng nào.</p>
      )}
    </div>
  );
};

export default Rooms;
