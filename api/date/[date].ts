export default async function handler(req, res) {
  const { date } = req.query;

  let parsedDate;

  // 处理空输入
  if (!date || date.trim() === '') {
    parsedDate = new Date();
  } 
  // 处理 Unix 时间戳
  else if (/^\d+$/.test(date)) {
    const timestamp = parseInt(date, 10);
    parsedDate = new Date(timestamp);
  }
  // 处理其他格式的日期字符串
  else {
    parsedDate = new Date(date);
  }

  // 验证日期有效性
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ error: "Invalid Date" });
  }

  return res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
}