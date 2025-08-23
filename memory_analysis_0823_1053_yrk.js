// 代码生成时间: 2025-08-23 10:53:07
const os = require('os');
const { exec } = require('child_process');

/**
 * 获取内存使用情况
 * @returns {Promise<Object>} 内存使用情况对象
 */
const getMemoryUsage = () => {
  return new Promise((resolve, reject) => {
    // 获取系统总内存
    const totalMemory = os.totalmem();
    // 获取系统空闲内存
    const freeMemory = os.freemem();
    // 计算已使用的内存
    const usedMemory = totalMemory - freeMemory;
    // 转换为MB
    const usedMemoryMB = usedMemory / (1024 * 1024);
    const freeMemoryMB = freeMemory / (1024 * 1024);
    
    resolve({
      total: totalMemory,
      free: freeMemory,
      used: usedMemory,
      usedMB: usedMemoryMB,
      freeMB: freeMemoryMB
    });
  });
};

/**
 * 获取进程内存使用情况
 * @param {string} pid 进程ID
 * @returns {Promise<Object>} 进程内存使用情况对象
 */
const getProcessMemoryUsage = (pid) => {
  return new Promise((resolve, reject) => {
    exec(`ps -o rss= -p ${pid}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(new Error(`Error getting process memory usage: ${stderr}`));
      } else {
        const memoryUsage = parseInt(stdout.trim(), 10); // kB to MB
        resolve({
          pid,
          memoryUsage: memoryUsage / 1024
        });
      }
    });
  });
};

/**
 * 分析内存使用情况
 * @param {string[]} pids 进程ID数组
 * @returns {Promise<Array<Object>>} 进程内存使用情况数组
 */
const analyzeMemoryUsage = (pids) => {
  return Promise.all(pids.map(pid => getProcessMemoryUsage(pid).catch(error => {
    console.error(`Error analyzing memory usage for process ${pid}:`, error);
    return null;
  })));
};

// 使用示例
const pids = ['1234', '5678']; // 假设的进程ID
analyzeMemoryUsage(pids)
  .then(memoryUsages => {
    console.log('Process Memory Usage:', memoryUsages);
  })
  .catch(error => {
    console.error('Error analyzing memory usage:', error);
  });