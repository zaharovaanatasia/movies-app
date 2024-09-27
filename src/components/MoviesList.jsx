import Movie from './Movie';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { truncateText } from '../utils';

const MoviesList = ({ movies, onChangeRating }) => {
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
            overview={truncateText(movie.overview, 165)}
            release_date={movie.release_date}
            poster_path={movie.poster_path}
            rating={movie.vote_average}
            userRating={movie.rating}
            genre_ids={movie.genre_ids}
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
};

export default MoviesList;
