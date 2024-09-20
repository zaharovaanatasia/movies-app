import { Card, Row, Col, Tag } from 'antd';
import PropTypes from 'prop-types';
import StarRating from '../StarRating/StarRating';
import { formatDate, getRatingColor } from '../../utils.js';
import './Movie.css';

const { Meta } = Card;

const Movie = ({ title, overview, release_date, poster_path, rating, onChangeRating, genres }) => {
  const baseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <Card className="movie" hoverable>
      <Row gutter={16} className="movie__row">
        <Col span={8} className="movie__poster-container">
          {poster_path ? (
            <img alt={title} src={`${baseUrl}${poster_path}`} className="movie__poster" />
          ) : (
            <div className="movie__no-poster">Нет постера </div>
          )}
        </Col>
        <Col span={16} className="movie__description-container">
          <Meta
            title={<span className="movie__title">{title}</span>}
            description={
              <>
                <p className="movie__release-date">{formatDate(release_date)}</p>
                <div className="movie__genres">
                  {genres.map((genre) => (
                    <Tag key={genre.id}>{genre.name}</Tag>
                  ))}
                </div>
                <p className="movie__overview">{overview}</p>
                <StarRating rating={rating} onChangeRating={onChangeRating}></StarRating>
              </>
            }
          />
        </Col>
      </Row>
      <div className="movie__rating-circle" style={{ border: `2px solid ${getRatingColor(rating)}` }}>
        {' '}
        {rating ? rating.toFixed(1) : '0.0'}{' '}
      </div>
    </Card>
  );
};

Movie.propTypes = {
  title: PropTypes.string,
  overview: PropTypes.string,
  release_date: PropTypes.string,
  poster_path: PropTypes.string,
  rating: PropTypes.number,
  onChangeRating: PropTypes.func,
  genres: PropTypes.array,
};

export default Movie;
