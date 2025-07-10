// Netlify Function for health check
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: 'OK'
  };
};