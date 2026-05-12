import express from 'express';

import fs from 'fs/promises';

import path from 'path';

const app = express();

const PORT = 3000;

/**
 * Middleware
 */
app.use(express.json());

/**
 * Имитация задержки API
 */
app.use(async (_req, _res, next) => {
  await new Promise((resolve) =>
    setTimeout(resolve, 400)
  );

  next();
});

/**
 * Чтение JSON файла
 */
async function readJsonFile(filename) {
  const filePath = path.resolve(
    'public',
    'data',
    filename
  );

  const fileContent = await fs.readFile(
    filePath,
    'utf-8'
  );

  return JSON.parse(fileContent);
}

/**
 * GET /polls
 */
app.get('/polls', async (_req, res) => {
  try {
    const polls = await readJsonFile('polls.json');

    res.json(polls);
  } catch (error) {
    res.status(500).json({
      error: 'Ошибка загрузки опросов'
    });
  }
});

/**
 * GET /users
 */
app.get('/users', async (_req, res) => {
  try {
    const users = await readJsonFile('users.json');

    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: 'Ошибка загрузки пользователей'
    });
  }
});

/**
 * GET /votes
 */
app.get('/votes', async (_req, res) => {
  try {
    const votes = await readJsonFile('votes.json');

    res.json(votes);
  } catch (error) {
    res.status(500).json({
      error: 'Ошибка загрузки голосов'
    });
  }
});

/**
 * Обработка 404
 */
app.use((_req, res) => {
  res.status(404).json({
    error: 'Маршрут не найден'
  });
});

/**
 * Запуск сервера
 */
app.listen(PORT, () => {
  console.log(
    `Mock API сервер запущен: http://localhost:${PORT}`
  );
});