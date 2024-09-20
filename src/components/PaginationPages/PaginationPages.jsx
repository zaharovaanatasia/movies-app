import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import './PaginationPages.css';

const PaginationPages = ({ current, total, onPageChange }) => {
  return (
    <div className="pagination-container">
      <Pagination current={current} total={total} onChange={onPageChange} pageSize={6} showSizeChanger={false} />
    </div>
  );
};
PaginationPages.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default PaginationPages;
