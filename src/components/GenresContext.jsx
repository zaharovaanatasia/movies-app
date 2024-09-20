import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FetchGenres } from '../api.js';

export const GenresContext = createContext();

export const GenresProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await FetchGenres();
        setGenres(data);
            } catch (error) {
        console.error('Ошибка получения жанров:', error);
      }
    };
    loadGenres();
  }, []);

  return <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>;
};

GenresProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
