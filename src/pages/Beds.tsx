import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRoomBeds, Bed } from "../../services/api";

const Beds = () => {
  const { roomId } = useParams(); // Lấy ID phòng từ URL
  const [beds, setBeds] = useState<Bed[]>([]);

  useEffect(() => {
    const fetchBeds = async () => {
      if (roomId) {
        const data = await getRoomBeds(roomId);
        setBeds(data);
      }
    };
    fetchBeds();
  }, [roomId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Danh sách giường</h1>

      {beds.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {beds.map((bed) => (
            <div
              key={bed._id}
              className="bg-white p-4 shadow-lg rounded-lg border border-gray-200"
            >
              <h2 className="text-lg font-semibold">Giường {bed.name}</h2>
              <span
                className={`inline-block px-3 py-1 rounded-full text-white mt-2 ${
                  bed.status === "Trống" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {bed.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Không có giường nào.</p>
      )}
    </div>
  );
};

export default Beds;
