import { formatDate, isPollExpired } from '../utils/helpers.js';

import { sanitizeObject } from '../utils/sanitizer.js';

/**
 * Карточка опроса
 */
export function PollCard(poll) {
  const safePoll = sanitizeObject(poll);

  const article = document.createElement('article');

  article.className = 'card poll-card fade-in';

  const expired = isPollExpired(
    safePoll.expiresAt
  );

  article.innerHTML = `
    <div class="poll-card__top">
      <span
        class="
          badge
          ${expired ? 'badge--closed' : 'badge--active'}
        "
      >
        ${expired ? 'Завершён' : 'Активный'}
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
          ${formatDate(safePoll.expiresAt)}
        </span>
      </div>

      <a
        href="/poll?id=${safePoll.id}"
        class="button"
        data-link
      >
        Открыть
      </a>
    </div>
  `;

  return article;
}