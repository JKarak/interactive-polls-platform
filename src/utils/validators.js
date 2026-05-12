/**
 * Проверка обязательного поля
 */
export function validateRequired(value) {
  return String(value).trim().length > 0;
}

/**
 * Проверка email
 */
export function validateEmail(email) {
  const pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return pattern.test(email);
}

/**
 * Проверка минимальной длины
 */
export function validateMinLength(value, min = 3) {
  return String(value).trim().length >= min;
}

/**
 * Проверка массива вариантов опроса
 */
export function validatePollOptions(options = []) {
  const filteredOptions = options.filter((option) =>
    String(option).trim().length > 0
  );

  return filteredOptions.length >= 2;
}

/**
 * Валидация формы создания опроса
 */
export function validatePollForm(formData) {
  const errors = {};

  if (!validateRequired(formData.question)) {
    errors.question = 'Введите вопрос опроса';
  }

  if (!validateMinLength(formData.question, 10)) {
    errors.question =
      'Вопрос должен содержать минимум 10 символов';
  }

  if (!validatePollOptions(formData.options)) {
    errors.options =
      'Добавьте минимум 2 варианта ответа';
  }

  if (!validateRequired(formData.category)) {
    errors.category = 'Выберите категорию';
  }

  if (!validateRequired(formData.expiresAt)) {
    errors.expiresAt =
      'Укажите срок завершения опроса';
  }

  return errors;
}