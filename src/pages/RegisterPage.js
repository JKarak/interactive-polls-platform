import { navigate } from '../router/router.js';

import {
  registerUser
} from '../utils/auth.js';

export function RegisterPage() {
  const section =
    document.createElement('section');

  section.className =
    'auth-page slide-up';

  section.innerHTML = `
    <div class="card auth-card">
      <h1 class="page-title">
        Регистрация
      </h1>

      <form class="auth-form">
        <input
          type="text"
          class="form-input"
          placeholder="Имя"
          required
        />

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
          Зарегистрироваться
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

      const username =
        form[0].value.trim();

      const email =
        form[1].value.trim();

      const password =
        form[2].value.trim();

      try {
        registerUser({
          username,
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