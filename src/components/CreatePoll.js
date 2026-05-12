import { saveCreatedPoll } from '../api/mock-data.js';

import { generateId } from '../utils/helpers.js';

import { validatePollForm } from '../utils/validators.js';

import { sanitizeString } from '../utils/sanitizer.js';

/**
 * Компонент создания опроса
 */
export function CreatePoll() {
  const section = document.createElement('section');

  section.className =
    'card create-poll slide-up';

  section.innerHTML = `
    <h1 class="page-title">
      Создание опроса
    </h1>

    <form
      class="create-poll__form"
      novalidate
    >
      <div class="form-group">
        <label class="form-label">
          Вопрос
        </label>

        <input
          type="text"
          name="question"
          class="form-input"
          placeholder="Введите вопрос"
        />

        <p
          class="form-error hidden"
          data-error="question"
        ></p>
      </div>

      <div class="form-group">
        <label class="form-label">
          Описание
        </label>

        <textarea
          name="description"
          class="form-textarea"
          placeholder="Описание опроса"
        ></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">
          Категория
        </label>

        <select
          name="category"
          class="form-select"
        >
          <option value="">
            Выберите категорию
          </option>

          <option value="IT">
            IT
          </option>

          <option value="Образование">
            Образование
          </option>

          <option value="Маркетинг">
            Маркетинг
          </option>
        </select>

        <p
          class="form-error hidden"
          data-error="category"
        ></p>
      </div>

      <div class="form-group">
        <label class="form-label">
          Тип голосования
        </label>

        <select
          name="type"
          class="form-select"
        >
          <option value="single">
            Один вариант
          </option>

          <option value="multiple">
            Несколько вариантов
          </option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">
          Дата завершения
        </label>

        <input
          type="datetime-local"
          name="expiresAt"
          class="form-input"
        />

        <p
          class="form-error hidden"
          data-error="expiresAt"
        ></p>
      </div>

      <div class="form-group">
        <label class="form-label">
          Варианты ответа
        </label>

        <div class="create-poll__options"></div>

        <button
          type="button"
          class="button create-poll__add-option"
        >
          Добавить вариант
        </button>

        <p
          class="form-error hidden"
          data-error="options"
        ></p>
      </div>

      <button
        type="submit"
        class="button"
      >
        Создать опрос
      </button>
    </form>
  `;

  const form =
    section.querySelector('form');

  const optionsContainer =
    section.querySelector(
      '.create-poll__options'
    );

  const addOptionButton =
    section.querySelector(
      '.create-poll__add-option'
    );

  /**
   * Создание поля варианта ответа
   */
  function createOptionField(
    value = ''
  ) {
    const wrapper =
      document.createElement('div');

    wrapper.className =
      'create-poll__option-row';

    wrapper.innerHTML = `
      <input
        type="text"
        class="form-input"
        name="option"
        value="${sanitizeString(value)}"
        placeholder="Вариант ответа"
      />

      <button
        type="button"
        class="button create-poll__remove-option"
      >
        ✕
      </button>
    `;

    const removeButton =
      wrapper.querySelector(
        '.create-poll__remove-option'
      );

    removeButton.addEventListener(
      'click',
      () => {
        wrapper.remove();
      }
    );

    return wrapper;
  }

  /**
   * Изначальные варианты
   */
  optionsContainer.append(
    createOptionField()
  );

  optionsContainer.append(
    createOptionField()
  );

  /**
   * Добавление варианта
   */
  addOptionButton.addEventListener(
    'click',
    () => {
      optionsContainer.append(
        createOptionField()
      );
    }
  );

  /**
   * Очистка ошибок
   */
  function clearErrors() {
    const errorElements =
      form.querySelectorAll(
        '.form-error'
      );

    errorElements.forEach(
      (element) => {
        element.textContent = '';

        element.classList.add(
          'hidden'
        );
      }
    );
  }

  /**
   * Отображение ошибок
   */
  function showErrors(errors) {
    Object.entries(errors).forEach(
      ([field, message]) => {
        const element =
          form.querySelector(
            `[data-error="${field}"]`
          );

        if (!element) {
          return;
        }

        element.textContent = message;

        element.classList.remove(
          'hidden'
        );
      }
    );
  }

  /**
   * Submit формы
   */
  form.addEventListener(
    'submit',
    (event) => {
      event.preventDefault();

      clearErrors();

      const formData =
        new FormData(form);

      const options = [
        ...form.querySelectorAll(
          '[name="option"]'
        )
      ].map((input) =>
        sanitizeString(input.value)
      );

      const pollData = {
        id: generateId('poll'),
        question:
          sanitizeString(
            formData.get('question')
          ),
        description:
          sanitizeString(
            formData.get(
              'description'
            )
          ),
        category:
          sanitizeString(
            formData.get('category')
          ),
        type: sanitizeString(
          formData.get('type')
        ),
        expiresAt:
          formData.get('expiresAt'),
        createdAt:
          new Date().toISOString(),
        authorId: 'local_user',
        options: options.map(
          (text) => ({
            id: generateId('option'),
            text
          })
        )
      };

      const errors =
        validatePollForm({
          ...pollData,
          options
        });

      if (
        Object.keys(errors).length
      ) {
        showErrors(errors);

        return;
      }

      saveCreatedPoll(pollData);

      form.reset();

      optionsContainer.innerHTML = '';

      optionsContainer.append(
        createOptionField()
      );

      optionsContainer.append(
        createOptionField()
      );

      section.insertAdjacentHTML(
        'beforeend',
        `
          <div class="card fade-in">
            <p>
              Опрос успешно создан!
            </p>
          </div>
        `
      );
    }
  );

  return section;
}