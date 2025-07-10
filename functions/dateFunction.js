// Netlify Function for date parsing from cloud-functions
exports.handler = async (event, context) => {
  // 优先从路径参数获取 date（处理 /api/:date 格式），其次查询参数（兼容旧格式）
  const pathDate = event.pathParameters?.date;
  const queryDate = event.queryStringParameters?.date;
  const date = pathDate || queryDate; // 路径参数优先级更高
  let parsedDate;

  // 处理空输入（路径或查询参数均无 date）
  if (!date || date.trim() === '') {
    parsedDate = new Date();
  } 
  // 处理 Unix 时间戳（支持字符串形式的时间戳）
  else if (/^\d+$/.test(date)) {
    const timestamp = BigInt(date); // 使用 BigInt 避免大数精度丢失（如超过 Number.MAX_SAFE_INTEGER 的时间戳）
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