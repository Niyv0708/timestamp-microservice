const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// 解析日期函数
function parseDate(input) {
  let date;

  // 处理空输入（当前时间）
  if (!input || input.trim() === '') {
    date = new Date();
  } 
  // 处理 Unix 时间戳（10位或13位）
  else if (/^\d{10,13}$/.test(input)) {
    const timestamp = Number(input);
    // 如果是10位时间戳则转为13位
    date = new Date(timestamp.toString().length === 10 ? timestamp * 1000 : timestamp);
  } 
  // 处理 ISO 格式日期（如 "2023-01-01"）
  else if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    date = new Date(`${input}T00:00:00Z`);
  } 
  // 处理其他日期格式
  else {
    date = new Date(input);
  }

  // 验证日期有效性
  if (isNaN(date.getTime())) {
    return { error: "Invalid Date" };
  }

  return {
    unix: date.getTime(),
    utc: date.toUTCString()
  };
}

// 提供静态文件服务
app.use(express.static('public'));

// API 路由
app.get('/api/:date?', (req, res) => {
  const result = parseDate(req.params.date);
  res.json(result);
});

// 根路由返回前端页面
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});