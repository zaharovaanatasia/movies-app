import { notification } from 'antd';

// формат даты
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

// рейтинг
export const getRatingColor = (rating) => {
  if (rating >= 0 && rating < 3) return '#E90000';
  if (rating >= 3 && rating < 5) return '#E97E00';
  if (rating >= 5 && rating < 7) return '#E9D100';
  if (rating >= 7) return '#66E900';
  return '#E90000';
};

// текст обработка
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  return `${truncated.slice(0, lastSpaceIndex)}...`;
};

export const showErrorNotification = (message) => {
  notification.error({
    message: 'Ошибка',
    description: message,
    placement: 'topRight',
    duration: 5,
    closeable: true,
  });
};
