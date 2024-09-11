import Movie from './Movie';
import { Row, Col } from 'antd';

const movies = [
  {
    id: 1,
    title: 'The Way Back',
    release_date: 'March 5, 2020',
    genres: ['Action', 'Drama'],
    overview: 'A former basketball all-star, who has lost his wife and family foundation...',
    poster_path: 'https://image.tmdb.org/t/p/w500/path/to/poster1.jpg', // Замените на реальный путь
  },
  {
    id: 2,
    title: 'Another Movie',
    release_date: 'April 10, 2020',
    genres: ['Drama', 'Thriller'],
    overview: 'A gripping tale of survival and determination...',
    poster_path: 'https://image.tmdb.org/t/p/w500/path/to/poster2.jpg', 
  },
];

const MoviesList = () => {
  return (
    <Row gutter={[2, 3]}>
      {movies.map((movie) => (
        <Col key={movie.id}>
          <Movie movie={movie} />
        </Col>
      ))}
    </Row>
  );
};

export default MoviesList;
