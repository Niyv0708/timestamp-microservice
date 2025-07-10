// functions/api.js
// Netlify Function 核心日期解析函数
exports.handler = async (event, context) => {
  // 直接从查询参数获取日期（Netlify 重定向通过 ?date=:splat 传递）
  const dateInput = event.queryStringParameters?.date;  // 关键修改：移除 pathParameters 依赖

  // 新增调试日志（部署后可在 Netlify 函数日志查看）
  console.log("Received dateInput:", dateInput);

  let parsedDate;

  // 处理空输入（无查询参数）
  if (!dateInput || dateInput.trim() === '') {
    parsedDate = new Date();
  } 
  // 处理 Unix 时间戳
  else if (/^\d+$/.test(dateInput)) {
    const timestamp = Number(dateInput);
    parsedDate = new Date(timestamp);
  } 
  // 处理其他格式的日期字符串
  else {
    parsedDate = new Date(dateInput);
  }

  // 验证日期有效性
  if (isNaN(parsedDate.getTime())) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid Date" }),
      headers: { "Cache-Control": "no-cache" }
    };
  }

  // 返回标准格式的 JSON 结果
  return {
    statusCode: 200,
    body: JSON.stringify({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString()
    }),
    headers: { "Cache-Control": "no-cache" }
  };
};