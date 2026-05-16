import {
  getFromStorage,
  setToStorage
} from '../utils/storage.js';

import { fetchPolls } from './client.js';

const KEYS = {
  POLLS: 'polls',
  CREATED_POLLS: 'createdPolls',
  VOTES: 'votes',
  USER_VOTES: 'userVotes'
};

/**
 * Инициализация polls
 */
async function initializePolls() {
  const existingPolls =
    getFromStorage(KEYS.POLLS);

  if (
    existingPolls &&
    existingPolls.length
  ) {
    return existingPolls;
  }

  const polls = await fetchPolls();

  setToStorage(KEYS.POLLS, polls);

  return polls;
}

/**
 * Получить все опросы
 */
export async function getAllPolls() {
  return (
    (await initializePolls()) || []
  );
}

/**
 * Получить созданные опросы
 */
export function getCreatedPolls() {
  return (
    getFromStorage(
      KEYS.CREATED_POLLS
    ) || []
  );
}

/**
 * Сохранить созданный опрос
 */
export function saveCreatedPoll(
  poll
) {
  const polls =
    getFromStorage(KEYS.POLLS) ||
    [];

  const createdPolls =
    getFromStorage(
      KEYS.CREATED_POLLS
    ) || [];

  polls.push(poll);
  createdPolls.push(poll);

  setToStorage(
    KEYS.POLLS,
    polls
  );

  setToStorage(
    KEYS.CREATED_POLLS,
    createdPolls
  );
}

/**
 * Получить все голоса
 */
export async function getAllVotes() {
  return (
    getFromStorage(KEYS.VOTES) ||
    []
  );
}

/**
 * Получить голоса пользователя
 */
export function getUserVotes() {
  return (
    getFromStorage(
      KEYS.USER_VOTES
    ) || []
  );
}

/**
 * Сохранить голос
 */
export function saveVote(
  pollId,
  selectedOptions
) {
  const votes =
    getFromStorage(KEYS.VOTES) ||
    [];

  const userVotes =
    getFromStorage(
      KEYS.USER_VOTES
    ) || [];

  votes.push({
    id: crypto.randomUUID(),
    pollId,
    selectedOptions,
    createdAt:
      new Date().toISOString()
  });

  userVotes.push(pollId);

  setToStorage(
    KEYS.VOTES,
    votes
  );

  setToStorage(
    KEYS.USER_VOTES,
    userVotes
  );
}

/**
 * Проверка голосования
 */
export function hasUserVoted(
  pollId
) {
  const userVotes =
    getFromStorage(
      KEYS.USER_VOTES
    ) || [];

  return userVotes.includes(
    pollId
  );
}