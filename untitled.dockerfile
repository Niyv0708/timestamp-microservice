FROM node:18-alpine

WORKDIR /app

# 复制所有必要文件（包括前端静态资源）
COPY package*.json ./
COPY server.js .
COPY public/ public/  
COPY views/ views/    

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]