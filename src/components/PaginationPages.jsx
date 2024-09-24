import { Pagination } from 'antd';
import PropTypes from 'prop-types';

const PaginationPages = ({ currentPage, total, onPageChange, mode }) => {
  return (
    <Pagination
      align="center"
      current={currentPage}
      total={mode === 'rated' ? total * 10 : total}
      onChange={onPageChange}
      showSizeChanger={false}
    />
  );
};
PaginationPages.propTypes = {
  currentPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};
export default PaginationPages;
