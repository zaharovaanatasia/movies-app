import { useState } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const NewMoviesSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const onInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Input
      placeholder="Search for movies..."
      value={query}
      onChange={onInputChange}
      allowClear
      className="input-margin"
    />
  );
};

NewMoviesSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default NewMoviesSearch;
