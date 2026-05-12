import { getAllPolls } from '../api/mock-data.js';

import { PollDetail } from '../components/PollDetail.js';

/**
 * Страница опроса
 */
export async function PollPage({
  query
}) {
  const section = document.createElement('section');

  const pollId = query.get('id');

  if (!pollId) {
    section.innerHTML = `
      <div class="card">
        <h2>
          Опрос не найден
        </h2>
      </div>
    `;

    return section;
  }

  try {
    const polls =
      await getAllPolls();

    const poll = polls.find(
      (item) =>
        item.id === pollId
    );

    if (!poll) {
      section.innerHTML = `
        <div class="card">
          <h2>
            Опрос не найден
          </h2>
        </div>
      `;

      return section;
    }

    section.append(
      await PollDetail(poll)
    );
  } catch (error) {
    console.error(error);

    section.innerHTML = `
      <div class="card">
        <h2>
          Ошибка загрузки
        </h2>

        <p>
          Не удалось загрузить опрос
        </p>
      </div>
    `;
  }

  return section;
}