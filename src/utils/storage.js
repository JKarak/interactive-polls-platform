/**
 * Безопасная запись в localStorage
 */
export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Ошибка записи в localStorage:', error);
  }
}

/**
 * Безопасное чтение из localStorage
 */
export function getStorageItem(key, fallback = null) {
  try {
    const item = localStorage.getItem(key);

    if (!item) {
      return fallback;
    }

    return JSON.parse(item);
  } catch (error) {
    console.error('Ошибка чтения localStorage:', error);

    return fallback;
  }
}

/**
 * Удаление значения
 */
export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Ошибка удаления localStorage:', error);
  }
}

/**
 * Очистка localStorage
 */
export function clearStorage() {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Ошибка очистки localStorage:', error);
  }
}