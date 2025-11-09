import React, { Fragment, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BlogData } from "../../data.mjs";
import { loadMarkdown } from "../../utils/markdownConverter";
import { BlogMarkdownRenderer } from "../../utils/markdownRendererWrapper";
import styles from './BlogDetail.module.css';
import Dots from "../../Components/dots/Dots";
import { BlogThemeProvider, useBlogTheme } from './BlogThemeContext';
import BlogThemeToggle from './BlogThemeToggle';

const BlogDetailContent = () => {
    const { slug } = useParams();
    const [markdownContent, setMarkdownContent] = useState("");
    const [loading, setLoading] = useState(true);
    const { theme } = useBlogTheme();
    
    const blog = BlogData.blogs.find(b => b.slug === slug);

    useEffect(() => {
        if (blog) {
            loadMarkdown(blog.markdownFile)
                .then(content => {
                    setMarkdownContent(content);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error loading markdown:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [blog]);

    if (!blog) {
        return (
            <Fragment>
                <section id={styles.blogDetail} data-blog-theme={theme}>
                    <div className={styles.maincontent}>
                        <div className={styles.notFound}>
                            <h1>Blog Post Not Found</h1>
                            <p>The blog post you're looking for doesn't exist.</p>
                            <Link to="/blogs" className={styles.backButton}>
                                ← Back to Blogs
                            </Link>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }

    // Apply theme to body
    React.useEffect(() => {
        document.body.setAttribute('data-blog-theme', theme);
        return () => {
            document.body.removeAttribute('data-blog-theme');
        };
    }, [theme]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <Fragment>
            <section id={styles.blogDetail} data-blog-theme={theme}>
                <div className={styles.maincontent}>
                    <div className={styles.upperpart}>
                        <Link to="/blogs" className={styles.backLink}>
                            ← Back to Blogs
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <BlogThemeToggle />
                            <div className={styles.circles}>
                                <Dots />
                            </div>
                        </div>
                    </div>

                    <article className={styles.blogArticle}>
                        <header className={styles.blogHeader}>
                            <h1 className={styles.blogTitle}>{blog.title}</h1>
                            <div className={styles.blogMeta}>
                                <span className={styles.blogDate}>{formatDate(blog.date)}</span>
                                <span className={styles.blogSeparator}>•</span>
                                <span className={styles.blogReadTime}>{blog.readTime}</span>
                                <span className={styles.blogSeparator}>•</span>
                                <span className={styles.blogAuthor}>
                                    By {blog.authorLink ? (
                                        <a 
                                            href={blog.authorLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={styles.authorLink}
                                        >
                                            {blog.author}
                                        </a>
                                    ) : (
                                        blog.author
                                    )}
                                </span>
                            </div>
                        </header>

                        <div className={styles.blogContent}>
                            {loading ? (
                                <div className={styles.loading}>
                                    <p>Loading blog content...</p>
                                </div>
                            ) : (
                                <BlogMarkdownRenderer markdown={markdownContent} />
                            )}
                        </div>
                    </article>
                </div>
            </section>
        </Fragment>
    );
};

const BlogDetail = () => {
    return (
        <BlogThemeProvider>
            <BlogDetailContent />
        </BlogThemeProvider>
    );
};

export default BlogDetail;

