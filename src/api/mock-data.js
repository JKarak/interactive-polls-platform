import { getPolls, getVotes } from './client.js';

import { getStorageItem, setStorageItem } from '../utils/storage.js';

import { generateId } from '../utils/helpers.js';

/**
 * Сохранение пользовательского голоса
 */
export function saveVote(pollId, selectedOptions) {
  const votes = getStorageItem('votes', []);

  const newVote = {
    id: generateId('vote'),
    pollId,
    selectedOptions,
    createdAt: new Date().toISOString()
  };

  votes.push(newVote);

  setStorageItem('votes', votes);

  return newVote;
}

/**
 * Проверка голосовал ли пользователь
 */
export function hasUserVoted(pollId) {
  const votes = getStorageItem('votes', []);

  return votes.some((vote) => vote.pollId === pollId);
}

/**
 * Получение пользовательских голосов
 */
export function getUserVotes() {
  return getStorageItem('votes', []);
}

/**
 * Сохранение созданного опроса
 */
export function saveCreatedPoll(pollData) {
  const createdPolls = getStorageItem('createdPolls', []);

  createdPolls.push(pollData);

  setStorageItem('createdPolls', createdPolls);
}

/**
 * Получение пользовательских опросов
 */
export function getCreatedPolls() {
  return getStorageItem('createdPolls', []);
}

/**
 * Получение всех опросов
 * (серверные + локальные)
 */
export async function getAllPolls() {
  const serverPolls = await getPolls();

  const localPolls = getCreatedPolls();

  return [...localPolls, ...serverPolls];
}

/**
 * Получение всех голосов
 */
export async function getAllVotes() {
  const serverVotes = await getVotes();

  const localVotes = getUserVotes();

  return [...localVotes, ...serverVotes];
}