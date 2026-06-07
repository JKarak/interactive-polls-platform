(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();function M(e){const t=new Date(e);return new Intl.DateTimeFormat("ru-RU",{day:"2-digit",month:"long",year:"numeric"}).format(t)}function U(e,t=300){let o;return(...n)=>{clearTimeout(o),o=setTimeout(()=>{e(...n)},t)}}function P(e="id"){return`${e}_${Date.now()}_${Math.random().toString(16).slice(2)}`}function T(e){return new Date(e).getTime()<Date.now()}function f(e=""){const t=document.createElement("div");return t.textContent=String(e),t.innerHTML.trim()}function w(e={}){const t={};return Object.entries(e).forEach(([o,n])=>{if(typeof n=="string"){t[o]=f(n);return}t[o]=n}),t}function h(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch(t){return console.error("Storage read error:",t),null}}function y(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){console.error("Storage save error:",o)}}function H(){localStorage.clear()}function $(e=200){return new Promise(t=>{setTimeout(t,e)})}const N=[{id:"poll_1",question:"Ваш любимый язык программирования?",description:"Выберите один вариант",category:"IT",type:"single",createdAt:"2026-01-01",expiresAt:"2099-01-01",authorId:"system",options:[{id:"option_1",text:"JavaScript"},{id:"option_2",text:"Python"},{id:"option_3",text:"Java"}]}];async function A(){return await $(),N}const d={POLLS:"polls",CREATED_POLLS:"createdPolls",VOTES:"votes",USER_VOTES:"userVotes"};async function I(){const e=h(d.POLLS);if(e&&e.length)return e;const t=await A();return y(d.POLLS,t),t}async function q(){return await I()||[]}function x(){return h(d.CREATED_POLLS)||[]}function V(e){const t=h(d.POLLS)||[],o=h(d.CREATED_POLLS)||[];t.push(e),o.push(e),y(d.POLLS,t),y(d.CREATED_POLLS,o)}async function D(){return h(d.VOTES)||[]}function k(){return h(d.USER_VOTES)||[]}function B(e,t){const o=h(d.VOTES)||[],n=h(d.USER_VOTES)||[];o.push({id:crypto.randomUUID(),pollId:e,selectedOptions:t,createdAt:new Date().toISOString()}),n.push(e),y(d.VOTES,o),y(d.USER_VOTES,n)}function O(e){return(h(d.USER_VOTES)||[]).includes(e)}function C(e){const t=w(e),o=document.createElement("article");o.className="card poll-card fade-in";const n=T(t.expiresAt),r=O(t.id);let s="Активный",a="badge--active";return n&&(s="Завершён",a="badge--closed"),r&&!n&&(s="Вы участвовали",a="badge--voted"),o.innerHTML=`
    <div class="poll-card__top">
      <span
        class="
          badge
          ${a}
        "
      >
        ${s}
      </span>

      <span class="poll-card__category">
        ${t.category}
      </span>
    </div>

    <h2 class="poll-card__title">
      ${t.question}
    </h2>

    ${t.country?`
          <p class="poll-card__country">
            Страна: ${t.country}
          </p>
        `:""}

    <p class="poll-card__description">
      ${t.description}
    </p>

    <div class="poll-card__footer">
      <div class="poll-card__meta">
        <span>
          До:
          ${M(t.expiresAt)}
        </span>
      </div>

      <a
        href="/poll?id=${t.id}"
        class="button"
        data-link
      >
        ${r?"Результаты":"Открыть"}
      </a>
    </div>
  `,o}function J(e=[]){const t=document.createElement("section");return t.className="grid grid--2 grid--3",e.length?(e.forEach(o=>{t.append(C(o))}),t):(t.innerHTML=`
      <div class="card">
        <h2>Опросы не найдены</h2>

        <p>
          Попробуйте изменить параметры поиска.
        </p>
      </div>
    `,t)}async function F(){const e=document.createElement("section");e.className="home-page slide-up",e.innerHTML=`
    <div class="section">
      <h1 class="page-title">
        Интерактивные опросы
      </h1>

      <div class="home-page__filters">
        <input
          type="search"
          class="form-input"
          placeholder="Поиск опросов..."
          aria-label="Поиск опросов"
        />

        <select
          class="form-select"
          aria-label="Фильтр по статусу"
        >
          <option value="all">
            Все статусы
          </option>

          <option value="active">
            Активные
          </option>

          <option value="closed">
            Завершённые
          </option>
        </select>
      </div>
    </div>

    <div class="home-page__content">
      <div class="card">
        Загрузка опросов...
      </div>
    </div>
  `;const t=e.querySelector('input[type="search"]'),o=e.querySelector("select"),n=e.querySelector(".home-page__content");let r=[];function s(){const a=f(t.value).toLowerCase(),u=o.value,m=r.filter(l=>{const c=l.question.toLowerCase().includes(a),i=T(l.expiresAt);return c&&(u==="all"||u==="active"&&!i||u==="closed"&&i)});n.innerHTML="",n.append(J(m))}try{r=await q(),s()}catch(a){console.error(a),n.innerHTML=`
      <div class="card">
        <h2>
          Ошибка загрузки
        </h2>

        <p>
          Не удалось загрузить опросы
        </p>
      </div>
    `}return t.addEventListener("input",U(s,300)),o.addEventListener("change",s),e}function j(e,t){const o={};return e.options.forEach(n=>{o[n.id]=0}),t.forEach(n=>{n.selectedOptions.forEach(r=>{o[r]!==void 0&&(o[r]+=1)})}),o}function z(e,t){const o=document.createElement("section");o.className="results-chart card fade-in";const n=j(e,t),r=t.length;o.innerHTML=`
    <h2 class="results-chart__title">
      Результаты голосования
    </h2>

    <div class="results-chart__list"></div>
  `;const s=o.querySelector(".results-chart__list");return e.options.forEach(a=>{const u=f(a.text),m=n[a.id]||0,l=r>0?Math.round(m/r*100):0,c=document.createElement("div");c.className="results-chart__item",c.innerHTML=`
      <div class="results-chart__header">
        <span>${u}</span>

        <span>
          ${m} голосов
          (${l}%)
        </span>
      </div>

      <div
        class="results-chart__bar"
        aria-hidden="true"
      >
        <div
          class="results-chart__fill"
          style="width: ${l}%"
        ></div>
      </div>
    `,s.append(c)}),o}async function K(e){const t=w(e),o=document.createElement("section");o.className="poll-detail card slide-up";const n=T(t.expiresAt),r=O(t.id);o.innerHTML=`
    <div class="poll-detail__header">
      <span class="badge ${n?"badge--closed":"badge--active"}">
        ${n?"Завершён":"Активный"}
      </span>

      <span class="poll-detail__category">
        ${t.category}
      </span>
    </div>

    <h1 class="page-title">
      ${t.question}
    </h1>

    <p class="poll-detail__description">
      ${t.description}
    </p>

    <form
      class="poll-detail__form"
      aria-label="Форма голосования"
    >
      <div class="poll-detail__options"></div>

      <button
        type="submit"
        class="button"
        ${n||r?"disabled":""}
      >
        ${r?"Вы уже голосовали":"Проголосовать"}
      </button>

      <p class="form-error hidden"></p>
    </form>

    <div class="poll-detail__results"></div>
  `;const s=o.querySelector(".poll-detail__options"),a=o.querySelector(".poll-detail__form"),u=o.querySelector(".form-error"),m=o.querySelector(".poll-detail__results");t.options.forEach(c=>{const i=f(c.id),p=f(c.text),v=document.createElement("label");v.className="poll-detail__option",v.innerHTML=`
      <input
        type="${t.type==="multiple"?"checkbox":"radio"}"
        name="poll-option"
        value="${i}"
      />

      <span>${p}</span>
    `,s.append(v)});async function l(){const i=(await D()).filter(p=>p.pollId===t.id);m.innerHTML="",m.append(z(t,i))}return(r||n)&&await l(),a.addEventListener("submit",async c=>{c.preventDefault();const i=[...a.querySelectorAll("input:checked")];if(!i.length){u.textContent="Выберите вариант ответа",u.classList.remove("hidden");return}u.classList.add("hidden");const p=i.map(v=>v.value);B(t.id,p),a.reset(),a.innerHTML=`
        <p>
          Спасибо за участие в голосовании!
        </p>
      `,await l()}),o}async function Y({query:e}){const t=document.createElement("section"),o=e.get("id");if(!o)return t.innerHTML=`
      <div class="card">
        <h2>Опрос не найден</h2>
      </div>
    `,t;try{const n=await q(),r=x(),a=[...n,...r].find(m=>m.id===o);if(!a)return t.innerHTML=`
        <div class="card">
          <h2>Опрос не найден</h2>

          <p>
            Возможно, опрос был удалён
          </p>
        </div>
      `,t;const u=await K(a);t.append(u)}catch(n){console.error("Poll page error:",n),t.innerHTML=`
      <div class="card">
        <h2>Ошибка загрузки</h2>

        <p>
          Не удалось загрузить опрос
        </p>
      </div>
    `}return t}function S(e){return String(e).trim().length>0}function G(e,t=3){return String(e).trim().length>=t}function Q(e=[]){return e.filter(o=>String(o).trim().length>0).length>=2}function W(e){const t={};return S(e.question)||(t.question="Введите вопрос опроса"),G(e.question,10)||(t.question="Вопрос должен содержать минимум 10 символов"),Q(e.options)||(t.options="Добавьте минимум 2 варианта ответа"),S(e.category)||(t.category="Выберите категорию"),S(e.expiresAt)||(t.expiresAt="Укажите срок завершения опроса"),t}async function X(){try{const e=await fetch("https://restcountries.com/v3.1/all?fields=name");if(!e.ok)throw new Error("Ошибка загрузки стран");return(await e.json()).map(o=>o.name.common).sort()}catch(e){return console.error(e),[]}}function Z(){const e=document.createElement("section");e.className="card create-poll slide-up",e.innerHTML=`
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
          Страна проведения
        </label>

        <select
          name="country"
          class="form-select"
        >
          <option value="">
            Загрузка списка стран...
          </option>
        </select>
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
  `;const t=e.querySelector("form"),o=t.querySelector('[name="country"]'),n=e.querySelector(".create-poll__options"),r=e.querySelector(".create-poll__add-option");async function s(){const l=await X();o.innerHTML=`
      <option value="">
        Выберите страну
      </option>
    `,l.forEach(c=>{const i=document.createElement("option");i.value=c,i.textContent=c,o.append(i)})}s();function a(l=""){const c=document.createElement("div");return c.className="create-poll__option-row",c.innerHTML=`
      <input
        type="text"
        class="form-input"
        name="option"
        value="${f(l)}"
        placeholder="Вариант ответа"
      />

      <button
        type="button"
        class="button create-poll__remove-option"
      >
        ✕
      </button>
    `,c.querySelector(".create-poll__remove-option").addEventListener("click",()=>{c.remove()}),c}n.append(a()),n.append(a()),r.addEventListener("click",()=>{n.append(a())});function u(){t.querySelectorAll(".form-error").forEach(c=>{c.textContent="",c.classList.add("hidden")})}function m(l){Object.entries(l).forEach(([c,i])=>{const p=t.querySelector(`[data-error="${c}"]`);p&&(p.textContent=i,p.classList.remove("hidden"))})}return t.addEventListener("submit",l=>{l.preventDefault(),u();const c=new FormData(t),i=[...t.querySelectorAll('[name="option"]')].map(_=>f(_.value)),p={id:P("poll"),question:f(c.get("question")),description:f(c.get("description")),category:f(c.get("category")),country:f(c.get("country")),type:f(c.get("type")),expiresAt:c.get("expiresAt"),createdAt:new Date().toISOString(),authorId:"local_user",options:i.map(_=>({id:P("option"),text:_}))},v=W({...p,options:i});if(Object.keys(v).length){m(v);return}V(p),t.reset(),n.innerHTML="",n.append(a()),n.append(a()),e.insertAdjacentHTML("beforeend",`
          <div class="card fade-in">
            <p>
              Опрос успешно создан!
            </p>
          </div>
        `)}),e}function ee(){const e=document.createElement("section");return e.append(Z()),e}const b={USERS:"users",CURRENT_USER:"currentUser"};function R(){const e=localStorage.getItem(b.USERS);return e?JSON.parse(e):[]}function te(e){localStorage.setItem(b.USERS,JSON.stringify(e))}function oe({username:e,email:t,password:o}){const n=R();if(n.find(a=>a.email===t))throw new Error("Пользователь уже существует");const s={id:crypto.randomUUID(),username:e,email:t,password:o};return n.push(s),te(n),localStorage.setItem(b.CURRENT_USER,JSON.stringify(s)),s}function ne({email:e,password:t}){const n=R().find(r=>r.email===e&&r.password===t);if(!n)throw new Error("Неверный email или пароль");return localStorage.setItem(b.CURRENT_USER,JSON.stringify(n)),n}function E(){const e=localStorage.getItem(b.CURRENT_USER);return e?JSON.parse(e):null}function re(){return!!E()}function se(){localStorage.removeItem(b.CURRENT_USER)}function ae(){const e=document.createElement("section");e.className="dashboard slide-up";const t=x(),o=k();e.innerHTML=`
    <div class="card dashboard__profile">
      <div class="dashboard__avatar">
        U
      </div>

      <div>
        <h1 class="page-title">
          Личный кабинет
        </h1>

        <p>
          ${E()?.username||"Гость"}
        </p>

        <p>
          ${E()?.email||"Нет email"}
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
          ${o.length}
          голосованиях
        </p>
      </div>
    </section>

    <button
      class="button dashboard__logout"
    >
      Очистить сессию
    </button>
  `;const n=e.querySelector(".dashboard__created");return t.length?t.forEach(s=>{n.append(C(s))}):n.innerHTML=`
      <div class="card">
        <p>
          Вы ещё не создавали опросы
        </p>
      </div>
    `,e.querySelector(".dashboard__logout").addEventListener("click",()=>{H(),window.location.reload()}),e}function ce(){const e=document.createElement("section");return e.append(ae()),e}function ie(){const e=document.createElement("section");return e.className="not-found-page card slide-up",e.innerHTML=`
    <h1 class="page-title">
      404
    </h1>

    <p>
      Страница не найдена
    </p>

    <button class="button">
      Вернуться на главную
    </button>
  `,e.querySelector("button").addEventListener("click",()=>{g("/")}),e}function le(){const e=document.createElement("section");e.className="auth-page slide-up",e.innerHTML=`
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
  `;const t=e.querySelector("form"),o=e.querySelector(".auth-error");return t.addEventListener("submit",n=>{n.preventDefault();const r=t[0].value.trim(),s=t[1].value.trim();try{ne({email:r,password:s}),g("/dashboard")}catch(a){o.textContent=a.message}}),e}function ue(){const e=document.createElement("section");e.className="auth-page slide-up",e.innerHTML=`
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
  `;const t=e.querySelector("form"),o=e.querySelector(".auth-error");return t.addEventListener("submit",n=>{n.preventDefault();const r=t[0].value.trim(),s=t[1].value.trim(),a=t[2].value.trim();try{oe({username:r,email:s,password:a}),g("/dashboard")}catch(u){o.textContent=u.message}}),e}const de={"/":F,"/poll":Y,"/create":ee,"/dashboard":ce,"/login":le,"/register":ue};function pe(){return new URLSearchParams(window.location.search)}function fe(){return window.location.pathname.replace("/interactive-polls-platform","")||"/"}async function L(){const e=document.querySelector("#page-content");if(!e)return;const t=fe(),o=de[t];e.innerHTML="";try{if(!o){e.append(ie());return}const n=await o({query:pe()});e.append(n),e.focus()}catch(n){console.error("Ошибка рендера страницы:",n),e.innerHTML=`
      <section class="card">
        <h2>Ошибка загрузки страницы</h2>

        <p>
          Не удалось отобразить страницу.
        </p>
      </section>
    `}}function g(e){window.history.pushState({},"",e),L()}function me(e){const t=e.target.closest("[data-link]");if(!t)return;e.preventDefault();const o=t.getAttribute("href");o&&g(o)}function he(){window.addEventListener("popstate",L),document.addEventListener("click",me),L()}function ve(){const e=document.createElement("header");e.className="header";const t=re()?`
        <button
          class="button logout-btn"
        >
          Выйти
        </button>
      `:`
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
      `;e.innerHTML=`
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
        ${t}
      </div>

    </div>
  `,e.querySelectorAll("[data-route]").forEach(s=>{s.addEventListener("click",()=>{g(s.dataset.route)})});const o=e.querySelector(".login-btn"),n=e.querySelector(".register-btn"),r=e.querySelector(".logout-btn");return o&&o.addEventListener("click",()=>g("/login")),n&&n.addEventListener("click",()=>g("/register")),r&&r.addEventListener("click",()=>{se(),window.location.reload()}),e}function ge(){const e=document.createElement("div");return e.className="footer",e.innerHTML=`
    <div class="container footer__container">
      <p class="footer__text">
        © 2026 Interactive Polls Platform
      </p>

      <p class="footer__text">
        Курсовой проект по frontend-разработке
      </p>
    </div>
  `,e}const be=document.querySelector("#app");function ye(){be.innerHTML=`
    <div class="app-layout">
      <header id="header"></header>

      <main
        id="page-content"
        class="page-content"
        tabindex="-1"
      ></main>

      <footer id="footer"></footer>
    </div>
  `}function _e(){const e=document.querySelector("#header"),t=document.querySelector("#footer");e.append(ve()),t.append(ge())}function Se(){ye(),_e(),he()}Se();
//# sourceMappingURL=index-CzkgkDFi.js.map
