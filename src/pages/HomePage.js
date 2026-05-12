import { PollList } from '../components/PollList.js';

import { getAllPolls } from '../api/mock-data.js';

import {
  debounce,
  isPollExpired
} from '../utils/helpers.js';

import { sanitizeString } from '../utils/sanitizer.js';

/**
 * Главная страница
 */
export async function HomePage() {
  const section = document.createElement('section');

  section.className =
    'home-page slide-up';

  section.innerHTML = `
    <div class="section">
      <h1 class="page-title">
        Интерактивные опросы
      </h1>

      <div class="home-page__filters">
        <input
          type="search"
          class="form-input"
          placeholder="Поиск опросов..."
          aria-label="Поиск опросов"
        />

        <select
          class="form-select"
          aria-label="Фильтр по статусу"
        >
          <option value="all">
            Все статусы
          </option>

          <option value="active">
            Активные
          </option>

          <option value="closed">
            Завершённые
          </option>
        </select>
      </div>
    </div>

    <div class="home-page__content">
      <div class="card">
        Загрузка опросов...
      </div>
    </div>
  `;

  const searchInput =
    section.querySelector(
      'input[type="search"]'
    );

  const statusSelect =
    section.querySelector('select');

  const content =
    section.querySelector(
      '.home-page__content'
    );

  let allPolls = [];

  /**
   * Рендер списка
   */
  function renderPolls() {
    const searchValue =
      sanitizeString(
        searchInput.value
      ).toLowerCase();

    const statusValue =
      statusSelect.value;

    const filteredPolls =
      allPolls.filter((poll) => {
        const matchesSearch =
          poll.question
            .toLowerCase()
            .includes(searchValue);

        const expired =
          isPollExpired(
            poll.expiresAt
          );

        const matchesStatus =
          statusValue === 'all' ||
          (statusValue === 'active' &&
            !expired) ||
          (statusValue === 'closed' &&
            expired);

        return (
          matchesSearch &&
          matchesStatus
        );
      });

    content.innerHTML = '';

    content.append(
      PollList(filteredPolls)
    );
  }

  /**
   * Загрузка данных
   */
  try {
    allPolls = await getAllPolls();

    renderPolls();
  } catch (error) {
    console.error(error);

    content.innerHTML = `
      <div class="card">
        <h2>
          Ошибка загрузки
        </h2>

        <p>
          Не удалось загрузить опросы
        </p>
      </div>
    `;
  }

  /**
   * Search debounce
   */
  searchInput.addEventListener(
    'input',
    debounce(renderPolls, 300)
  );

  /**
   * Filters
   */
  statusSelect.addEventListener(
    'change',
    renderPolls
  );

  return section;
}