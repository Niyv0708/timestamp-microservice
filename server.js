// 顶部新增 Vercel 适配器
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// 修改静态资源路径（关键调整）
// 修改前
app.use(express.static('public'));

// 修改后（需绝对路径）
app.use(express.static(__dirname + '/public'));

// 必须导出 app 供 Vercel 使用（新增）
module.exports = app;

// 解析日期函数
function parseDate(input) {
  let date;

  // 处理空输入（当前时间）
  if (!input || input.trim() === '') {
    date = new Date();
  } 
  // 处理 Unix 时间戳（10位或13位）
  else if (/^\d+$/.test(input)) {
    const timestamp = parseInt(input, 10);
    date = new Date(timestamp);
  } 
  // 处理其他格式的日期字符串
  else {
    date = new Date(input);
  }

  // 验证日期有效性
  if (isNaN(date.getTime())) {
    return { error: "Invalid Date" };
  }

  return {
    unix: date.getTime(),             // 返回毫秒级时间戳
    utc: date.toUTCString()            // 返回 UTC 格式时间字符串
  };
}

// 根路由调整（保持原有逻辑）
const path = require('path');

// 修改根路由处理
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // 明确指向 public 目录
});

// 保持 API 路由不变
app.get('/api/:date?', (req, res) => {
  const input = req.params.date;
  const result = parseDate(input);
  res.json(result);
});

// 仅本地开发时启动服务器（新增条件判断）
// 在顶部添加环境判断
const isProduction = process.env.NODE_ENV === 'production';

// 修改静态资源配置
app.use(express.static(isProduction ? path.join(__dirname, 'public') : 'public'));

// 新增健康检查端点（用于部署验证）
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

if (!isProduction) {
  app.listen(port, () => {
    console.log(`Local server running on port ${port}`);
  });
}