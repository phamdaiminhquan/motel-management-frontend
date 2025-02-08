import { useState, useEffect } from "react";
import { getHouses, House } from "../../services/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Houses = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const navigate = useNavigate(); // Hook để chuyển trang

  useEffect(() => {
    const fetchHouses = async () => {
      const data = await getHouses();
      setHouses(data);
    };
    fetchHouses();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Danh sách nhà trọ</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {houses.map((house) => (
          <div
            key={house._id}
            className="relative bg-white p-4 shadow-lg rounded-lg cursor-pointer transition hover:scale-105"
            onClick={() => navigate(`/houseDetail/${house._id}`)} // Chuyển đến danh sách phòng
          >
            {/* Nút Thông tin */}
            <button
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 p-1 rounded-full"
              onClick={(e) => {
                e.stopPropagation(); // Ngăn chặn sự kiện click vào cả thẻ nhà
                navigate(`/houseInfo/${house._id}`);
              }}
            >
              ℹ️
            </button>

            <h2 className="text-xl font-semibold">{house.name}</h2>
            <p className="text-gray-600">{house.address}</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-white mt-2 ${house.status === "Còn phòng" ? "bg-green-500" : "bg-red-500"
                }`}
            >
              {house.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Houses;
