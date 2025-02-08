# 🚀 Motel Management - Frontend

## 📌 Giới Thiệu Dự Án
Motel Management là một hệ thống quản lý nhà trọ trực tuyến giúp chủ nhà trọ dễ dàng quản lý danh sách nhà trọ, phòng, giường và nhiệm vụ của nhân viên. Hệ thống sử dụng **React + TypeScript** để xây dựng giao diện, tích hợp với **REST API** từ backend.

---

## 🎨 Công Nghệ Sử Dụng
✅ **React + TypeScript** - Xây dựng giao diện.
✅ **Tailwind CSS** - Thiết kế UI nhanh và tối ưu.
✅ **React Router** - Điều hướng giữa các trang.
✅ **Axios** - Gọi API từ Backend.
✅ **Moment.js / Date Handling** - Xử lý thời gian theo GMT+7.
✅ **Redux Toolkit / Context API** - Quản lý trạng thái ứng dụng.

---

## 📂 Cấu Trúc Thư Mục Chính
📁 `src/`
- 📁 `components/` - Chứa các component UI như Sidebar, BottomNav, TaskItem, CancelModal.
- 📁 `pages/` - Chứa các trang chính như Dashboard, Houses, Tasks, Rooms.
- 📁 `services/` - Chứa các API service để kết nối với Backend.
- 📁 `hooks/` - Chứa các custom hooks để tái sử dụng logic.
- 📄 `App.tsx` - Điều hướng chính với React Router.

---

## 🔧 Cách Cài Đặt & Chạy Dự Án
### 📥 1. Clone Repo
```sh
git clone https://github.com/your-repo/motel-management-frontend.git
cd motel-management-frontend
```

### 📦 2. Cài Đặt Dependencies
```sh
npm install
```

### 🚀 3. Chạy Dự Án
```sh
npm run dev
```
🔗 **Dự án sẽ chạy tại:** `http://localhost:5173`

---

## 🚀 Chức Năng Chính
### ✅ Đã Hoàn Thành
- **Quản lý danh sách nhiệm vụ**: Hiển thị danh sách nhiệm vụ với các trạng thái khác nhau.
- **Sắp xếp & lọc nhiệm vụ**: Lọc theo trạng thái, nhân viên, và sắp xếp theo mức độ ưu tiên.
- **Modal hủy nhiệm vụ**: Yêu cầu nhập lý do trước khi hủy.
- **Quản lý chi tiêu**: Thêm chi tiêu khi hoàn tất nhiệm vụ.

### 🔄 Đang Phát Triển
- **Cập nhật dữ liệu real-time**: Hiển thị nhiệm vụ mới ngay sau khi tạo mà không cần reload trang.
- **Tối ưu bộ lọc theo ngày**: Chỉ hiển thị nhiệm vụ hoàn thành hôm nay theo GMT+7.

### ⏳ Sắp Làm
- **Giao diện chi tiết nhiệm vụ**: Xem thông tin chi tiết từng nhiệm vụ.
- **Quản lý danh sách chi phí**: Hiển thị các khoản chi chưa duyệt.
- **Tối ưu UI/UX**: Cải thiện trải nghiệm người dùng trên desktop và mobile.

---

## 📌 Hướng Dẫn Đóng Góp
### 🚀 Fork và Clone
```sh
git clone https://github.com/your-repo/motel-management-frontend.git
cd motel-management-frontend
git checkout -b feature/new-feature
```
### 📥 Cài Dependencies
```sh
npm install
```
### 🔧 Commit & Push
```sh
git add .
git commit -m "Thêm tính năng mới"
git push origin feature/new-feature
```
🔗 **Tạo Pull Request trên GitHub!**

---

## 📞 Liên Hệ & Hỗ Trợ
📌 **Email:** support@motelmanagement.com
📌 **GitHub Issues:** [Motel Management Issues](https://github.com/your-repo/motel-management-frontend/issues)

🔥 **Cảm ơn bạn đã đóng góp và phát triển hệ thống quản lý nhà trọ cùng chúng tôi!** 🚀