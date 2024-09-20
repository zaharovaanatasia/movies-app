import './NewMoviesSearch.css';
import { useState } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const NewMoviesSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-container">
      <Input placeholder="Search for movies..." value={query} onChange={handleInputChange} allowClear />
    </div>
  );
};

NewMoviesSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default NewMoviesSearch;
