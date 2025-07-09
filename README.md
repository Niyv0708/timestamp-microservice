# Timestamp Microservice 项目结构说明

## 项目结构
```
timestamp-microservice/
├── api/
│   └── date/
│       └── [date].ts  # Serverless Function 实现日期转换逻辑
├── public/
│   └── index.html     # 静态页面入口
├── vercel.json        # Vercel 配置文件，定义路由规则
└── server.js          # 本地开发服务器逻辑（非必需）
```

## 部署流程说明
1. **Serverless Function**：`[date].ts` 处理 `/api/:date?` 请求，并返回符合规范的 JSON 响应。
2. **静态资源服务**：Vercel 直接提供 `public/` 目录下的静态文件。
3. **路由配置**：`vercel.json` 将 `/api/:date?` 请求转发到对应的 Serverless Function。
4. **本地开发**：使用 `server.js` 启动一个 Express 服务器，便于本地调试。