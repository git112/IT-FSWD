import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import './styles.css';

// Sample blog data (could be moved to a separate file if needed)
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    excerpt: "Learn the fundamentals of React in this comprehensive guide.",
    content: "React is a JavaScript library for building user interfaces...",
    date: "2023-05-15",
    author: "Jane Doe"
  },
  {
    id: 2,
    title: "Advanced State Management",
    excerpt: "Explore Context API and Redux for complex state needs.",
    content: "As your React applications grow, you'll need better state management...",
    date: "2023-06-22",
    author: "John Smith"
  }
];

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList posts={blogPosts} />} />
            <Route path="/blog/:id" element={<BlogPost posts={blogPosts} />} />
          </Routes>
        </div>
        <footer className="footer">
          © {new Date().getFullYear()} Minimal Blog. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;