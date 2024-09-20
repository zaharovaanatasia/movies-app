import Movie from '../Movie/Movie';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import './MoviesList.css';
import { truncateText } from '../../utils';

const MoviesList = ({ movies, onChangeRating, genres }) => {
  return (
    <>
      <Row className="movies-list-container">
        {movies.slice(0, 6).map((movie) => (
          <Col key={movie.id} span={12}>
            <Movie
              title={movie.title}
              overview={truncateText(movie.overview, 250)}
              release_date={movie.release_date}
              poster_path={movie.poster_path}
              rating={movie.rating}
              genres={genres.filter((genre) => movie.genre_ids.includes(genre.id))}
              onChangeRating={(newRating) => onChangeRating(movie.id, newRating)}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  onChangeRating: PropTypes.func.isRequired,
  genres: PropTypes.array.isRequired,
};

export default MoviesList;
