// 代码生成时间: 2025-09-07 05:09:50
const mysql = require('mysql2/promise'); // 引入mysql2模块

// 创建数据库连接池
class DatabasePoolManager {

  // 构造函数，接收数据库配置信息
  constructor(config) {
    this.config = config;
    this.pool = mysql.createPool(config);
  }

  // 获取数据库连接
  async getConnection() {
    try {
      const connection = await this.pool.getConnection();
      return connection; // 返回数据库连接
    } catch (error) {
      console.error('Failed to get database connection:', error);
      throw error; // 抛出错误
    }
  }

  // 释放数据库连接
  async releaseConnection(connection) {
    try {
      await connection.release(); // 释放连接
    } catch (error) {
      console.error('Failed to release database connection:', error);
      throw error; // 抛出错误
    }
  }

  // 执行数据库查询
  async query(sql, params) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(sql, params);
      await this.releaseConnection(connection);
      return rows; // 返回查询结果
    } catch (error) {
      await this.releaseConnection(connection);
      throw error; // 抛出错误
    }
  }

  // 关闭数据库连接池
  async end() {
    try {
      await this.pool.end(); // 关闭连接池
    } catch (error) {
      console.error('Failed to end database pool:', error);
      throw error; // 抛出错误
    }
  }
}

// 使用示例
(async () => {
  const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'testdb'
  };

  const dbPoolManager = new DatabasePoolManager(dbConfig);
  try {
    const rows = await dbPoolManager.query('SELECT * FROM users', []);
    console.log(rows);
  } catch (error) {
    console.error('Database query failed:', error);
  } finally {
    await dbPoolManager.end();
  }
})();