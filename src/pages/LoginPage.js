import { navigate } from '../router/router.js';

import {
  loginUser
} from '../utils/auth.js';

export function LoginPage() {
  const section =
    document.createElement('section');

  section.className =
    'auth-page slide-up';

  section.innerHTML = `
    <div class="card auth-card">
      <h1 class="page-title">
        Вход
      </h1>

      <form class="auth-form">
        <input
          type="email"
          class="form-input"
          placeholder="Email"
          required
        />

        <input
          type="password"
          class="form-input"
          placeholder="Пароль"
          required
        />

        <button class="button">
          Войти
        </button>

        <p class="auth-error"></p>
      </form>
    </div>
  `;

  const form =
    section.querySelector('form');

  const errorText =
    section.querySelector(
      '.auth-error'
    );

  form.addEventListener(
    'submit',
    (event) => {
      event.preventDefault();

      const email =
        form[0].value.trim();

      const password =
        form[1].value.trim();

      try {
        loginUser({
          email,
          password
        });

        navigate('/dashboard');
      } catch (error) {
        errorText.textContent =
          error.message;
      }
    }
  );

  return section;
}