// 代码生成时间: 2025-09-24 13:02:09
// 引入必要的库
const EventEmitter = require('events');

// 定义用户权限管理类
class UserPermissionManager extends EventEmitter {
  // 构造函数，初始化用户角色和权限数据
  constructor() {
    super();
    this.userRoles = {}; // 存储用户角色和权限的对象
  }

  // 添加新用户
  addUser(username, role) {
    if (!username || !role) {
      // 错误处理：用户名或角色不能为空
      throw new Error('Username and role are required.');
    }
    if (this.userRoles[username]) {
      // 错误处理：用户已存在
      throw new Error('User already exists.');
    }
    this.userRoles[username] = role;
    // 触发用户添加成功的事件
    this.emit('userAdded', username);
  }

  // 删除用户
  removeUser(username) {
    if (!this.userRoles[username]) {
      // 错误处理：用户不存在
      throw new Error('User does not exist.');
    }
    delete this.userRoles[username];
    // 触发用户删除成功的事件
    this.emit('userRemoved', username);
  }

  // 更新用户权限
  updateUserRole(username, newRole) {
    if (!username || !newRole) {
      // 错误处理：用户名或新角色不能为空
      throw new Error('Username and new role are required.');
    }
    if (!this.userRoles[username]) {
      // 错误处理：用户不存在
      throw new Error('User does not exist.');
    }
    this.userRoles[username] = newRole;
    // 触发用户权限更新成功的事件
    this.emit('userRoleUpdated', username);
  }

  // 检查用户权限
  checkUserPermission(username, action) {
    if (!username) {
      // 错误处理：用户名不能为空
      throw new Error('Username is required.');
    }
    const role = this.userRoles[username];
    if (!role) {
      // 错误处理：用户不存在
      throw new Error('User does not exist.');
    }
    const permissions = ['admin', 'editor', 'viewer'];
    // 根据角色和操作判断权限
    if (permissions.includes(role) && role === action) {
      return true;
    } else {
      return false;
    }
  }
}

// 示例用法
const userManager = new UserPermissionManager();
userManager.on('userAdded', (username) => {
  console.log(`User ${username} added successfully.`);
});
userManager.on('userRemoved', (username) => {
  console.log(`User ${username} removed successfully.`);
});
userManager.on('userRoleUpdated', (username) => {
  console.log(`User ${username} role updated successfully.`);
});

try {
  userManager.addUser('alice', 'editor');
  userManager.addUser('bob', 'viewer');
  console.log(userManager.checkUserPermission('alice', 'editor')); // true
  userManager.updateUserRole('alice', 'admin');
  console.log(userManager.checkUserPermission('alice', 'admin')); // true
  userManager.removeUser('bob');
} catch (error) {
  console.error(error);
}