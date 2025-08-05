// 代码生成时间: 2025-08-06 06:17:40
const fs = require('fs-extra');
const path = require('path');

// 配置源路径和目标路径
const sourcePath = '/path/to/source/directory';
const targetPath = '/path/to/target/directory';

// 函数：复制单个文件
async function copyFile(source, target) {
  try {
    const stats = await fs.stat(source);
    if (stats.isFile()) {
      await fs.copy(source, target);
      console.log(`文件 ${source} 已复制到 ${target}`);
    }
  } catch (error) {
    console.error(`复制文件时出错：${error.message}`);
  }
}

// 函数：递归复制文件夹
async function copyDirectory(source, target) {
  try {
    // 确保目标路径存在
    await fs.ensureDir(target);
    const files = await fs.readdir(source);
    for (const file of files) {
      const sourceFile = path.join(source, file);
      const targetFile = path.join(target, file);
      // 递归复制子文件或子文件夹
      await copyDirectory(sourceFile, targetFile);
    }
  } catch (error) {
    console.error(`复制文件夹时出错：${error.message}`);
  }
}

// 函数：备份和同步文件
async function backupAndSync() {
  try {
    await copyDirectory(sourcePath, targetPath);
    console.log('文件备份和同步完成');
  } catch (error) {
    console.error(`备份和同步出错：${error.message}`);
  }
}

// 执行备份和同步操作
backupAndSync();