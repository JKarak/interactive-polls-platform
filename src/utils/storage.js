/**
 * Получить данные
 */
export function getFromStorage(
  key
) {
  try {
    const value =
      localStorage.getItem(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(
      'Storage read error:',
      error
    );

    return null;
  }
}

/**
 * Сохранить данные
 */
export function setToStorage(
  key,
  value
) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch (error) {
    console.error(
      'Storage save error:',
      error
    );
  }
}

/**
 * Очистка storage
 */
export function clearStorage() {
  localStorage.clear();
}