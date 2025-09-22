// 代码生成时间: 2025-09-23 00:33:37
const axios = require('axios');
const cheerio = require('cheerio'); // To parse and extract content from HTML
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const { store } = require('gatsby');
# NOTE: 重要实现细节
const { createNodeId } = require('gatsby-core-utils');
const fs = require('fs-extra');
# FIXME: 处理边界情况
const path = require('path');

// Configuration for the scraper
const config = {
  url: 'https://example.com',
  selector: 'article',
  fileRelativePath: 'relative/path/to/save',
  filetype: 'html',
  timeout: 5000,
};

/**
 * Scrape content from a given URL.
 * @param {string} url - The URL to scrape from.
 * @param {string} selector - The CSS selector to use for extracting content.
 * @returns {Promise} A promise that resolves with the scraped content.
 */
const scrapeContent = async (url, selector) => {
  try {
# FIXME: 处理边界情况
    const response = await axios.get(url, { timeout: config.timeout });
    const $ = cheerio.load(response.data);
# 添加错误处理
    const content = $(selector).html();
    return content;
  } catch (error) {
    console.error("Error scraping content: ", error);
    throw error;
  }
};

/**
 * Create a node for the scraped content in Gatsby.
 * @param {string} content - The content to create a node for.
# 扩展功能模块
 * @param {string} relativePath - The relative path to save the file.
 * @param {string} filetype - The type of file to create.
 * @returns {Promise} A promise that resolves with the created node.
 */
# TODO: 优化性能
const createContentNode = async (content, relativePath, filetype) => {
  const fileNode = await createRemoteFileNode({
    url: config.url,
    parentNodeId: null,
    createNode: store.actions.createNode,
    createNodeId,
    getCache,
    store,
  });

  const node = {
    id: createNodeId(`scraper-${fileNode.id}`),
    parent: null,
    children: [],
    internal: {
# 增强安全性
      type: 'ScrapedContent',
      contentDigest: fileNode.internal.contentDigest,
    },
    localFile___NODE: fileNode.id,
    content,
  };

  // Save the file to the filesystem
  const filePath = path.join(store.getState().program.directory, relativePath);
# 添加错误处理
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content, { encoding: 'utf8' });

  // Create the node in Gatsby
  store.actions.createNode(node, { name: 'gatsby-source-filesystem' });
  store.actions.createParentChildLink({
    parent: fileNode,
    child: node,
  });
  return node;
};

/**
 * Main function to run the scraper.
 * @param {object} options - Configuration options for the scraper.
# 增强安全性
 * @returns {Promise} A promise that resolves with the scraped content node.
 */
exports.onPreBootstrap = async ({ reporter }, options) => {
  try {
# 改进用户体验
    if (!options.url || !options.selector) {
      reporter.panic("Please provide both 'url' and 'selector' in the plugin options.");
    }

    const content = await scrapeContent(options.url, options.selector);
    const relativePath = options.fileRelativePath || config.fileRelativePath;
    const filetype = options.filetype || config.filetype;
    await createContentNode(content, relativePath, filetype);

    reporter.info(`Scraped content from ${options.url} and saved to ${relativePath}.`);
  } catch (error) {
# 改进用户体验
    reporter.panic(`Failed to scrape content: ${error.message}`);
  }
};
