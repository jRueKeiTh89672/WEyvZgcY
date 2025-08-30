// 代码生成时间: 2025-08-30 21:07:09
 * Features:
 * - Clear code structure for easy understanding
 * - Error handling for robustness
 * - Documentation and comments for maintainability
 * - Adherence to JavaScript best practices
 * - Ensuring code maintainability and extensibility
 */

// Import necessary modules and dependencies
const graphql = require('gatsby/graphql'); // GraphQL for query operations

// Define a GraphQL type for JSON transformation
const JsonTransformerType = new graphql.GraphQLObjectType({
  name: 'JsonTransformer',
  fields: {
    // Field to convert a JSON string to camelCase properties
    camelCase: {
      type: graphql.GraphQLString,
      args: {
        json: { type: graphql.GraphQLString },
      },
      resolve(parent, { json }) {
        try {
          // Parse the JSON string
          const parsedJson = JSON.parse(json);
          // Convert to camelCase
          const camelCasedJson = Object.keys(parsedJson).reduce((acc, key) => {
            const camelCasedKey = key.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
            acc[camelCasedKey] = parsedJson[key];
            return acc;
          }, {});
          return JSON.stringify(camelCasedJson);
        } catch (error) {
          // Handle parsing errors
          throw new Error('Invalid JSON input');
        }
      },
    },
    // Add more transformation fields as needed
  },
});

// Export the GraphQL type for use in Gatsby
module.exports = JsonTransformerType;
