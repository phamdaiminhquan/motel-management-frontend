import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBedDetail, deleteBed, Bed } from "../../services/bedService"; // API lấy & xóa giường

const BedDetail = () => {
  const { bedId } = useParams();
  const navigate = useNavigate();
  const [bed, setBed] = useState<Bed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBedDetail = async () => {
      if (bedId) {
        try {
          const data = await getBedDetail(bedId);
          setBed(data);
        } catch (err) {
          setError("Không tìm thấy giường.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBedDetail();
  }, [bedId]);

  const handleDelete = async () => {
    if (!bedId) return;
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa giường này?");
    if (!confirmDelete) return;

    try {
      const success = await deleteBed(bedId);
      if (success) {
        alert("Giường đã được xóa thành công!");
        navigate(-1); // Quay về trang trước hoặc danh sách giường
      } else {
        throw new Error();
      }
    } catch (err) {
      alert("Không thể xóa giường, vui lòng thử lại.");
    }
  };

  if (loading) return <p>Đang tải thông tin giường...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!bed) return <p className="text-red-500">Không tìm thấy giường.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Chi Tiết Giường</h1>
      <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold">{bed.name}</h2>
        <p className="text-gray-700 mt-2">Trạng thái: <strong>{bed.status}</strong></p>
      </div>

      {/* Nút Xóa */}
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        onClick={handleDelete}
      >
        Xóa Giường
      </button>
    </div>
  );
};

export default BedDetail;
