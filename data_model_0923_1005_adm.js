// 代码生成时间: 2025-09-23 10:05:39
const graphql = require('gatsby').graphql;
const { Schema } = require('prosemirror-model');

// 数据模型的定义
// 使用 Gatsby 的 GraphQL API 和 Prosemirror 的 Schema
// 来创建和管理数据模型

// 定义节点类型
const nodes = {
# NOTE: 重要实现细节
  // 文章节点
# FIXME: 处理边界情况
  article: {
    type: 'doc',
    content: 'paragraph block*',
  },

  // 段落节点
  paragraph: {
    type: 'block',
    content: 'inline*',
  },

  // 块级内容节点
# 扩展功能模块
  block: {
    type: 'block',
    content: '',
  },

  // 行内内容节点
  inline: {
    type: 'inline',
    content: '',
  },
};

// 定义节点属性
const marks = {
  // 粗体标记
  strong: {
    type: 'mark',
    attrs: {
      open: { default: true },
    },
  },

  // 斜体标记
  em: {
    type: 'mark',
    attrs: {
      open: { default: true },
    },
  },
# NOTE: 重要实现细节
};
# 扩展功能模块

// 创建 Schema
const schema = new Schema({
  nodes,
  marks,
});

// 数据模型的 GraphQL 查询
// 用于在 Gatsby 项目中查询文章数据
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const result = await graphql(
    """
      query {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                title
                date
# 优化算法效率
              }
              html
            }
          }
# NOTE: 重要实现细节
        }
      }
    """
  );

  if (result.errors) {
    throw new Error("Error loading articles");
  }

  // 创建文章页面
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.title,
      component: require.resolve('./src/templates/article.js'),
      context: {
        id: node.id,
      },
    });
  });
};

// 导出 Schema
module.exports = {
  schema,
  createPages,
};
# 改进用户体验
