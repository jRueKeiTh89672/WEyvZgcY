// 代码生成时间: 2025-09-17 19:12:32
const express = require('express');
const axios = require('axios');

// 创建Express应用
const app = express();
const port = 3000; // 定义端口号

// 中间件，解析JSON请求体
app.use(express.json());

/**
 * 处理GET请求的函数
 * @param {string} url - 请求的URL
 * @returns {Promise<any>} - 返回请求结果的Promise
 */
async function handleGetRequest(url) {
  try {
    // 使用axios发送GET请求
    const response = await axios.get(url);
    return response.data; // 返回响应数据
  } catch (error) {
    // 错误处理
    console.error('GET Request failed:', error);
    return null; // 在错误情况下返回null
  }
}

/**
 * 处理POST请求的函数
 * @param {string} url - 请求的URL
 * @param {Object} data - 要发送的数据
 * @returns {Promise<any>} - 返回请求结果的Promise
 */
async function handlePostRequest(url, data) {
  try {
    // 使用axios发送POST请求
    const response = await axios.post(url, data);
    return response.data; // 返回响应数据
  } catch (error) {
    // 错误处理
    console.error('POST Request failed:', error);
    return null; // 在错误情况下返回null
  }
}

// 定义GET路由处理器
app.get('/api/get', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    res.status(400).send('URL parameter is required');
    return;
  }
  const result = await handleGetRequest(url);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(500).send('Failed to fetch data');
  }
});

// 定义POST路由处理器
app.post('/api/post', async (req, res) => {
  const { url } = req.query;
  const { data } = req.body;
  if (!url || !data) {
    res.status(400).send('URL and data parameters are required');
    return;
  }
  const result = await handlePostRequest(url, data);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(500).send('Failed to send data');
  }
});

// 启动Express服务器
app.listen(port, () => {
  console.log(`HTTP Request Handler is running on port ${port}`);
});