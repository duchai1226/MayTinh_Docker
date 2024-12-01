# Sử dụng hình ảnh nginx chính thức
FROM nginx:alpine

# Sao chép các file HTML, CSS, JS vào thư mục nginx
COPY . /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mở cổng 80 để truy cập ứng dụng
EXPOSE 80

# Nginx sẽ tự động chạy khi container khởi động
