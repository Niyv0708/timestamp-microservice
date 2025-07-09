# Timestamp Microservice 项目结构说明

## 项目结构
```
timestamp-microservice/
├── cloud-functions/         # Laf 云函数目录
│   └── date-function/     # 日期转换云函数
│       ├── index.ts       # 云函数入口文件
│       └── config.json    # HTTP路由配置
├── public/                # 静态页面资源
│   └── index.html         # GitHub Pages 首页
├── vercel.json            # Vercel 配置（可选）
└── server.js              # 本地开发服务器逻辑（非必需）
```

## 部署流程说明
1. **Laf 云函数**：将 `/api/:date?` 接口部署为 Laf 平台的云函数，支持国内访问。
2. **静态资源服务**：使用 GitHub Pages 提供 `public/` 目录下的 HTML 页面。
3. **路由配置**：通过 `config.json` 定义 `/api/:date?` 的 HTTP 触发器。
4. **本地开发**：使用 `server.js` 启动 Express 服务器进行本地调试。
5. **跨平台兼容性**：支持从 Vercel 迁移到 Laf + GitHub Pages 组合部署方案。