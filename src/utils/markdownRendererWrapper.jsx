import React from 'react';
import { useBlogTheme } from '../Pages/Blogs/BlogThemeContext';
import { MarkdownRenderer as BaseMarkdownRenderer } from './markdownConverter';
import '../Pages/Blogs/BlogMarkdown.css';

export const BlogMarkdownRenderer = ({ markdown }) => {
  const { theme } = useBlogTheme();
  
  return (
    <div data-blog-theme={theme} style={{ color: 'inherit' }}>
      <BaseMarkdownRenderer markdown={markdown} />
    </div>
  );
};

