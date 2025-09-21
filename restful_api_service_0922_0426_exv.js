// 代码生成时间: 2025-09-22 04:26:33
const express = require('express');
const router = express.Router();

// 数据库模拟
const data = {
  users: [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 },
  ],
};

// 获取所有用户
router.get('/users', (req, res) => {
  try {
    res.status(200).json(data.users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 获取单个用户
router.get('/users/:id', (req, res) => {
  try {
    const user = data.users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 添加新用户
router.post('/users', (req, res) => {
  try {
    const newUser = {
      id: data.users.length + 1,
      name: req.body.name,
      age: req.body.age,
    };
    data.users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 更新用户信息
router.put('/users/:id', (req, res) => {
  try {
    const index = data.users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    const updatedUser = {
      ...data.users[index],
      name: req.body.name,
      age: req.body.age,
    };
    data.users[index] = updatedUser;
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 删除用户
router.delete('/users/:id', (req, res) => {
  try {
    const index = data.users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    data.users.splice(index, 1);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;