# Stage 1: Build React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy và cài dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy toàn bộ mã nguồn
COPY . .

# Truyền biến môi trường build-time
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_PUBLIC_KEY
ARG REACT_APP_OAUTH2_REDIRECT_URI

ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
ENV REACT_APP_PUBLIC_KEY=${REACT_APP_PUBLIC_KEY}
ENV REACT_APP_OAUTH2_REDIRECT_URI=${REACT_APP_OAUTH2_REDIRECT_URI}
ENV DOCKER_BUILDKIT=1

# Build project
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:stable-alpine

# Copy build output vào thư mục nginx
COPY --from=build /app/build /usr/share/nginx/html

# (Tuỳ chọn) NGINX cấu hình nếu dùng React Router
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
