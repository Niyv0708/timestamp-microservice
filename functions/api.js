// functions/api.js
// Netlify Function 核心日期解析函数
exports.handler = async (event, context) => {
  // 优先从路径参数获取日期（/api/2023-10-01），其次查询参数（/api?date=2023-10-01）
  const pathDate = event.pathParameters?.splat;  // 通配符匹配的路径部分（如 "2023-10-01"）
  const queryDate = event.queryStringParameters?.date;
  const dateInput = pathDate || queryDate;  // 路径参数优先级更高

  // 新增调试日志（部署后可在 Netlify 函数日志查看）
  console.log("Received dateInput:", dateInput);

  let parsedDate;

  // 处理空输入（无路径或查询参数）
  if (!dateInput || dateInput.trim() === '') {
    parsedDate = new Date();
  } 
  // 处理 Unix 时间戳（改用 Number 解析，避免 BigInt 转换问题）
  else if (/^\d+$/.test(dateInput)) {
    const timestamp = Number(dateInput);  // 直接转换为数字（测试值在安全范围内）
    parsedDate = new Date(timestamp);
  } 
  // 处理其他格式的日期字符串（如 "2023-10-01"）
  else {
    parsedDate = new Date(dateInput);
  }

  // 验证日期有效性（关键！）
  if (isNaN(parsedDate.getTime())) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid Date" }),
      headers: { "Cache-Control": "no-cache" }  // 禁止缓存（避免旧结果）
    };
  }

  // 返回标准格式的 JSON 结果（新增缓存控制头）
  return {
    statusCode: 200,
    body: JSON.stringify({
      unix: parsedDate.getTime(),  // 转换为数字类型的 Unix 时间戳（毫秒）
      utc: parsedDate.toUTCString()  // 转换为标准 UTC 字符串格式
    }),
    headers: { "Cache-Control": "no-cache" }  // 禁止缓存
  };
};