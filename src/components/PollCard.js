import {
  formatDate,
  isPollExpired
} from '../utils/helpers.js';

import {
  sanitizeObject
} from '../utils/sanitizer.js';

import {
  hasUserVoted
} from '../api/mock-data.js';

/**
 * Карточка опроса
 */
export function PollCard(poll) {
  const safePoll =
    sanitizeObject(poll);

  const article =
    document.createElement('article');

  article.className =
    'card poll-card fade-in';

  const expired =
    isPollExpired(
      safePoll.expiresAt
    );

  const voted =
    hasUserVoted(
      safePoll.id
    );

  /**
   * Определение статуса
   */
  let statusText = 'Активный';

  let statusClass =
    'badge--active';

  if (expired) {
    statusText = 'Завершён';

    statusClass =
      'badge--closed';
  }

  if (voted && !expired) {
    statusText =
      'Вы участвовали';

    statusClass =
      'badge--voted';
  }

  article.innerHTML = `
    <div class="poll-card__top">
      <span
        class="
          badge
          ${statusClass}
        "
      >
        ${statusText}
      </span>

      <span class="poll-card__category">
        ${safePoll.category}
      </span>
    </div>

    <h2 class="poll-card__title">
      ${safePoll.question}
    </h2>

    <p class="poll-card__description">
      ${safePoll.description}
    </p>

    <div class="poll-card__footer">
      <div class="poll-card__meta">
        <span>
          До:
          ${formatDate(
            safePoll.expiresAt
          )}
        </span>
      </div>

      <a
        href="/poll?id=${safePoll.id}"
        class="button"
        data-link
      >
        ${
          voted
            ? 'Результаты'
            : 'Открыть'
        }
      </a>
    </div>
  `;

  return article;
}