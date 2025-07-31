// 代码生成时间: 2025-07-31 10:54:53
const os = require('os');
const { performance } = require('perf_hooks');

// SystemPerformanceMonitor 类用于监控系统性能指标
class SystemPerformanceMonitor {
  // 构造函数
  constructor() {
    // 定时器用于定期收集性能数据
    this.timer = setInterval(this.collectPerformanceData, 1000);
  }

  // 收集性能数据
  collectPerformanceData() {
    try {
      // CPU 负载
      const cpuLoad = os.loadavg();

      // 内存使用情况
      const freeMemory = os.freemem();
      const totalMemory = os.totalmem();
      const usedMemory = totalMemory - freeMemory;

      // 网络数据
      const networkInterfaces = os.networkInterfaces();
      let networkData = {};

      Object.keys(networkInterfaces).forEach((iface) => {
        networkInterfaces[iface].forEach((details) => {
          if (details.family === 'IPv4') {
            networkData[iface] = details.address;
          }
        });
      });

      // 打印性能数据
      console.log('CPU Load:', cpuLoad);
      console.log('Memory Usage:', `${((usedMemory / totalMemory) * 100).toFixed(2)}%`);
      console.log('Network Data:', networkData);

      // 性能计时器统计
      console.log('Performance Timer:', performance.timers);

      // 清空性能计时器
      performance.clearTimers();
    } catch (error) {
      console.error('Error collecting performance data:', error);
    }
  }

  // 停止性能监控
  stopMonitoring() {
    clearInterval(this.timer);
  }
}

// 示例：创建 SystemPerformanceMonitor 实例并运行 5 秒后停止监控
const monitor = new SystemPerformanceMonitor();
setTimeout(() => {
  monitor.stopMonitoring();
  console.log('Performance monitoring stopped.');
}, 5000);