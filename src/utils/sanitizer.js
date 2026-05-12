/**
 * Санитизация HTML-строки
 */
export function sanitizeString(value = '') {
  const div = document.createElement('div');

  div.textContent = String(value);

  return div.innerHTML.trim();
}

/**
 * Санитизация объекта
 */
export function sanitizeObject(object = {}) {
  const sanitized = {};

  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);

      return;
    }

    sanitized[key] = value;
  });

  return sanitized;
}

/**
 * Санитизация массива объектов
 */
export function sanitizeArray(array = []) {
  return array.map((item) => sanitizeObject(item));
}