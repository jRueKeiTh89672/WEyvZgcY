// 代码生成时间: 2025-08-06 00:44:12
const escapeHTML = (unsafe) => {
  "use strict";
  // 将特殊字符转换为HTML实体，以防止XSS攻击
  return unsafe
    .replace(/&/g, "")
    .replace(/</g, "")
    .replace(/>/g, "")
    .replace(/"/g, "")
    .replace(/'/g, "")
    .replace(/\//g, "")
    .replace(/
/g, "<br>");
};

// 使用Gatsby的API hooks来过滤XSS
exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  // 在创建页面之前，对页面的HTML内容进行XSS过滤
  page.component = escapeHTML(page.component);

  // 创建页面
  createPage(page);
};

// 可以扩展该模块以包含更多XSS防护措施
// 例如，对用户输入进行过滤
const sanitizeInput = (input) => {
  // 这里可以根据需要添加更多的XSS过滤规则
  return escapeHTML(input);
};

// 使用sanitizeInput函数来清洁用户输入
// 例如，在一个表单处理函数中
const handleFormSubmit = async (data) => {
  try {
    // 清洁表单数据以防止XSS攻击
    const cleanData = Object.keys(data).reduce((acc, key) => {
      acc[key] = sanitizeInput(data[key]);
      return acc;
    }, {});

    // 处理清洁后的数据...
  } catch (error) {
    // 错误处理
    console.error("Error sanitizing form data: ", error);
  }
};

// 请注意，这个简单的XSS防护示例仅供参考
// 在实际应用中，你可能需要使用更复杂和全面的方法，
// 比如使用库（如DOMPurify）或者框架提供的API
