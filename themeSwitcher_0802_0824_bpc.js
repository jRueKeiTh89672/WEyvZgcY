// 代码生成时间: 2025-08-02 08:24:16
// Theme constants
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';

// Context for theme
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Theme Provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(THEME_LIGHT); // Default theme is light

  // Function to toggle theme
  const toggleTheme = () => {
    if (theme === THEME_LIGHT) {
      setTheme(THEME_DARK);
    } else {
      setTheme(THEME_LIGHT);
    }
  };

  // Set theme in localStorage to persist theme across sessions
  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Error saving theme to localStorage', error);
    }
  }, [theme]);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme from localStorage', error);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/*
 * Usage in a component:
 * 
 * const { theme, toggleTheme } = useTheme();
 * return (
 *   <div className={theme}>
 *     <button onClick={toggleTheme}>Toggle Theme</button>
 *   </div>
 * );
 */