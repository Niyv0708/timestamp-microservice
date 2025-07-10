// functions/api.js
exports.handler = async (event, context) => {
  // 优先从查询参数获取 date
  const { date } = event.queryStringParameters || {};

  let parsedDate;

  // 如果没有查询参数，则尝试从路径参数获取
  if (!date) {
    const splat = event.pathParameters && event.pathParameters.splat ? event.pathParameters.splat : null;

    if (!splat || splat.toLowerCase() === 'now') {
      parsedDate = new Date();
    } else if (/^\d+$/.test(splat)) {
      const timestamp = parseInt(splat, 10);
      parsedDate = new Date(timestamp);
    } else {
      parsedDate = new Date(splat);
    }
  } else {
    // 使用查询参数解析日期
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