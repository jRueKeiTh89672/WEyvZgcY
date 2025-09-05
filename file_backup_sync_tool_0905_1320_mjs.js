// 代码生成时间: 2025-09-05 13:20:48
const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Synchronizes the source folder with the destination folder
 *
 * @param {string} sourcePath - The path to the source directory
 * @param {string} destinationPath - The path to the destination directory
 */
async function synchronizeFolders(sourcePath, destinationPath) {
  try {
    const files = glob.sync('*', { cwd: sourcePath, nodir: true });
    for (const file of files) {
      const sourceFile = path.join(sourcePath, file);
      const destinationFile = path.join(destinationPath, file);
      if (fs.existsSync(destinationFile)) {
        // If the file exists in the destination, overwrite it
        fs.copyFileSync(sourceFile, destinationFile);
        console.log(`Updated: ${destinationFile}`);
      } else {
        // If the file does not exist in the destination, copy it
        fs.copyFileSync(sourceFile, destinationFile);
        console.log(`Created: ${destinationFile}`);
      }
    }
  } catch (error) {
    console.error(`Error synchronizing folders: ${error.message}`);
  }
}

/**
 * Removes files from the destination folder that do not exist in the source folder
 *
 * @param {string} sourcePath - The path to the source directory
 * @param {string} destinationPath - The path to the destination directory
 */
function removeOrphanedFiles(sourcePath, destinationPath) {
  try {
    const destinationFiles = glob.sync('*', { cwd: destinationPath, nodir: true });
    for (const file of destinationFiles) {
      const sourceFile = path.join(sourcePath, file);
      const destinationFile = path.join(destinationPath, file);
      if (!fs.existsSync(sourceFile)) {
        // If the file does not exist in the source, remove it from the destination
        fs.unlinkSync(destinationFile);
        console.log(`Deleted: ${destinationFile}`);
      }
    }
  } catch (error) {
    console.error(`Error removing orphaned files: ${error.message}`);
  }
}

/**
 * The main function to backup and synchronize files between folders
 *
 * @param {string} sourcePath - The path to the source directory
 * @param {string} destinationPath - The path to the destination directory
 */
async function backupAndSync(sourcePath, destinationPath) {
  try {
    // Ensure the destination folder exists
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
      console.log(`Created destination directory: ${destinationPath}`);
    }
    
    await synchronizeFolders(sourcePath, destinationPath);
    removeOrphanedFiles(sourcePath, destinationPath);
    console.log('Backup and synchronization completed successfully.');
  } catch (error) {
    console.error(`Error during backup and synchronization: ${error.message}`);
  }
}

// Usage example:
// backupAndSync('/path/to/source', '/path/to/destination');