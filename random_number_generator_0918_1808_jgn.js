// 代码生成时间: 2025-09-18 18:08:53
 * Features:
 * - Generates a random integer between a specified minimum and maximum.
 * - Provides error handling for invalid inputs.
 */

'use strict';

// Function to generate a random integer between min and max
function generateRandomNumber(min, max) {
  // Check if inputs are valid numbers
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Both minimum and maximum values must be numbers.');
  }
  // Check if min is less than or equal to max
  if (min > max) {
    throw new Error('Minimum value must be less than or equal to the maximum value.');
  }
  
  // Generate and return the random number
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Export the function for use in other parts of the Gatsby project
module.exports = {
  generateRandomNumber
};