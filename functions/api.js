// functions/api.js
exports.handler = async (event, context) => {
  // 从查询参数或路径参数中获取日期
  const { date } = event.queryStringParameters || {};
  const splat = event.pathParameters && event.pathParameters.splat ? event.pathParameters.splat : null;

  let parsedDate;

  // 优先使用查询参数 ?date=...
  if (date) {
    parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid Date" })
      };
    }
  }
  // 处理空输入或 'now'
  else if (!splat || splat.toLowerCase() === 'now') {
    parsedDate = new Date();
  }
  // 处理 Unix 时间戳
  else if (/^\d+$/.test(splat)) {
    const timestamp = parseInt(splat, 10);
    parsedDate = new Date(timestamp);
  }
  // 处理其他格式的日期字符串
  else {
    parsedDate = new Date(splat);
    if (isNaN(parsedDate.getTime())) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid Date" })
      };
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString()
    })
  };
};