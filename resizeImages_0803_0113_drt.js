// 代码生成时间: 2025-08-03 01:13:15
const sharp = require('sharp'); // 使用sharp库来处理图像
const fs = require('fs'); // 使用fs库来读取文件系统
const path = require('path'); // 使用path库来处理文件路径

/**
 * ResizeImages - 图片尺寸批量调整器
 * @param {string} sourceDir - 源图片文件夹路径
 * @param {string} targetDir - 目标文件夹路径
 * @param {number} width - 新的宽度
 * @param {number} height - 新的高度
 * @param {boolean} keepAspect - 是否保持原图宽高比
 * @returns {Promise<void>} - 返回一个Promise对象
 */
async function ResizeImages(sourceDir, targetDir, width, height, keepAspect = true) {
  // 检查源文件夹和目标文件夹是否存在
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`源文件夹${sourceDir}不存在`);
  }
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true }); // 如果不存在，则创建
  }

  // 读取源文件夹内所有文件
  const files = fs.readdirSync(sourceDir);
  for (let file of files) {
    const filePath = path.join(sourceDir, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile() && filePath.endsWith('.jpg') || filePath.endsWith('.png')) {
      try {
        // 使用sharp调整图片尺寸
        const image = sharp(filePath);
        if (keepAspect) {
          // 保持宽高比
          const meta = await image.metadata();
          const aspectRatio = meta.height / meta.width;
          const targetHeight = height * (width / meta.width);
          await image
            .resize({ width, height: Math.min(meta.height, targetHeight) })
            .toFile(path.join(targetDir, file));
        } else {
          // 不保持宽高比
          await image.resize({ width, height }).toFile(path.join(targetDir, file));
        }
      } catch (error) {
        console.error(`调整图片尺寸时发生错误：${error}`);
      }
    }
  }
}

// 示例用法
const sourceDir = './src';
const targetDir = './resized';
const width = 800;
const height = 600;
const keepAspect = true;

ResizeImages(sourceDir, targetDir, width, height, keepAspect)
  .then(() => console.log('图片尺寸调整完成'))
  .catch((error) => console.error('图片尺寸调整失败:', error));
