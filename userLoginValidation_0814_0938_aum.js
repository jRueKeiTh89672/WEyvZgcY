// 代码生成时间: 2025-08-14 09:38:42
// 引入必要的库
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 用户模型（假设你使用的是 MongoDB 与 Mongoose）
// const User = require('./models/User');

// 配置信息
const { JWT_SECRET } = process.env;

// 登录接口
exports.login = async (req, res) => {
  // 获取请求体中的用户名和密码
  const { username, password } = req.body;

  // 检查用户名和密码是否已提供
  if (!username || !password) {
    return res.status(400).json({
      message: '用户名和密码是必填项'
    });
  }

  // 查找用户是否存在
  // const user = await User.findOne({ username });
  // if (!user) {
  //   return res.status(404).json({
  //     message: '用户不存在'
  //   });
  // }

  // 验证密码是否正确
  // const isValid = await bcrypt.compare(password, user.password);
  // if (!isValid) {
  //   return res.status(400).json({
  //     message: '密码错误'
  //   });
  // }

  // 使用 JWT 创建一个 token
  const token = jwt.sign({
    username: username,
    exp: Math.floor(Date.now() / 1000) + (60 * 60)  // 1 hour
  }, JWT_SECRET);

  // 返回 token
  return res.json({
    message: '登录成功',
    token: token
  });
};


// 注册接口
exports.register = async (req, res) => {
  // 获取请求体中的用户名和密码
  const { username, password } = req.body;

  // 检查用户名和密码是否已提供
  if (!username || !password) {
    return res.status(400).json({
      message: '用户名和密码是必填项'
    });
  }

  // 检查用户名是否存在
  // const userExists = await User.findOne({ username });
  // if (userExists) {
  //   return res.status(409).json({
  //     message: '用户名已存在'
  //   });
  // }

  // 密码加密
  const hashedPassword = await bcrypt.hash(password, 12);

  // 创建新用户
  // const newUser = new User({
  //   username: username,
  //   password: hashedPassword
  // });
  // await newUser.save();

  // 返回成功信息
  return res.status(201).json({
    message: '用户注册成功'
  });
};