// 代码生成时间: 2025-08-29 15:56:42
// Destructure the required modules
const fs = require('fs');
const path = require('path');

// Define the configuration file path
const configPath = path.join(__dirname, 'config.json');

/**
 * Loads the configuration file synchronously.
 *
 * @returns {Object} - The configuration object.
 * @throws {Error} - If the configuration file does not exist.
 */
function loadConfig() {
  try {
    // Check if the configuration file exists
    if (!fs.existsSync(configPath)) {
      throw new Error('Configuration file not found.');
    }
    
    // Read the configuration file
    const configFile = fs.readFileSync(configPath, 'utf8');
    
    // Parse the configuration file
    return JSON.parse(configFile);
  } catch (error) {
    // Handle any errors that occur during loading
    console.error('Failed to load configuration:', error.message);
    throw error;
  }
}

/**
 * Saves the configuration object to the configuration file.
 *
 * @param {Object} config - The configuration object to save.
 * @returns {void}
 * @throws {Error} - If there is an issue saving the configuration.
 */
function saveConfig(config) {
  try {
    // Write the configuration object to the file
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
  } catch (error) {
    // Handle any errors that occur during saving
    console.error('Failed to save configuration:', error.message);
    throw error;
  }
}

// Export the functions for use in other modules
module.exports = {
  loadConfig,
  saveConfig
};