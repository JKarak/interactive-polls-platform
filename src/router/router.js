import { HomePage } from '../pages/HomePage.js';
import { PollPage } from '../pages/PollPage.js';
import { CreatePage } from '../pages/CreatePage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { NotFoundPage } from '../pages/NotFoundPage.js';

/**
 * Таблица маршрутов приложения
 */
const routes = {
  '/': HomePage,
  '/poll': PollPage,
  '/create': CreatePage,
  '/dashboard': DashboardPage
};

/**
 * Получение query параметров
 */
function getQueryParams() {
  return new URLSearchParams(window.location.search);
}

/**
 * Получение pathname
 */
function getPath() {
  return window.location.pathname;
}

/**
 * Рендер страницы
 */
async function renderRoute() {
  const pageContainer = document.querySelector('#page-content');

  if (!pageContainer) {
    return;
  }

  const path = getPath();

  const routeHandler = routes[path];

  pageContainer.innerHTML = '';

  try {
    if (!routeHandler) {
      pageContainer.append(NotFoundPage());

      return;
    }

    const page = await routeHandler({
      query: getQueryParams()
    });

    pageContainer.append(page);

    // Accessibility:
    // переносим фокус на main-контент после навигации
    pageContainer.focus();
  } catch (error) {
    console.error('Ошибка рендера страницы:', error);

    pageContainer.innerHTML = `
      <section class="card">
        <h2>Ошибка загрузки страницы</h2>

        <p>
          Не удалось отобразить страницу.
        </p>
      </section>
    `;
  }
}

/**
 * SPA навигация
 */
export function navigate(path) {
  window.history.pushState({}, '', path);

  renderRoute();
}

/**
 * Обработка кликов по ссылкам
 */
function handleLinkClick(event) {
  const link = event.target.closest('[data-link]');

  if (!link) {
    return;
  }

  event.preventDefault();

  const href = link.getAttribute('href');

  if (!href) {
    return;
  }

  navigate(href);
}

/**
 * Инициализация роутера
 */
export function initRouter() {
  window.addEventListener('popstate', renderRoute);

  document.addEventListener('click', handleLinkClick);

  renderRoute();
}