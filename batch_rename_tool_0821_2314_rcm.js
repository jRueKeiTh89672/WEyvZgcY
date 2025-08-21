// 代码生成时间: 2025-08-21 23:14:51
// batch_rename_tool.js

// A Gatsby Node.js script to batch rename files in a directory

// Usage: This script is meant to be run in a Gatsby project. It will rename files in the specified directory.

// Dependencies: Node.js filesystem module (fs)


const fs = require('fs-extra'); // Use fs-extra for additional methods like ensureDir

const path = require('path'); // For path operations


// Function to rename files in a directory based on a pattern

async function batchRenameFiles(directory, renamePattern) {

  // Check if the directory exists

  if (!await fs.pathExists(directory)) {

    throw new Error(`The directory ${directory} does not exist.`);

  }

  
  // Read the directory contents

  const files = await fs.readdir(directory);

  for (const file of files) {

    try {

      // Construct the full file path

      const filePath = path.join(directory, file);

