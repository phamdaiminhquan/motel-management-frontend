import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Room, getRoomById } from "../../services/roomService";


const RoomDetail = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoomDetail = async () => {
            try {
                const data = await getRoomById(roomId!);
                setRoom(data);
                console.log("Thống tin phòng:", data);
            } catch (err) {
                setError("Không thể tải thông tin phòng.");
            } finally {
                setLoading(false);
            }
        };

        fetchRoomDetail();
    }, [roomId]);

    if (loading) return <p>Đang tải thông tin phòng...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="pt-12 pb-14 rounded-lg bg-white p-6">
            <h2 className="text-2xl font-bold">{room?.name}</h2>
            <p className="text-lg mt-2">Loại: {room?.type}</p>
            <p className={`text-lg mt-2 ${room?.status === "Trống" ? "text-green-500" : "text-red-500"}`}>
                Trạng thái: {room?.status}
            </p>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Chỉnh sửa phòng</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">Xoá phòng</button>
        </div>
    );
};

export default RoomDetail;
