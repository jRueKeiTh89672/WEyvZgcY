// 代码生成时间: 2025-08-21 15:54:14
// Import necessary Gatsby dependencies
const { GatsbyNode } = require(`gatsby`);

// Define a simple in-memory store for user permissions
// In a real-world scenario, you'd likely be fetching this from a database
const userPermissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read'],
  guest: [],
};

// Function to check if a user has a specific permission
function hasPermission(username, permission) {
  if (!userPermissions[username]) {
    throw new Error(`User '${username}' not found`);
  }
  return userPermissions[username].includes(permission);
}

// Gatsby Node API for creating pages
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // Check if the page is a user-restricted page and the user has permission
  if (page.path === '/protected-page') {
    try {
      // Simulate user authentication and permissions check
      const username = 'admin'; // This would typically come from the user's session
      if (!hasPermission(username, 'read')) {
        // If the user does not have permission, redirect to the login page
        page.path = '/login';
        return;
      }
    } catch (error) {
      // Handle errors such as user not found
      console.error(error.message);
      page.path = '/error';
      return;
    }
  }

  // Create the page
  createPage(page);
};

// Gatsby Node API for customizing the GraphQL schema
exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Query: {
      // Resolver to check if the current user has a specific permission
      hasPermission: {
        type: `Boolean`,
        resolve(source, { permission }, context) {
          const username = context.username; // The username should be retrieved from the context
          try {
            return hasPermission(username, permission);
          } catch (error) {
            throw new Error(error.message);
          }
        },
      },
    },
  });
};