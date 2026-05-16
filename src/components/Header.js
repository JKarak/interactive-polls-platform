import {
  navigate
} from '../router/router.js';

import {
  isAuthenticated,
  logoutUser
} from '../utils/auth.js';

export function Header() {
  const header =
    document.createElement('header');

  header.className = 'header';

  const authButtons =
    isAuthenticated()
      ? `
        <button
          class="button logout-btn"
        >
          Выйти
        </button>
      `
      : `
        <button
          class="button login-btn"
        >
          Вход
        </button>

        <button
          class="button register-btn"
        >
          Регистрация
        </button>
      `;

  header.innerHTML = `
    <div class="container header__container">

      <button
        class="logo"
        data-route="/"
      >
        SuperPoll
      </button>

      <nav class="nav">

        <button
          class="button nav-button"
          data-route="/"
        >
          Главная
        </button>

        <button
          class="button nav-button"
          data-route="/create"
        >
          Создать
        </button>

        <button
          class="button nav-button"
          data-route="/dashboard"
        >
          Кабинет
        </button>

      </nav>

      <div class="header__auth">
        ${authButtons}
      </div>

    </div>
  `;

  /**
   * SPA navigation
   */
  header
    .querySelectorAll(
      '[data-route]'
    )
    .forEach((button) => {
      button.addEventListener(
        'click',
        () => {
          navigate(
            button.dataset.route
          );
        }
      );
    });

  /**
   * Auth buttons
   */
  const loginBtn =
    header.querySelector(
      '.login-btn'
    );

  const registerBtn =
    header.querySelector(
      '.register-btn'
    );

  const logoutBtn =
    header.querySelector(
      '.logout-btn'
    );

  if (loginBtn) {
    loginBtn.addEventListener(
      'click',
      () => navigate('/login')
    );
  }

  if (registerBtn) {
    registerBtn.addEventListener(
      'click',
      () =>
        navigate('/register')
    );
  }

  if (logoutBtn) {
    logoutBtn.addEventListener(
      'click',
      () => {
        logoutUser();

        window.location.reload();
      }
    );
  }

  return header;
}