import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ posts }) => {
  return (
    <div className="blog-list">
      <h2>Latest Articles</h2>
      <div className="posts-grid">
        {posts.map(post => (
          <article key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p className="excerpt">{post.excerpt}</p>
            <div className="post-meta">
              <span className="date">{post.date}</span>
              <span className="author">By {post.author}</span>
            </div>
            <Link to={`/blog/${post.id}`} className="read-more">Read More →</Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogList;