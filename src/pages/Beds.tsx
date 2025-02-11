import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { getRoomBeds, Bed } from "../../services/bedService";

const Beds = () => {
  const { roomId } = useParams(); // Lấy ID phòng từ URL
  const navigate = useNavigate(); // Dùng để điều hướng khi bấm vào giường
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

  const handleViewBedDetail = (bedId: string) => {
    navigate(`/beds/${bedId}`); // Chuyển đến trang chi tiết giường
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Danh sách giường & box</h1>

      {beds.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {beds.map((bed) => (
            <div
              key={bed._id}
              className="bg-white p-4 shadow-lg rounded-lg border border-gray-200 cursor-pointer hover:shadow-xl transition"
              onClick={() => handleViewBedDetail(bed._id)} // Xử lý sự kiện khi bấm vào giường
            >
              <h2 className="text-lg font-semibold">{bed.name}</h2>
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
