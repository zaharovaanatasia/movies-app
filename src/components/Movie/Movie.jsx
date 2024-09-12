import React from 'react';
import { Card, Row, Col } from 'antd';
import './Movie.css';

const { Meta } = Card;

const Movie = ({ title, overview, release_date, poster_path, genre_ids, genres }) => {
  const baseUrl = 'https://image.tmdb.org/t/p/w500';

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card className="movie" hoverable>
      <Row gutter={16} className="movie__row">
        <Col span={8} className="movie__poster-container">
          <img alt={title} src={`${baseUrl}${poster_path}`} className="movie__poster" />
        </Col>
        <Col span={16} className="movie__description-container">
          <Meta
            title={<span className="movie__title">{title}</span>}
            description={
              <>
                <p className="movie__release-date">{formatDate(release_date)}</p>
                <div className="movie__genres">
                  {genre_ids.map((id) => {
                    const genre = genres.find((g) => g.id === id);
                    return genre ? (
                      <span key={id} className="movie__genre-badge">
                        {genre.name}
                      </span>
                    ) : null;
                  })}
                </div>
                <p className="movie__overview">{overview}</p>
              </>
            }
          />
        </Col>
      </Row>
    </Card>
  );
};

export default Movie;
