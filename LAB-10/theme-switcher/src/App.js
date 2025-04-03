import React, { createContext, useState, useContext, useEffect } from 'react';
import ThemeToggle from './components/ThemeToggle';
import './styles.css';

// Create context in the same file
const ThemeContext = createContext();

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app">
        <nav className="navbar">
          <h1 className="logo">Theme Switcher</h1>
          <ThemeToggle />
        </nav>
        <main className="main-content">
          <div className="container">
            <h2>Welcome to the Theme Switcher App</h2>
            <p className="theme-info">
              Current theme: <span className="theme-name">{theme}</span>
            </p>
            <div className="card">
              <h3>Hello World</h3>
              <p>
                Have a good day!
              </p>
            </div>
          </div>
        </main>
      </div>
    </ThemeContext.Provider>
  );
};

// Export the context for use in other components
export const useTheme = () => useContext(ThemeContext);
export default App;