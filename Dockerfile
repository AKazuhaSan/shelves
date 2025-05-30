# 构建阶段
FROM node:22 AS builder

# 设置工作目录
WORKDIR /app

# 复制依赖清单
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制其余源码
COPY . .

# 构建项目
RUN npm run build

# 部署阶段（使用 nginx 提供静态文件）
FROM nginx:alpine

# 复制构建好的文件到 nginx 默认目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制自定义 nginx 配置（可选）
# COPY nginx.conf /etc/nginx/nginx.conf

# 公开端口（默认 80）
EXPOSE 80

# 启动 nginx（默认命令即可）