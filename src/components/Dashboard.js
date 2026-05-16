import {
  getCreatedPolls,
  getUserVotes
} from '../api/mock-data.js';

import { clearStorage } from '../utils/storage.js';

import { PollCard } from './PollCard.js';

import {
  getCurrentUser
} from '../utils/auth.js';

/**
 * Личный кабинет
 */
export function Dashboard() {
  const section = document.createElement('section');

  section.className =
    'dashboard slide-up';

  const createdPolls =
    getCreatedPolls();

  const votes =
    getUserVotes();

  section.innerHTML = `
    <div class="card dashboard__profile">
      <div class="dashboard__avatar">
        U
      </div>

      <div>
        <h1 class="page-title">
          Личный кабинет
        </h1>

        <p>
          ${getCurrentUser()?.username ||
            'Гость'
            }
        </p>

        <p>
          ${getCurrentUser()?.email ||
            'Нет email'
            }
        </p>
      </div>
    </div>

    <section class="section">
      <h2>
        Созданные опросы
      </h2>

      <div
        class="dashboard__created"
      ></div>
    </section>

    <section class="section">
      <h2>
        Мои голосования
      </h2>

      <div class="card">
        <p>
          Вы приняли участие в
          ${votes.length}
          голосованиях
        </p>
      </div>
    </section>

    <button
      class="button dashboard__logout"
    >
      Очистить сессию
    </button>
  `;

  const createdContainer =
    section.querySelector(
      '.dashboard__created'
    );

  if (!createdPolls.length) {
    createdContainer.innerHTML = `
      <div class="card">
        <p>
          Вы ещё не создавали опросы
        </p>
      </div>
    `;
  } else {
    createdPolls.forEach((poll) => {
      createdContainer.append(
        PollCard(poll)
      );
    });
  }

  const logoutButton =
    section.querySelector(
      '.dashboard__logout'
    );

  logoutButton.addEventListener(
    'click',
    () => {
      clearStorage();

      window.location.reload();
    }
  );

  return section;
}