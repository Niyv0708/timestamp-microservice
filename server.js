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

// 提供静态文件服务
app.use(express.static('public'));

// API 路由
app.get('/api/:date?', (req, res) => {
  const input = req.params.date;
  const result = parseDate(input);

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