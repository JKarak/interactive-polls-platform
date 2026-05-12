import { PollCard } from './PollCard.js';

/**
 * Список опросов
 */
export function PollList(polls = []) {
  const section = document.createElement('section');

  section.className =
    'grid grid--2 grid--3';

  if (!polls.length) {
    section.innerHTML = `
      <div class="card">
        <h2>Опросы не найдены</h2>

        <p>
          Попробуйте изменить параметры поиска.
        </p>
      </div>
    `;

    return section;
  }

  polls.forEach((poll) => {
    section.append(PollCard(poll));
  });

  return section;
}