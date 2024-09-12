import Movie from '../Movie/Movie';
import { Row, Col, Spin, Alert } from 'antd';
import { useState, useEffect } from 'react';
import './MoviesList.css';

// текст обработка
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  return `${truncated.slice(0, lastSpaceIndex)}...`;
};

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = '1a2b96f291c61ca53ff512f515be0737';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (!navigator.onLine) {
        setError('Нет сети, проверьте подключение к интернету.');
        setLoading(false);
        return;
      }

      try {
        const [moviesResponse, genresResponse] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`),
        ]);

        if (!moviesResponse.ok || !genresResponse.ok) {
          throw new Error('Ошибка сети');
        }
        const [moviesData, genresData] = await Promise.all([moviesResponse.json(), genresResponse.json()]);

        setMovies(moviesData.results);
        setGenres(genresData.genres);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message="Ошибка" description={error} type="error" showIcon />;
  }

  return (
    <Row gutter={[0, 0]} className="movies-list-container">
      {movies.slice(0, 6).map((movie) => (
        <Col key={movie.id} span={12}>
          <Movie
            title={movie.title}
            overview={truncateText(movie.overview, 250)}
            release_date={movie.release_date}
            genre_ids={movie.genre_ids || []}
            poster_path={movie.poster_path}
            genres={genres}
          />
        </Col>
      ))}
    </Row>
  );
};

export default MoviesList;
