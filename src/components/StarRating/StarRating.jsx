import { Rate } from 'antd';
import PropTypes from 'prop-types';

const StarRating = ({ rating, onChangeRating }) => {
  return <Rate count={10} value={rating} onChange={onChangeRating} allowHalf></Rate>;
};
Rate.propTypes = {
  rating: PropTypes.number,
  onChangeRating: PropTypes.func,
};
export default StarRating;
