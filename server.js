// 仅本地开发时启动服务器（新增条件判断）
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  const express = require('express');
  const app = express();
  const port = process.env.PORT || 3000;

  // 修改静态资源路径（关键调整）
  app.use(express.static(__dirname + '/public'));
  
  // 根路由调整（保持原有逻辑）
  const path = require('path');
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // 明确指向 public 目录
  });

  // 新增健康检查端点（用于部署验证）
  app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

  app.listen(port, () => {
    console.log(`Local server running on port ${port}`);
  });
}

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




