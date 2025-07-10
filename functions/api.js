// functions/api.js
exports.handler = async (event, context) => {
  // 安全获取 splat 参数
  const splat = event.pathParameters && event.pathParameters.splat ? event.pathParameters.splat : null;

  let parsedDate;

  // 处理空输入或 'now'
  if (!splat || splat.toLowerCase() === 'now') {
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