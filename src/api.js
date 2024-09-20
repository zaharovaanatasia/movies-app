const API_KEY = '1a2b96f291c61ca53ff512f515be0737';
const BASE_URL = 'https://api.themoviedb.org/3';

export const FetchMovies = async (query, page) => {
  const url = query
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Ошибка сети');
  }

  const data = await response.json();
  return {
    results: data.results,
    total_pages: data.total_pages,
  };
};

export const FetchGenres = async () => {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Ошибка при загрузке жанров');
  }

  const data = await response.json();
  return data.genres;
};

export const CreateGuestSession = async () => {
  const guestSessionId = localStorage.getItem('guestSessionId');

  if (guestSessionId) {
    return guestSessionId;
  }

  try {
    const response = await fetch(`${BASE_URL}/authentication/guest_session/new?api_key=${API_KEY}`);

    if (!response.ok) {
      throw new Error('Ошибка в создании гостевой сессии');
    }

    const data = await response.json();

    const newGuestSessionId = data.guest_session_id;

    localStorage.setItem('guestSessionId', newGuestSessionId);
    return newGuestSessionId;
  } catch (error) {
    console.error(error);
    throw new Error('Не удалось получить id гостевой сессии');
  }
};
