import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Minimal Blog</h1>
        <p>A clean, modern React blog with routing</p>
        <Link to="/blog" className="cta-button">Explore Articles</Link>
      </section>
    </div>
  );
};

export default Home;