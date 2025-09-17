// 代码生成时间: 2025-09-17 23:09:03
 * documentation, and following best practices for maintainability and scalability.
 */

// Import necessary Gatsby and Node.js modules
const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp'); // Sharp is a high-performance Node.js library used for image processing.

// Function to resize an image
async function resizeImage(inputPath, outputPath, targetWidth, targetHeight) {
  try {
    // Ensure the input file exists
    await checkFileExists(inputPath);

    // Use sharp to resize the image
    await sharp(inputPath)
      .resize({
        width: targetWidth,
        height: targetHeight,
        withoutEnlargement: true // Do not enlarge the image if it is smaller than the target size
      })
      .toFile(outputPath);

    console.log(`Image resized and saved to ${outputPath}`);
  } catch (error) {
    console.error('Error resizing image:', error);
  }
}

// Function to check if a file exists
async function checkFileExists(filePath) {
  try {
    await fs.access(filePath, fs.constants.F_OK);
  } catch (error) {
    throw new Error(`File not found: ${filePath}`);
  }
}

// Function to batch resize images in a directory
async function batchResizeImages(directoryPath, targetWidth, targetHeight, outputDirectory) {
  try {
    // Ensure the output directory exists or create it
    await ensureDirectoryExists(outputDirectory);

    // Read all files in the directory
    const files = await fs.readdir(directoryPath);

    // Loop through each file and resize the image
    for (const file of files) {
      const inputPath = path.join(directoryPath, file);
      const outputPath = path.join(outputDirectory, file);
      await resizeImage(inputPath, outputPath, targetWidth, targetHeight);
    }
  } catch (error) {
    console.error('Error during batch resize:', error);
  }
}

// Function to ensure a directory exists, if not create it
async function ensureDirectoryExists(directoryPath) {
  try {
    await fs.access(directoryPath);
  } catch (error) {
    await fs.mkdir(directoryPath, { recursive: true });
  }
}

// Example usage of batchResizeImages function
// batchResizeImages('./src/images', 800, 600, './public/resized-images')

// Export the batchResizeImages function for use in other modules
module.exports = { batchResizeImages };
