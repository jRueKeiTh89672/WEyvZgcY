// 代码生成时间: 2025-09-04 15:23:55
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('./models/user');  // Assuming a User model is defined elsewhere
const SECRET_KEY = process.env.JWT_SECRET;  // Use environment variable for secret key
const EXPIRATION_TIME = '2h';  // Token expiration time

/**
 * Function to authenticate user
 * @param {Object} credentials - User credentials containing username and password
 * @returns {Promise<Object>} - A promise that resolves with the user data and token
 */
async function authenticateUser(credentials) {
  try {
    // Find user by username
    const user = await User.findOne({
      where: {
        username: credentials.username,
      },
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.passwordHash,
    );
    
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    
    // If user is found and password is valid, create a token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: EXPIRATION_TIME },
    );
    
    // Return user data and token
    return {
      user,
      token,
    };
  } catch (error) {
    // Handle errors
    console.error(error);
    throw error;
  }
}

/**
 * Function to handle login endpoint
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 */
const loginEndpoint = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const { user, token } = await authenticateUser({ username, password });
    
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

module.exports = { loginEndpoint };
