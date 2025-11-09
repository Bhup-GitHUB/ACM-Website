# Blog System Guide

This guide explains how to add new blog posts to the ACM Website.

## How to Add a New Blog Post

### Step 1: Create a Markdown File

1. Create a new markdown file in the `public/blogs/` directory
2. Name it using kebab-case (e.g., `my-awesome-blog-post.md`)
3. Write your blog content in Markdown format

Example:
```markdown
# My Awesome Blog Post

This is the introduction paragraph.

## Section 1

Content here...

### Subsection

More content...
```

### Step 2: Add Blog Metadata

1. Open `src/data.mjs`
2. Find the `BlogData` object
3. Add a new blog object to the `blogs` array:

```javascript
{
  id: "my-awesome-blog-post",
  slug: "my-awesome-blog-post",
  title: "My Awesome Blog Post",
  excerpt: "A brief description of your blog post that will appear in the listing page.",
  date: "2025-01-20", // Format: YYYY-MM-DD
  readTime: "5 min read", // Estimated reading time
  tags: ["Tag1", "Tag2", "Tag3"], // Array of tags
  featured: false, // Set to true to show as featured
  author: "Your Name",
  markdownFile: "my-awesome-blog-post.md" // Must match the filename
}
```

### Step 3: Test Your Blog

1. Start the development server: `npm run dev`
2. Navigate to `/blogs` to see your blog in the listing
3. Click on your blog to view the full post

## Markdown Features Supported

The blog system supports standard Markdown features:

- **Headers**: `# H1`, `## H2`, `### H3`, etc.
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Links**: `[link text](url)`
- **Images**: `![alt text](image-url)`
- **Lists**: Ordered and unordered
- **Code blocks**: Use triple backticks with language
- **Blockquotes**: `> quote text`
- **Horizontal rules**: `---`

## Styling

The blog posts automatically use the ACM Website design theme:
- Colors match the ACM color scheme (blues, grays)
- Fonts use the same typography (Lexend Deca for headings, Poppins for body)
- Responsive design for mobile and desktop

## Tips

- Keep excerpts concise (1-2 sentences)
- Use descriptive tags for better filtering
- Add images to make posts more engaging
- Use code blocks for technical content
- Test your markdown rendering before publishing

## File Structure

```
public/
  blogs/
    welcome-to-acm-blog.md
    getting-started-with-web-development.md
    your-new-blog.md

src/
  Pages/
    Blogs/
      Blogs.jsx          # Blog listing page
      BlogDetail.jsx     # Individual blog post page
      Blogs.module.css
      BlogDetail.module.css
  utils/
    markdownConverter.js # Markdown rendering utility
  data.mjs              # Blog metadata
```

Happy Blogging! 🚀

