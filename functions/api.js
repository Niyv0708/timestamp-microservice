// functions/api.js
// Netlify Function 核心日期解析函数
exports.handler = async (event, context) => {
  // 输出完整查询参数对象（调试关键）
  console.log("event.queryStringParameters:", event.queryStringParameters);
  const dateInput = event.queryStringParameters?.date;

  console.log("Received dateInput:", dateInput);  // 原日志

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

  return {
    statusCode: 200,
    body: JSON.stringify({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString()
    }),
    headers: { "Cache-Control": "no-cache" }
  };
};