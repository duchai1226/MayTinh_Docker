FROM node:14
# Đặt thư mục làm việc
WORKDIR /app
# Sao chép tệp package.json vào container
COPY package*.json ./
# Cài đặt tất cả các phụ thuộc
RUN npm install
# Sao chép mã nguồn backend vào container
COPY . .
# Mở cổng 3000
EXPOSE 3000
# Lệnh chạy backend
CMD ["node", "server.js"]
