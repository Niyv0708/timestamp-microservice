// Netlify Function for date parsing from cloud-functions
exports.handler = async (event, context) => {
  const { date } = event.pathParameters || {};

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
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid Date" })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString()
    })
  };
};