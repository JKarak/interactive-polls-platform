import { navigate } from '../router/router.js';

/**
 * Header приложения
 */
export function Header() {
  const header = document.createElement('div');

  header.className = 'header';

  header.innerHTML = `
    <div class="container header__container">
      <a
        href="/"
        class="header__logo"
        data-link
        aria-label="На главную"
      >
        VoteFlow
      </a>

      <nav
        class="header__nav"
        aria-label="Главное меню"
      >
        <a
          href="/"
          class="header__link"
          data-link
        >
          Опросы
        </a>

        <a
          href="/create"
          class="header__link"
          data-link
        >
          Создать
        </a>

        <a
          href="/dashboard"
          class="header__link"
          data-link
        >
          Кабинет
        </a>
      </nav>

      <button
        class="button header__mobile-button"
        aria-label="Открыть меню"
      >
        ☰
      </button>
    </div>
  `;

  const mobileButton =
    header.querySelector('.header__mobile-button');

  const nav =
    header.querySelector('.header__nav');

  mobileButton.addEventListener('click', () => {
    nav.classList.toggle('header__nav--open');
  });

  return header;
}