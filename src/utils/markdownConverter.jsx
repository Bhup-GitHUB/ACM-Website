import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

/**
 * Converts markdown string to React components
 * @param {Object} props - Component props
 * @param {string} props.markdown - The markdown content to convert
 * @returns {JSX.Element} - React component with rendered markdown
 */
export const MarkdownRenderer = ({ markdown }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        // Custom styling for markdown elements
        h1: ({ ...props }) => (
          <h1
            style={{
              fontFamily: "var(--titleFont)",
              color: "var(--blue)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginTop: "2rem",
              marginBottom: "1rem",
              fontWeight: 700,
            }}
            {...props}
          />
        ),
        h2: ({ ...props }) => (
          <h2
            style={{
              fontFamily: "var(--titleFont)",
              color: "var(--d-blue)",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
              fontWeight: 600,
            }}
            {...props}
          />
        ),
        h3: ({ ...props }) => (
          <h3
            style={{
              fontFamily: "var(--titleFont)",
              color: "var(--d-blue)",
              fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
              marginTop: "1.25rem",
              marginBottom: "0.5rem",
              fontWeight: 600,
            }}
            {...props}
          />
        ),
        p: ({ ...props }) => (
          <p
            style={{
              fontFamily: "var(--textFont)",
              color: "var(--black)",
              fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)",
              lineHeight: "1.8",
              marginBottom: "1rem",
            }}
            {...props}
          />
        ),
        ul: ({ ...props }) => (
          <ul
            style={{
              fontFamily: "var(--textFont)",
              color: "var(--black)",
              marginLeft: "1.5rem",
              marginBottom: "1rem",
              lineHeight: "1.8",
            }}
            {...props}
          />
        ),
        ol: ({ ...props }) => (
          <ol
            style={{
              fontFamily: "var(--textFont)",
              color: "var(--black)",
              marginLeft: "1.5rem",
              marginBottom: "1rem",
              lineHeight: "1.8",
            }}
            {...props}
          />
        ),
        li: ({ ...props }) => (
          <li
            style={{
              marginBottom: "0.5rem",
              fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)",
            }}
            {...props}
          />
        ),
        code: ({ inline, ...props }) => (
          <code
            style={{
              backgroundColor: "var(--a-blue)",
              padding: inline ? "0.2rem 0.4rem" : "1rem",
              borderRadius: "4px",
              fontFamily: "monospace",
              fontSize: "0.9em",
              color: "var(--d-blue)",
              display: inline ? "inline" : "block",
              overflow: "auto",
              marginBottom: inline ? 0 : "1rem",
            }}
            {...props}
          />
        ),
        pre: ({ ...props }) => (
          <pre
            style={{
              backgroundColor: "var(--a-blue)",
              padding: "1rem",
              borderRadius: "8px",
              overflow: "auto",
              marginBottom: "1rem",
              border: "1px solid var(--p-blue)",
            }}
            {...props}
          />
        ),
        blockquote: ({ ...props }) => (
          <blockquote
            style={{
              borderLeft: "4px solid var(--blue)",
              paddingLeft: "1rem",
              marginLeft: "0",
              marginBottom: "1rem",
              fontStyle: "italic",
              color: "var(--gray)",
              fontFamily: "var(--textFont)",
            }}
            {...props}
          />
        ),
        a: ({ ...props }) => (
          <a
            style={{
              color: "var(--blue)",
              textDecoration: "none",
              fontWeight: 500,
            }}
            {...props}
            target="_blank"
            rel="noopener noreferrer"
          />
        ),
        strong: ({ ...props }) => (
          <strong
            style={{
              color: "var(--d-blue)",
              fontWeight: 600,
            }}
            {...props}
          />
        ),
        em: ({ ...props }) => (
          <em
            style={{
              fontStyle: "italic",
              color: "var(--black)",
            }}
            {...props}
          />
        ),
        hr: ({ ...props }) => (
          <hr
            style={{
              border: "none",
              borderTop: "2px solid var(--p-blue)",
              margin: "2rem 0",
            }}
            {...props}
          />
        ),
        img: ({ ...props }) => (
          <img
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              margin: "1rem 0",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            {...props}
          />
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

/**
 * Loads markdown content from a file
 * @param {string} filename - The markdown filename
 * @returns {Promise<string>} - The markdown content
 */
export const loadMarkdown = async (filename) => {
  try {
    const response = await fetch(`/blogs/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to load markdown: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Error loading markdown:", error);
    return `# Error\n\nCould not load the blog post content. Please try again later.`;
  }
};
