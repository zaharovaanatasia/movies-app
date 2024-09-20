import { useState, useEffect, useContext } from 'react';
import { Layout, Spin, Alert, Radio } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { debounce } from 'lodash';
import MoviesList from '../MoviesList/MoviesList';
import NewMoviesSearch from '../NewMoviesSearch/NewMoviesSearch';
import PaginationPages from '../PaginationPages/PaginationPages';
import { FetchMovies, CreateGuestSession } from '../../api';
import { GenresContext } from '../GenresContext';
import '../App/App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [guestSessionId, setGuestSessionId] = useState(null);
  const [mode, setMode] = useState('search');
  
  const genres = useContext(GenresContext);

  const loadMovies = async (query, page) => {
    setLoading(true);
    setError(null);

    try {
      const data = await FetchMovies(query, page);
      setMovies(data.results.map((movie) => ({ ...movie, rating: 0 })));
      setTotal(data.total_pages);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedLoadMovies = debounce(loadMovies, 1000);

  useEffect(() => {
    const initializeGuestSession = async () => {
      try {
        const sessionId = await CreateGuestSession();
        setGuestSessionId(sessionId);
      } catch (error) {
        setError('Не удалось создать гостевую сессию', error);
      }
    };

    initializeGuestSession();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      debouncedLoadMovies(searchQuery, currentPage);
    } else {
      loadMovies('', currentPage);
    }
  }, [searchQuery, currentPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRatingChange = (movieId, newRating) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) => (movie.id === movieId ? { ...movie, rating: newRating } : movie))
    );
  };

  if (loading) {
    return <Spin style={{ display: 'block', margin: '20px auto' }} />;
  }

  if (error) {
    return <Alert message="Ошибка" description={error} type="error" showIcon />;
  }

  if (!movies.length) {
    return <Alert message="Нет результатов" description="Попробуйте изменить запрос" type="info" showIcon />;
  }

  return (
    <Layout>
      <Content>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <Radio.Group defaultValue="search" buttonStyle="solid" onChange={(e) => setMode(e.target.value)}>
            <Radio.Button value="search">Search</Radio.Button>
            <Radio.Button value="rated">Rated</Radio.Button>
          </Radio.Group>
        </div>

        {mode === 'search' ? (
          <>
            <NewMoviesSearch onSearch={handleSearch} />
            <MoviesList
              movies={movies}
              loading={loading}
              error={error}
              total={total}
              onChangeRating={handleRatingChange}
              genres={genres}
            />
            <PaginationPages current={currentPage} total={total * 10} onPageChange={handlePageChange}></PaginationPages>
          </>
        ) : (
          <>
            <MoviesList movies={movies} loading={loading} error={error} total={total} genres={genres} />
            <PaginationPages current={currentPage} total={total} onPageChange={handlePageChange}></PaginationPages>
          </>
        )}
      </Content>
    </Layout>
  );
}

export default App;
