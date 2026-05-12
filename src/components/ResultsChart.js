import { sanitizeString } from '../utils/sanitizer.js';

/**
 * Подсчёт результатов
 */
function calculateResults(poll, votes) {
  const resultMap = {};

  poll.options.forEach((option) => {
    resultMap[option.id] = 0;
  });

  votes.forEach((vote) => {
    vote.selectedOptions.forEach((optionId) => {
      if (resultMap[optionId] !== undefined) {
        resultMap[optionId] += 1;
      }
    });
  });

  return resultMap;
}

/**
 * Компонент результатов голосования
 */
export function ResultsChart(poll, votes) {
  const wrapper = document.createElement('section');

  wrapper.className =
    'results-chart card fade-in';

  const results = calculateResults(
    poll,
    votes
  );

  const totalVotes = votes.length;

  wrapper.innerHTML = `
    <h2 class="results-chart__title">
      Результаты голосования
    </h2>

    <div class="results-chart__list"></div>
  `;

  const list = wrapper.querySelector(
    '.results-chart__list'
  );

  poll.options.forEach((option) => {
    const safeText = sanitizeString(
      option.text
    );

    const votesCount =
      results[option.id] || 0;

    const percent =
      totalVotes > 0
        ? Math.round(
            (votesCount / totalVotes) * 100
          )
        : 0;

    const item = document.createElement('div');

    item.className = 'results-chart__item';

    item.innerHTML = `
      <div class="results-chart__header">
        <span>${safeText}</span>

        <span>
          ${votesCount} голосов
          (${percent}%)
        </span>
      </div>

      <div
        class="results-chart__bar"
        aria-hidden="true"
      >
        <div
          class="results-chart__fill"
          style="width: ${percent}%"
        ></div>
      </div>
    `;

    list.append(item);
  });

  return wrapper;
}