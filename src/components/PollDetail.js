import {
  hasUserVoted,
  saveVote,
  getAllVotes
} from '../api/mock-data.js';

import { ResultsChart } from './ResultsChart.js';

import {
  sanitizeObject,
  sanitizeString
} from '../utils/sanitizer.js';

import { isPollExpired } from '../utils/helpers.js';

/**
 * Компонент страницы голосования
 */
export async function PollDetail(poll) {
  const safePoll = sanitizeObject(poll);

  const section = document.createElement('section');

  section.className =
    'poll-detail card slide-up';

  const expired = isPollExpired(
    safePoll.expiresAt
  );

  const voted = hasUserVoted(
    safePoll.id
  );

  section.innerHTML = `
    <div class="poll-detail__header">
      <span class="badge ${
        expired
          ? 'badge--closed'
          : 'badge--active'
      }">
        ${
          expired
            ? 'Завершён'
            : 'Активный'
        }
      </span>

      <span class="poll-detail__category">
        ${safePoll.category}
      </span>
    </div>

    <h1 class="page-title">
      ${safePoll.question}
    </h1>

    <p class="poll-detail__description">
      ${safePoll.description}
    </p>

    <form
      class="poll-detail__form"
      aria-label="Форма голосования"
    >
      <div class="poll-detail__options"></div>

      <button
        type="submit"
        class="button"
        ${
          expired || voted
            ? 'disabled'
            : ''
        }
      >
        ${
          voted
            ? 'Вы уже голосовали'
            : 'Проголосовать'
        }
      </button>

      <p class="form-error hidden"></p>
    </form>

    <div class="poll-detail__results"></div>
  `;

  const optionsContainer =
    section.querySelector(
      '.poll-detail__options'
    );

  const form =
    section.querySelector(
      '.poll-detail__form'
    );

  const errorElement =
    section.querySelector('.form-error');

  const resultsContainer =
    section.querySelector(
      '.poll-detail__results'
    );

  /**
   * Рендер вариантов ответа
   */
  safePoll.options.forEach((option) => {
    const optionId =
      sanitizeString(option.id);

    const optionText =
      sanitizeString(option.text);

    const label =
      document.createElement('label');

    label.className =
      'poll-detail__option';

    label.innerHTML = `
      <input
        type="${
          safePoll.type === 'multiple'
            ? 'checkbox'
            : 'radio'
        }"
        name="poll-option"
        value="${optionId}"
      />

      <span>${optionText}</span>
    `;

    optionsContainer.append(label);
  });

  /**
   * Отображение результатов
   */
  async function renderResults() {
    const allVotes =
      await getAllVotes();

    const pollVotes =
      allVotes.filter(
        (vote) =>
          vote.pollId === safePoll.id
      );

    resultsContainer.innerHTML = '';

    resultsContainer.append(
      ResultsChart(
        safePoll,
        pollVotes
      )
    );
  }

  /**
   * Если пользователь уже голосовал —
   * сразу показываем результаты
   */
  if (voted || expired) {
    await renderResults();
  }

  /**
   * Submit формы голосования
   */
  form.addEventListener(
    'submit',
    async (event) => {
      event.preventDefault();

      const checkedInputs = [
        ...form.querySelectorAll(
          'input:checked'
        )
      ];

      if (!checkedInputs.length) {
        errorElement.textContent =
          'Выберите вариант ответа';

        errorElement.classList.remove(
          'hidden'
        );

        return;
      }

      errorElement.classList.add(
        'hidden'
      );

      const selectedOptions =
        checkedInputs.map(
          (input) => input.value
        );

      saveVote(
        safePoll.id,
        selectedOptions
      );

      form.reset();

      form.innerHTML = `
        <p>
          Спасибо за участие в голосовании!
        </p>
      `;

      await renderResults();
    }
  );

  return section;
}