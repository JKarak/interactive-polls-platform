import { navigate } from '../router/router.js';

/**
 * Страница 404
 */
export function NotFoundPage() {
  const section = document.createElement('section');

  section.className =
    'not-found-page card slide-up';

  section.innerHTML = `
    <h1 class="page-title">
      404
    </h1>

    <p>
      Страница не найдена
    </p>

    <button class="button">
      Вернуться на главную
    </button>
  `;

  const button =
    section.querySelector('button');

  button.addEventListener(
    'click',
    () => {
      navigate('/');
    }
  );

  return section;
}