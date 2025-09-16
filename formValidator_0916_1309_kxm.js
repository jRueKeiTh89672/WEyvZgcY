// 代码生成时间: 2025-09-16 13:09:02
const formValidator = (data) => {
  // 定义验证规则
  const rules = {
    name: {
      required: true,
      maxLength: 50
    },
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      minLength: 8
    }
  };

  // 存储错误信息
  const errors = {};

  // 遍历规则并验证每个字段
  Object.keys(rules).forEach((key) => {
    const rule = rules[key];
    if (rule.required && !data[key]) {
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
    }
    if (rule.email && data[key] && !/^\S+@\S+\.\S+$/.test(data[key])) {
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is not a valid email`;
    }
    if (rule.minLength && data[key] && data[key].length < rule.minLength) {
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} must be at least ${rule.minLength} characters`;
    }
    if (rule.maxLength && data[key] && data[key].length > rule.maxLength) {
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} cannot exceed ${rule.maxLength} characters`;
    }
  });

  // 返回验证结果
  return { isValid: Object.keys(errors).length === 0, errors };
};

// 示例用法
const formData = { name: 'John Doe', email: 'johndoe@example.com', password: 'password123' };
const validationResult = formValidator(formData);

if (validationResult.isValid) {
  console.log('Form is valid!');
} else {
  console.error('Form validation errors:', validationResult.errors);
}