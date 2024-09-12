import Movie from './Movie';
import { Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import './MoviesList.css';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = '1a2b96f291c61ca53ff512f515be0737';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesResponse, genresResponse] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`),
        ]);

        if (!moviesResponse.ok || !genresResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const [moviesData, genresData] = await Promise.all([moviesResponse.json(), genresResponse.json()]);

        setMovies(moviesData.results);
        setGenres(genresData.genres);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Row gutter={[0,0]} className="movies-list-container">
      {movies.slice(0, 6).map((movie) => (
        <Col key={movie.id} span={12}>
          <Movie
            title={movie.title}
            overview={movie.overview}
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
