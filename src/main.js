import './styles.css';

import { initRouter } from './router/router.js';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';

// Корневой контейнер приложения
const app = document.querySelector('#app');

/**
 * Создание базового layout приложения
 */
function renderLayout() {
  app.innerHTML = `
    <div class="app-layout">
      <header id="header"></header>

      <main
        id="page-content"
        class="page-content"
        tabindex="-1"
      ></main>

      <footer id="footer"></footer>
    </div>
  `;
}

/**
 * Инициализация компонентов
 */
function initComponents() {
  const headerContainer = document.querySelector('#header');
  const footerContainer = document.querySelector('#footer');

  headerContainer.append(Header());
  footerContainer.append(Footer());
}

/**
 * Инициализация приложения
 */
function bootstrap() {
  renderLayout();
  initComponents();
  initRouter();
}

bootstrap();