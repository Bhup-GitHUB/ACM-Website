import React, { createContext, useContext, useState, useEffect } from 'react';

const BlogThemeContext = createContext();

export const useBlogTheme = () => {
  const context = useContext(BlogThemeContext);
  if (!context) {
    throw new Error('useBlogTheme must be used within BlogThemeProvider');
  }
  return context;
};

export const BlogThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for blog theme preference
    const savedTheme = localStorage.getItem('acm-blog-theme');
    if (savedTheme) return savedTheme;
    
    // Default to light theme
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('acm-blog-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <BlogThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </BlogThemeContext.Provider>
  );
};

