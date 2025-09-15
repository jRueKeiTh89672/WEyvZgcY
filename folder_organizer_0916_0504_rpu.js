// 代码生成时间: 2025-09-16 05:04:31
const fs = require('fs');
const path = require('path');

/**
 * 功能：对指定目录进行整理，将所有文件和文件夹归类到相应的文件夹下
 * @param {string} directoryPath - 需要整理的目录路径
 * @returns {Promise<void>} - 异步执行，整理完成后返回
 */
async function organizeDirectory(directoryPath) {
  // 检查目录是否存在
  if (!fs.existsSync(directoryPath)) {
    throw new Error('指定的目录不存在');
  }

  // 定义分类文件夹
  const categories = {
    'images': ['.jpg', '.jpeg', '.png', '.gif'],
    'documents': ['.pdf', '.doc', '.docx'],
    'scripts': ['.js', '.ts', '.sh'],
    'videos': ['.mp4', '.mov', '.avi']
  };

  try {
    // 读取目录内容
    const items = fs.readdirSync(directoryPath);
    for (const item of items) {
      const itemPath = path.join(directoryPath, item);
      // 获取文件状态
      const stats = fs.statSync(itemPath);
      if (stats.isDirectory()) {
        // 递归整理子目录
        await organizeDirectory(itemPath);
      } else if (stats.isFile()) {
        // 根据文件扩展名分类
        const fileExtension = path.extname(item).toLowerCase();
        for (const category in categories) {
          if (categories[category].includes(fileExtension)) {
            const targetDir = path.join(directoryPath, category);
            // 创建分类文件夹
            if (!fs.existsSync(targetDir)) {
              fs.mkdirSync(targetDir);
            }
            // 移动文件到分类文件夹
            fs.renameSync(itemPath, path.join(targetDir, item));
            break;
          }
        }
      }
    }
  } catch (error) {
    // 错误处理
    console.error('目录整理失败:', error.message);
  }
}

/**
 * 入口函数
 * @param {string} directoryPath - 需要整理的目录路径
 * @returns {Promise<void>} - 异步执行，整理完成后返回
 */
function startOrganizing(directoryPath) {
  console.log('开始整理目录...');
  organizeDirectory(directoryPath)
    .then(() => console.log('目录整理完成。'))
    .catch(error => console.error('目录整理出错:', error.message));
}

// 示例：整理当前工作目录
// startOrganizing('./');