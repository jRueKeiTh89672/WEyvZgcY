// 代码生成时间: 2025-08-07 01:37:31
const fs = require('fs').promises;
const path = require('path');

// Configuration for backup
const backupConfig = {
  backupDir: './backups',
  backupFileName: 'data_backup.json',
};

/**
 * Creates a backup of the data
 * @async
 * @function createBackup
 * @param {object} data - The data to be backed up
 * @returns {Promise<void>} - A promise that resolves when backup is complete
 */
async function createBackup(data) {
  try {
    const backupPath = path.join(backupConfig.backupDir, backupConfig.backupFileName);
    await fs.writeFile(backupPath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Backup created successfully.');
  } catch (error) {
    console.error('Failed to create backup:', error);
    throw error;
  }
}

/**
 * Restores data from the last backup
 * @async
 * @function restoreBackup
 * @returns {Promise<object>} - A promise that resolves with the restored data
 */
async function restoreBackup() {
  try {
    const backupPath = path.join(backupConfig.backupDir, backupConfig.backupFileName);
    const data = await fs.readFile(backupPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to restore backup:', error);
    throw error;
  }
}

// Example usage:
// createBackup(data).then(() => restoreBackup()).catch(err => console.error(err));

module.exports = {
  createBackup,
  restoreBackup,
};