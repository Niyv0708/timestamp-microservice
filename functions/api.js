// functions/api.js
exports.handler = async (event, context) => {
  const { splat } = event.pathParameters;

  // 将路径参数作为 date 处理
  let parsedDate;

  if (!splat || splat.trim() === '') {
    parsedDate = new Date();
  } else if (/^\d+$/.test(splat)) {
    const timestamp = parseInt(splat, 10);
    parsedDate = new Date(timestamp);
  } else {
    parsedDate = new Date(splat);
  }

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