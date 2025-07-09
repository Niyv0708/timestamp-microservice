export default async function (ctx: any) {
  const { date } = ctx.req.params;

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
    return ctx.res.send({ error: "Invalid Date" });
  }

  return ctx.res.send({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
}