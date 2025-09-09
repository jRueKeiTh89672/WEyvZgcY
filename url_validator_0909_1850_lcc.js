// 代码生成时间: 2025-09-09 18:50:10
const isUrl = require('is-url');

/**
 * Validates a URL string.
 * @param {string} urlString - The URL to validate.
 * @returns {boolean} - True if the URL is valid, false otherwise.
 */
function validateUrl(urlString) {
  // Check if the input is a non-empty string
  if (typeof urlString !== 'string' || urlString.trim() === '') {
    throw new Error('Invalid input: URL must be a non-empty string.');
  }

  // Use the is-url library to check if the string is a valid URL
  return isUrl(urlString);
}

// Example usage:
try {
  const testUrl = 'https://www.example.com';
  const isValid = validateUrl(testUrl);
  console.log(`Is '${testUrl}' a valid URL? ${isValid}`);
} catch (error) {
  console.error(error.message);
}
