import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHouseBeds, Bed } from "../../services/bedService"; // API lấy giường theo nhà
import { getHouseDetail } from "../../services/houseService"; // API lấy thông tin nhà

const HouseBeds = () => {
  const { houseId } = useParams(); // Lấy ID nhà từ URL
  const navigate = useNavigate();
  const [beds, setBeds] = useState<Bed[]>([]);
  const [house, setHouse] = useState<{ name: string; address: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!houseId) return;
      try {
        const [houseData, bedsData] = await Promise.all([
          getHouseDetail(houseId), // Lấy thông tin nhà
          getHouseBeds(houseId) // Lấy danh sách giường
        ]);
        setHouse(houseData);
        setBeds(bedsData);
      } catch (err) {
        setError("Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [houseId]);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-5">
      {/* Thông tin nhà */}
      {house && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-gray-800">{house.name}</h1>
          <p className="text-gray-600">{house.address}</p>
        </div>
      )}

      <h2 className="text-xl font-bold text-gray-800 mb-4">Danh Sách Giường</h2>

      {beds.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {beds.map((bed) => (
            <div
              key={bed._id}
              className="bg-white p-4 shadow-lg rounded-lg cursor-pointer hover:bg-gray-100 transition"
              onClick={() => navigate(`/beds/${bed._id}`)} // Điều hướng đến chi tiết giường
            >
              <h3 className="text-lg font-semibold">{bed.name}</h3>
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

export default HouseBeds;
