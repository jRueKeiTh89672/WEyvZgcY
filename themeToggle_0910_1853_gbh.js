// 代码生成时间: 2025-09-10 18:53:28
// 引入Gatsby的useTheme和useLocalStorage等Hook函数
import React, { useTheme, useLocalStorage } from 'gatsby';

// 主题切换组件
const ThemeToggle = () => {
  // 使用useTheme Hook获取当前的主题
  const [theme, setTheme] = useTheme();

  // 使用useLocalStorage Hook存储主题信息
  const [themeKey, setThemeKey] = useLocalStorage('theme', 'light'); // 默认主题为light

  // 切换主题的函数
  const toggleTheme = () => {
    // 检查当前主题
    if (themeKey === 'light') {
      setThemeKey('dark'); // 切换到dark主题
    } else {
      setThemeKey('light'); // 切换到light主题
    }
  };

  // 处理组件挂载和更新时的主题应用
  React.useEffect(() => {
    // 根据本地存储的主题信息设置主题
    setTheme(themeKey);
  }, [themeKey, setTheme]);

  // 返回主题切换按钮
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        backgroundColor: themeKey === 'light' ? '#FFFFFF' : '#333333',
        color: themeKey === 'light' ? '#333333' : '#FFFFFF',
      }}>
      {themeKey === 'light' ? 'Dark mode' : 'Light mode'}
    </button>
  );
};

export default ThemeToggle;