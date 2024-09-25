import { Card, Row, Col, Tag, Progress, Image } from 'antd';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import { formatDate, getRatingColor } from '../utils';
import { BASE_URL_IMG, URL_POSTER } from '../api.js';

const { Meta } = Card;

const Movie = ({ title, overview, release_date, poster_path, rating, userRating, onChangeRating, genres }) => {
  return (
    <Card
      hoverable
      style={{
        width: '100%',
        maxWidth: 530,
        height: 'auto',
        margin: '10px auto',
        borderRadius: '10px',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      <Row gutter={[16, 16]} style={{ height: '100%' }} wrap={true}>
        <Col xs={5} sm={8} md={8} style={{ padding: 0 }}>
          {poster_path ? (
            <Image
              alt={title}
              src={`${BASE_URL_IMG}${poster_path}`}
              style={{
                width: 'auto',
                maxHeight: 250,
                maxWidth: '100%',
                borderRadius: 10,
                paddingRight: 5,
                objectFit: 'cover',
              }}
            />
          ) : (
            <Image
              alt={'Нет постера'}
              src={URL_POSTER}
              style={{
                width: 'auto',
                height: 250,
                maxWidth: '100%',
                borderRadius: 10,
                paddingRight: 5,
                objectFit: 'cover',
              }}
            />
          )}
        </Col>
        <Col xs={18} sm={16} md={16} style={{ display: 'flex', flexDirection: 'column', padding: '0 10px' }}>
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
                <p style={{ marginTop: '10px' }}>{overview}</p>
              </>
            }
          />
        </Col>
      </Row>
      <Row justify="start" style={{ position: 'absolute', bottom: '10px', right: '10px', paddingTop: '15px' }}>
        <StarRating rating={userRating} onChangeRating={onChangeRating} />
      </Row>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
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
  userRating: PropTypes.number,
  onChangeRating: PropTypes.func,
  genres: PropTypes.array,
};

export default Movie;
