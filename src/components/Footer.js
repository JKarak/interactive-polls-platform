/**
 * Footer приложения
 */
export function Footer() {
  const footer = document.createElement('div');

  footer.className = 'footer';

  footer.innerHTML = `
    <div class="container footer__container">
      <p class="footer__text">
        © 2026 Interactive Polls Platform
      </p>

      <p class="footer__text">
        Курсовой проект по frontend-разработке
      </p>
    </div>
  `;

  return footer;
}