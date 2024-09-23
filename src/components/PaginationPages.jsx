import { Pagination } from 'antd';
import PropTypes from 'prop-types';

const PaginationPages = ({ currentPage, total, onPageChange }) => {
  return (
    <Pagination
      align="center"
      current={currentPage}
      total={total}
      onChange={onPageChange}
      pageSize={6}
      showSizeChanger={false}
    />
  );
};
PaginationPages.propTypes = {
  currentPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default PaginationPages;
