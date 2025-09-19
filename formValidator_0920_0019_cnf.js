// 代码生成时间: 2025-09-20 00:19:41
const formValidator = (formData) => {
  // 定义验证规则
  const rules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    email: {
      required: true,
      emailPattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    age: {
      required: true,
      number: true,
      min: 18,
      max: 120,
    },
  };

  // 定义验证结果对象
  const validationResult = {
    isValid: true,
    errors: [],
  };

  // 遍历formData对每个字段进行验证
  Object.keys(formData).forEach((field) => {
    if (rules[field]) {
      const fieldRules = rules[field];
      // 检查字段是否为必填项
      if (fieldRules.required && !formData[field]) {
        validationResult.errors.push(`The ${field} field is required.`);
        validationResult.isValid = false;
      }
      // 检查字符串字段的长度
      if (typeof formData[field] === 'string') {
        if (fieldRules.minLength && formData[field].length < fieldRules.minLength) {
          validationResult.errors.push(`The ${field} must be at least ${fieldRules.minLength} characters long.`);
          validationResult.isValid = false;
        }
        if (fieldRules.maxLength && formData[field].length > fieldRules.maxLength) {
          validationResult.errors.push(`The ${field} must be no more than ${fieldRules.maxLength} characters long.`);
          validationResult.isValid = false;
        }
      }
      // 检查邮箱格式是否正确
      if (field === 'email' && !fieldRules.emailPattern.test(formData[field])) {
        validationResult.errors.push('The email address is invalid.');
        validationResult.isValid = false;
      }
      // 检查数字字段的范围
      if (typeof formData[field] === 'number' && fieldRules.number) {
        if (fieldRules.min && formData[field] < fieldRules.min) {
          validationResult.errors.push(`The ${field} must be at least ${fieldRules.min}.`);
          validationResult.isValid = false;
        }
        if (fieldRules.max && formData[field] > fieldRules.max) {
          validationResult.errors.push(`The ${field} must be no more than ${fieldRules.max}.`);
          validationResult.isValid = false;
        }
      }
    }
  });

  // 返回验证结果
  return validationResult;
};

// 使用示例
const formData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: 25,
};

const result = formValidator(formData);
console.log(result);
