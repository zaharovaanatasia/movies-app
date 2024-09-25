import Movie from './Movie';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { truncateText } from '../utils';

const MoviesList = ({ movies, onChangeRating, genres }) => {
  return (
    <Row gutter={[16, 16]}>
      {movies.map((movie) => (
        <Col
          key={movie.id}
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Movie
            title={truncateText(movie.title, 35)}
            overview={truncateText(movie.overview, 170)}
            release_date={movie.release_date}
            poster_path={movie.poster_path}
            rating={movie.rating}
            genres={genres.filter((genre) => movie.genre_ids.includes(genre.id))}
            onChangeRating={(newRating) => onChangeRating(movie.id, newRating)}
          />
        </Col>
      ))}
    </Row>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  onChangeRating: PropTypes.func.isRequired,
  genres: PropTypes.array.isRequired,
};

export default MoviesList;
