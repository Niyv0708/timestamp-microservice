// 新增健康检查端点
export const config = {
  runtime: 'edge',
};

export default async function handler() {
  return new Response('OK', { status: 200 });
}