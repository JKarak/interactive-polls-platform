/**
 * Простое кеширование запросов
 */
const cache = new Map();

/**
 * Базовый fetch с retry и обработкой ошибок
 */
async function request(url, options = {}, retries = 2) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (retries > 0) {
      return request(url, options, retries - 1);
    }

    console.error('Ошибка API запроса:', error);

    throw error;
  }
}

/**
 * Получение данных с кешированием
 */
export async function fetchWithCache(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const data = await request(url);

  cache.set(url, data);

  return data;
}

/**
 * Получение списка опросов
 */
export async function getPolls() {
  return fetchWithCache('/polls');
}

/**
 * Получение одного опроса
 */
export async function getPollById(id) {
  const polls = await getPolls();

  return polls.find((poll) => poll.id === id);
}

/**
 * Получение пользователей
 */
export async function getUsers() {
  return fetchWithCache('http://localhost:3000/users');
}

/**
 * Получение голосов
 */
export async function getVotes() {
  return fetchWithCache('http://localhost:3000/votes');
}