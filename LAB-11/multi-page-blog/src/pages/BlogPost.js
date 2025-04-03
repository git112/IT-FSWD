import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogPost = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) return <div className="not-found">Post not found</div>;

  return (
    <div className="blog-post">
      <article>
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span className="date">{post.date}</span>
          <span className="author">By {post.author}</span>
        </div>
        <div className="post-content">
          <p>{post.content}</p>
        </div>
        <Link to="/blog" className="back-link">← Back to all posts</Link>
      </article>
    </div>
  );
};

export default BlogPost;