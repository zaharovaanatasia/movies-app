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
import { showErrorNotification } from '../../utils.js';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
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

    try {
      const data = await FetchMovies(query, page);

      const moviesWithRatings = data.results.map((movie) => {
        const storedRating = localStorage.getItem(`movie_${movie.id}_rating`);
        return {
          ...movie,
          rating: storedRating ? parseFloat(storedRating) : 0,
        };
      });

      setMovies(moviesWithRatings);
      setTotal(data.total_pages);
    } catch (error) {
      showErrorNotification(error.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedLoadMovies = debounce(onloadMovies, 1000);

  useEffect(() => {
    const initializeGuestSession = async () => {
      try {
        const sessionId = await CreateGuestSession();
        setGuestSessionId(sessionId);
      } catch (error) {
        showErrorNotification('Не удалось создать гостевую сессию', error);
      }
    };

    initializeGuestSession();
  }, []);

  // обновление поиска
  const onSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // переключение страниц
  const onPageChange = (page) => {
    setCurrentPage(page);

    if (mode === 'rated' && guestSessionId) {
      onLoadRatedMovies(guestSessionId, page);
    } else {
      onloadMovies(searchQuery, page);
    }
  };

  // изменения рейтинга
  const onChangeRating = async (movieId, newRating) => {
    try {
      await RateMovie(movieId, newRating, guestSessionId);

      setMovies((prevMovies) =>
        prevMovies.map((movie) => (movie.id === movieId ? { ...movie, rating: newRating } : movie))
      );

      setRatedMovies((prevRatedMovies) =>
        prevRatedMovies.map((movie) => (movie.id === movieId ? { ...movie, rating: newRating } : movie))
      );

      localStorage.setItem(`movie_${movieId}_rating`, newRating);
    } catch (error) {
      showErrorNotification('Не удалось сохранить рейтинг', error);
    }
  };

  // загрузка оцененных фильмов
  const onLoadRatedMovies = async (guestSessionId, page) => {
    setLoading(true);

    try {
      const data = await FetchRatedMovies(guestSessionId, page);

      setRatedMovies(data.results);
      setTotal(data.total_pages);
      setCurrentPage(page);
    } catch (error) {
      showErrorNotification('Не удалось загрузить оценённые фильмы', error);
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
  }, [searchQuery, currentPage, mode, guestSessionId]);

  if (loading) {
    return <Spin style={{ display: 'block', margin: '20px auto' }} />;
  }

  if (!movies.length) {
    return (
      <Alert message="Нет результатов" description="Попробуйте изменить запрос" type="info" showIcon closable={true} />
    );
  }

  const handleTabChange = (key) => {
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
          <MoviesList movies={movies} loading={loading} total={total} onChangeRating={onChangeRating} genres={genres} />
          <PaginationPages currentPage={currentPage} total={total} onPageChange={onPageChange} mode="search" />
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
            total={total}
            genres={genres}
            onChangeRating={onChangeRating}
          />
          <PaginationPages currentPage={currentPage} total={total} onPageChange={onPageChange} mode="rated" />
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
