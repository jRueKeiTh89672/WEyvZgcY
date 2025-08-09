// 代码生成时间: 2025-08-10 05:47:10
 * Features:
 * - Retrieves processes information
 * - Allows for process termination
 * - Provides error handling for any operation
 *
 */

const os = require('os');
const { exec } = require('child_process');

// Function to get all running processes
function getAllProcesses() {
  return new Promise((resolve, reject) => {
    // Using 'ps' command to get all processes
    exec('ps aux', (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Failed to list processes: ${error.message}`));
        return;
      }
      if (stderr) {
        reject(new Error(`Error listing processes: ${stderr}`));
        return;
      }
      resolve(stdout);
    });
  });
}

// Function to terminate a process by its PID
function terminateProcess(pid) {
  return new Promise((resolve, reject) => {
    // Using 'kill' command to terminate the process
    exec(`kill ${pid}`, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Failed to terminate process with PID ${pid}: ${error.message}`));
        return;
      }
      if (stderr) {
        reject(new Error(`Error terminating process with PID ${pid}: ${stderr}`));
        return;
      }
      resolve(`Process with PID ${pid} has been terminated`);
    });
  });
}

// Exporting functions for use in Gatsby
module.exports = {
  getAllProcesses,
  terminateProcess
};