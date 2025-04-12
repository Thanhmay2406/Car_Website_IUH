# Car_Website_IUH
## Đây là bài tập lớn môn hệ thống và công nghệ web IUH - K19
## Giải thích cây thư mục của dự án:
- `index.html`: Trang chính của dự án
- `assets/`: Chứa các tài nguyên như CSS, JavaScript, hình ảnh và font.
  - `css/`: Chứa tệp CSS tùy chỉnh và Bootstrap.
  - `js/`: Chứa mã JavaScript tùy chỉnh và Bootstrap JS.
  - `images/`: Lưu trữ hình ảnh sử dụng trong dự án.
  - `fonts/`: Chứa font chữ tùy chỉnh nếu có.
- `pages/`: Chứa các trang HTML phụ.
- `components/`: Chứa các phần tái sử dụng như header và footer.
- `README.md`: Mô tả về dự án 

## Cách làm việc với dự án:


### 1️⃣ **Tải Dự Án Về Máy**

Trước tiên, hãy sao chép (clone) kho lưu trữ về máy của bạn bằng lệnh sau:
```bash
git clone https://github.com/Thanhmay2406/Car_Website_IUH
```

Sau khi tải xong, di chuyển vào thư mục dự án:
```bash
cd repository-name
```

---

### 2️⃣ **Tạo Nhánh Mới**

Để tạo một nhánh mới và làm việc trên đó, hãy sử dụng lệnh sau:
```bash
git checkout -b ten-nhanh-moi
```
Ví dụ:
```bash
git checkout -b feature-login
```

Sau đó, kiểm tra xem bạn đang ở đúng nhánh chưa:
```bash
git branch
```

---

### 3️⃣ **Thực Hiện Thay Đổi & Đẩy Lên GitHub**

Sau khi chỉnh sửa mã nguồn, thêm các thay đổi vào Git:
```bash
git add .
```
Commit các thay đổi:
```bash
git commit -m "Mô tả thay đổi của bạn"
```

Đẩy nhánh lên GitHub:
```bash
git push -u origin ten-nhanh-moi
```
Ví dụ:
```bash
git push -u origin feature-login
```

---

### 4️⃣ **Tạo Pull Request (PR)**

Sau khi đẩy nhánh lên GitHub, bạn cần tạo một Pull Request (PR) để tôi xem xét và hợp nhất vào nhánh chính:
1. Truy cập kho lưu trữ trên GitHub.
2. Chọn tab **Pull Requests**.
3. Nhấn **New Pull Request**.
4. Chọn nhánh bạn đã đẩy lên và tạo PR.
5. Đợi phản hồi từ tôi!

---

### 5️⃣ **Cập Nhật Mã Mới Nhất Từ `main`**

Nếu có thay đổi mới trên nhánh `main`, bạn nên cập nhật trước khi tiếp tục làm việc:
```bash
git checkout main
```
```bash
git pull origin main
```
Sau đó, chuyển về nhánh của bạn và cập nhật:
```bash
git checkout ten-nhanh-moi
git merge main
```

---
