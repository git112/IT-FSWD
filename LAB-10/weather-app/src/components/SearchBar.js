import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ onSearch, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter city name"
        className="search-input"
      />
      <button 
        type="submit" 
        className="search-button"
        disabled={loading}
      >
        {loading ? (
          <span className="loading-spinner"></span>
        ) : (
          <FiSearch size={20} />
        )}
      </button>
    </form>
  );
};

export default SearchBar;