// 仅本地开发时启动服务器（新增条件判断）
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  const express = require('express');
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.static(__dirname + '/public'));
  
  const path = require('path');
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // 模拟 Netlify 重定向：将 /api/* 转发为查询参数 date
  app.get('/api/*', (req, res) => {
    const dateInput = req.params[0];  // 获取路径中的日期部分（如 "1451001600000"）
    // 调用与 Netlify 函数相同的日期解析逻辑
    let parsedDate;
    if (!dateInput || dateInput.trim() === '') {
      parsedDate = new Date();
    } else if (/^\d+$/.test(dateInput)) {
      parsedDate = new Date(Number(dateInput));
    } else {
      parsedDate = new Date(dateInput);
    }
    if (isNaN(parsedDate.getTime())) {
      res.status(400).json({ error: "Invalid Date" });
    } else {
      res.json({
        unix: parsedDate.getTime(),
        utc: parsedDate.toUTCString()
      });
    }
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




