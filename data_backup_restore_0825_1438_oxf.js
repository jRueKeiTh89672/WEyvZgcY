// 代码生成时间: 2025-08-25 14:38:05
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

// Function to backup data
async function backupData() {
  // Define the backup file path
  const backupPath = path.join(__dirname, 'data_backup.tar.gz');

  try {
    // Use gzip to compress the data directory
    const command = `tar -czvf ${backupPath} ./data`;
    await exec(command);
    console.log('Data backup successful.');
  } catch (error) {
    console.error('Error in data backup:', error);
    throw error;
  }
}

// Function to restore data
async function restoreData(backupPath) {
  // Define the path to the backup file
  const targetPath = path.join(__dirname, 'data');

  try {
    // Use gzip to decompress the backup file
    const command = `tar -xzvf ${backupPath} -C ${targetPath}`;
    await exec(command);
    console.log('Data restore successful.');
  } catch (error) {
    console.error('Error in data restore:', error);
    throw error;
  }
}

// Main function to handle backup and restore
async function handleDataBackupRestore() {
  const backupPath = path.join(__dirname, 'data_backup.tar.gz');

  console.log('Starting data backup...');
  await backupData();
  console.log('Data backup completed.');

  console.log('Starting data restore...');
  await restoreData(backupPath);
  console.log('Data restore completed.');
}

// Call the main function
handleDataBackupRestore();

/*
 * This script handles data backup and restore using tar and gzip.
 * It includes error handling and logging for better understanding and debugging.
 * The backup and restore functions are designed to be reusable and can be extended for other backup methods.
 *
 * Error handling is done using try-catch blocks to catch and log any errors that occur during backup or restore.
 * Logging is used to provide feedback on the progress and any errors that occur.
 *
 * To use this script, ensure that the 'data' directory exists in the same directory as this script.
 * The backup file will be created in the same directory as this script.
 *
 * To restore data, provide the path to the backup file as an argument to the restoreData function.
 *
 * This script can be extended to support other backup methods or to handle different types of data.
 */