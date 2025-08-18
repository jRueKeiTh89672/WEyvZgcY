// 代码生成时间: 2025-08-19 01:43:40
const React = require('react');

// A Gatsby Theme context that allows consumers to toggle between light and dark themes
const ThemeContext = React.createContext({
  // The current theme
  theme: 'light',
  // Function to toggle the theme
  toggleTheme: () => {},
});

// Theme provider component that provides the theme and toggle function to its children
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState('light');

  // Toggles the theme between light and dark
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Return the ThemeProvider component with the theme and toggle function as value
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};

// A custom hook to use the theme and toggle function
const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

// ThemeSwitcher component that uses the ThemeProvider to toggle the theme
const ThemeSwitcher = () => {
  const { toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {'Switch Theme'}
    </button>
  );
};

module.exports = { ThemeProvider, ThemeSwitcher, useTheme };

// Documentation
/**
 * @module themeSwitcher
 * @description Provides a theme switching functionality for Gatsby applications.
 * @exports ThemeProvider, ThemeSwitcher, useTheme
 *
 * @example
 * // Usage within a Gatsby component
 * // Wrap your application with the ThemeProvider
 * <ThemeProvider>
 *   <YourApp />
 * </ThemeProvider>
 *
 * // Use the ThemeSwitcher component to toggle the theme
 * const { theme } = useTheme();
 * <ThemeSwitcher />;
 */