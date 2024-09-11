import { Card } from 'antd';
const { Meta } = Card;
const Movie = ({ movie }) => {
  return (
    <Card
      hoverable
      cover={<img alt={movie.title} src={movie.poster_path} />}
      style={{ width: 300, height: 'auto', marginBottom: '20px' }}
    >
      <Meta
        title={movie.title}
        description={
          <>
            <p style={{ margin: 0 }}>{movie.release_date}</p>
            <p style={{ margin: 0 }}>{movie.genres.join(', ')}</p>
            <p>{movie.overview}</p>
          </>
        }
      />
    </Card>
  );
};

export default Movie;
