// 代码生成时间: 2025-08-05 17:32:46
const User = require('./User'); // 假设有一个User模型
const bcrypt = require('bcryptjs');

class UserLoginValidation {
  // 验证用户名和密码是否正确的登录方法
  async login(username, password) {
    try {
      // 查找用户名对应的用户
      const user = await User.findOne({ username });

      if (!user) {
        // 用户不存在
        throw new Error('User not found');
      }

      // 比较密码
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        // 密码错误
        throw new Error('Invalid password');
      }

      // 登录成功，返回用户信息，但不包括密码
      return {
        id: user.id,
        username: user.username,
        // 其他用户信息
      };
    } catch (error) {
      // 错误处理
      console.error(error);
      throw error;
    }
  }
}

module.exports = UserLoginValidation;