import { XCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  title?: string;
  placeholder?: string;
}

const CancelModal: React.FC<CancelModalProps> = ({ isOpen, onClose, onSubmit, title, placeholder }) => {
  if (!isOpen) return null;

  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 max-w-md p-5 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 p-2 hover:bg-gray-200 rounded-full">
          <XCircle size={20} className="text-red-500" />
        </button>

        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="text-red-500" size={24} /> {title || "Nhập lý do hủy"}
        </h2>

        <textarea
          className="w-full p-2 border rounded"
          placeholder={placeholder || "Nhập lý do hủy..."}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full mt-4" onClick={() => onSubmit(reason)}>
          🚫 Xác nhận Hủy
        </button>
      </div>
    </div>
  );
};

export default CancelModal;
