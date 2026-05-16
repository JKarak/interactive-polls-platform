const STORAGE_KEYS = {
  USERS: 'users',
  CURRENT_USER: 'currentUser'
};

/**
 * Получить всех пользователей
 */
function getUsers() {
  const users =
    localStorage.getItem(
      STORAGE_KEYS.USERS
    );

  return users
    ? JSON.parse(users)
    : [];
}

/**
 * Сохранить пользователей
 */
function saveUsers(users) {
  localStorage.setItem(
    STORAGE_KEYS.USERS,
    JSON.stringify(users)
  );
}

/**
 * Регистрация
 */
export function registerUser({
  username,
  email,
  password
}) {
  const users = getUsers();

  const exists = users.find(
    (user) =>
      user.email === email
  );

  if (exists) {
    throw new Error(
      'Пользователь уже существует'
    );
  }

  const newUser = {
    id: crypto.randomUUID(),
    username,
    email,
    password
  };

  users.push(newUser);

  saveUsers(users);

  localStorage.setItem(
    STORAGE_KEYS.CURRENT_USER,
    JSON.stringify(newUser)
  );

  return newUser;
}

/**
 * Вход
 */
export function loginUser({
  email,
  password
}) {
  const users = getUsers();

  const user = users.find(
    (item) =>
      item.email === email &&
      item.password === password
  );

  if (!user) {
    throw new Error(
      'Неверный email или пароль'
    );
  }

  localStorage.setItem(
    STORAGE_KEYS.CURRENT_USER,
    JSON.stringify(user)
  );

  return user;
}

/**
 * Текущий пользователь
 */
export function getCurrentUser() {
  const user =
    localStorage.getItem(
      STORAGE_KEYS.CURRENT_USER
    );

  return user
    ? JSON.parse(user)
    : null;
}

/**
 * Проверка авторизации
 */
export function isAuthenticated() {
  return !!getCurrentUser();
}

/**
 * Выход
 */
export function logoutUser() {
  localStorage.removeItem(
    STORAGE_KEYS.CURRENT_USER
  );
}