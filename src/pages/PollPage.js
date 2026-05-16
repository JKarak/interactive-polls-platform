import { PollDetail } from '../components/PollDetail.js';

import {
  getAllPolls,
  getCreatedPolls
} from '../api/mock-data.js';

/**
 * Страница опроса
 */
export async function PollPage({
  query
}) {
  const section = document.createElement('section');

  const pollId = query.get('id');

  /**
   * Проверка ID
   */
  if (!pollId) {
    section.innerHTML = `
      <div class="card">
        <h2>Опрос не найден</h2>
      </div>
    `;

    return section;
  }

  try {
    /**
     * Загружаем:
     * - demo polls
     * - polls из localStorage
     */
    const apiPolls =
      await getAllPolls();

    const createdPolls =
      getCreatedPolls();

    /**
     * Объединяем массивы
     */
    const allPolls = [
      ...apiPolls,
      ...createdPolls
    ];

    /**
     * Ищем опрос
     */
    const poll = allPolls.find(
      (item) => item.id === pollId
    );

    /**
     * Если не найден
     */
    if (!poll) {
      section.innerHTML = `
        <div class="card">
          <h2>Опрос не найден</h2>

          <p>
            Возможно, опрос был удалён
          </p>
        </div>
      `;

      return section;
    }

    /**
     * Рендерим страницу голосования
     */
    const pollDetail =
      await PollDetail(poll);

    section.append(pollDetail);
  } catch (error) {
    console.error(
      'Poll page error:',
      error
    );

    section.innerHTML = `
      <div class="card">
        <h2>Ошибка загрузки</h2>

        <p>
          Не удалось загрузить опрос
        </p>
      </div>
    `;
  }

  return section;
}