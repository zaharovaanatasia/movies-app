import { useState, useEffect, useContext } from 'react';
import { Layout, Spin, Alert, Tabs } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { debounce } from 'lodash';
import MoviesList from '../MoviesList';
import NewMoviesSearch from '../NewMoviesSearch';
import PaginationPages from '../PaginationPages';
import { FetchMovies, CreateGuestSession, RateMovie, FetchRatedMovies } from '../../api';
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
  const [ratedMovies, setRatedMovies] = useState([]);
  const [activeKey, setActiveKey] = useState('1');

  const genres = useContext(GenresContext);

  // загрузка фильмов
  const onloadMovies = async (query, page) => {
    setLoading(true);
    setError(null);
    console.log(`Loading movies for query: "${query}" on page: ${page}`);

    try {
      const data = await FetchMovies(query, page);
      console.log(`Movies fetched: ${data.results.length} results on page ${page}`);
      setMovies(data.results.map((movie) => ({ ...movie, rating: 0 })));
      setTotal(data.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedLoadMovies = debounce(onloadMovies, 1000);

  useEffect(() => {
    const initializeGuestSession = async () => {
      try {
        const sessionId = await CreateGuestSession();
        console.log('Guest session created:', sessionId);
        setGuestSessionId(sessionId);
      } catch (error) {
        console.error('Failed to create guest session:', error);
        setError('Не удалось создать гостевую сессию');
      }
    };

    initializeGuestSession();
  }, []);

  // обновление поиска
  const onSearch = (query) => {
    console.log(`Search query updated: "${query}"`);
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // переключение страниц
  const onPageChange = (page) => {
    console.log(`Page changed to: ${page}`);
    setCurrentPage(page);

    if (mode === 'rated') {
      onLoadRatedMovies(guestSessionId, page);
    }
  };

  // изменения рейтинга
  const onChangeRating = async (movieId, newRating) => {
    console.log(`Changing rating for movie ID ${movieId} to ${newRating}`);
    try {
      await RateMovie(movieId, newRating, guestSessionId);
      setMovies((prevMovies) =>
        prevMovies.map((movie) => (movie.id === movieId ? { ...movie, rating: newRating } : movie))
      );
      console.log(`Successfully rated movie ID ${movieId} with rating ${newRating}`);
    } catch (error) {
      console.error('Failed to save rating:', error);
      setError('Не удалось сохранить рейтинг');
    }
  };

  // загрузка оцененных фильмов
  const onLoadRatedMovies = async (guestSessionId, page) => {
    setLoading(true);
    setError(null);
    console.log(`Loading rated movies for guest session ID: ${guestSessionId} on page: ${page}`);

    try {
      const data = await FetchRatedMovies(guestSessionId, page);
      console.log(`Rated movies fetched: ${data.results.length} results on page ${page}`);
      setRatedMovies(data.results);
      setTotal(data.total_results);
      setCurrentPage(page);
      console.log(`Rated movies fetched: ${data.results.length} results on page ${page}`);
    } catch (error) {
      console.error('Failed to load rated movies:', error);
      setError('Не удалось загрузить оценённые фильмы');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode === 'search') {
      if (searchQuery.trim()) {
        debouncedLoadMovies(searchQuery, currentPage);
      } else {
        onloadMovies('', currentPage);
      }
    } else if (mode === 'rated' && guestSessionId) {
      onLoadRatedMovies(guestSessionId, currentPage);
    }
  }, [searchQuery, currentPage, mode, guestSessionId, debouncedLoadMovies]);

  if (loading) {
    return <Spin style={{ display: 'block', margin: '20px auto' }} />;
  }

  if (error) {
    return <Alert message="Ошибка" description={error} type="error" showIcon />;
  }

  if (!movies.length) {
    return <Alert message="Нет результатов" description="Попробуйте изменить запрос" type="info" showIcon />;
  }

  const handleTabChange = (key) => {
    console.log(`Tab changed to: ${key}`);
    setMode(key === '1' ? 'search' : 'rated');
    setActiveKey(key);
    setCurrentPage(1);

    if (key === '2') {
      onLoadRatedMovies(guestSessionId, 1);
    }
  };

  const items = [
    {
      key: '1',
      label: 'Search',
      children: (
        <>
          <NewMoviesSearch onSearch={onSearch} style={{ marginBottom: 15 }} />
          <MoviesList
            movies={movies}
            loading={loading}
            error={error}
            total={total}
            onChangeRating={onChangeRating}
            genres={genres}
          />
          <PaginationPages currentPage={currentPage} total={total} onPageChange={onPageChange} />
        </>
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: (
        <>
          <MoviesList
            movies={ratedMovies}
            loading={loading}
            error={error}
            total={total}
            genres={genres}
            onChangeRating={onChangeRating}
          />
          <PaginationPages currentPage={currentPage} total={total} onPageChange={onPageChange} />
        </>
      ),
    },
  ];

  return (
    <Layout>
      <Content
        style={{
          maxWidth: '1130px',
          margin: '0 auto',
          padding: '0 15px',
        }}
      >
        <Tabs activeKey={activeKey} centered items={items} onChange={handleTabChange} />
      </Content>
    </Layout>
  );
}

export default App;
