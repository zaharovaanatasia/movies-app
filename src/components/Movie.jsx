import { Card, Row, Col, Tag, Progress, Image } from 'antd';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import { formatDate, getRatingColor } from '../utils';

const { Meta } = Card;

const Movie = ({ title, overview, release_date, poster_path, rating, onChangeRating, genres }) => {
  const baseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <Card
      hoverable
      style={{
        maxWidth: 550,
        height: 290,
        marginBottom: 10,
        marginLeft: 10,
        borderRadius: '10px',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8} style={{ padding: 0 }}>
          {poster_path ? (
            <Image
              alt={title}
              src={`${baseUrl}${poster_path}`}
              style={{
                width: 'auto',
                height: '250px',
                maxWidth: '100%',
                borderRadius: '10px',
                paddingRight: '5px',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div>Нет постера</div>
          )}
        </Col>
        <Col xs={24} sm={16}>
          <Meta
            title={<span>{title}</span>}
            description={
              <>
                <p style={{ margin: '7px 0' }}>{formatDate(release_date)}</p>
                <div>
                  {genres.map((genre) => (
                    <Tag key={genre.id}>{genre.name}</Tag>
                  ))}
                </div>
                <p>{overview}</p>
                <Row justify="start" style={{ position: 'absolute', bottom: 10 }}>
                  <StarRating rating={rating} onChangeRating={onChangeRating} />
                </Row>
              </>
            }
          />
        </Col>
      </Row>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <Progress
          type="circle"
          percent={rating ? (rating / 10) * 100 : 0}
          strokeColor={getRatingColor(rating)}
          size="small"
          format={() => (rating ? rating.toFixed(1) : '0.0')}
        />
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
