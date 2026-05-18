(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();function C(e){const t=new Date(e);return new Intl.DateTimeFormat("ru-RU",{day:"2-digit",month:"long",year:"numeric"}).format(t)}function U(e,t=300){let o;return(...n)=>{clearTimeout(o),o=setTimeout(()=>{e(...n)},t)}}function T(e="id"){return`${e}_${Date.now()}_${Math.random().toString(16).slice(2)}`}function L(e){return new Date(e).getTime()<Date.now()}function f(e=""){const t=document.createElement("div");return t.textContent=String(e),t.innerHTML.trim()}function P(e={}){const t={};return Object.entries(e).forEach(([o,n])=>{if(typeof n=="string"){t[o]=f(n);return}t[o]=n}),t}function h(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch(t){return console.error("Storage read error:",t),null}}function _(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){console.error("Storage save error:",o)}}function M(){localStorage.clear()}function H(e=200){return new Promise(t=>{setTimeout(t,e)})}const N=[{id:"poll_1",question:"Ваш любимый язык программирования?",description:"Выберите один вариант",category:"IT",type:"single",createdAt:"2026-01-01",expiresAt:"2099-01-01",authorId:"system",options:[{id:"option_1",text:"JavaScript"},{id:"option_2",text:"Python"},{id:"option_3",text:"Java"}]}];async function $(){return await H(),N}const u={POLLS:"polls",CREATED_POLLS:"createdPolls",VOTES:"votes",USER_VOTES:"userVotes"};async function A(){const e=h(u.POLLS);if(e&&e.length)return e;const t=await $();return _(u.POLLS,t),t}async function q(){return await A()||[]}function w(){return h(u.CREATED_POLLS)||[]}function I(e){const t=h(u.POLLS)||[],o=h(u.CREATED_POLLS)||[];t.push(e),o.push(e),_(u.POLLS,t),_(u.CREATED_POLLS,o)}async function V(){return h(u.VOTES)||[]}function D(){return h(u.USER_VOTES)||[]}function k(e,t){const o=h(u.VOTES)||[],n=h(u.USER_VOTES)||[];o.push({id:crypto.randomUUID(),pollId:e,selectedOptions:t,createdAt:new Date().toISOString()}),n.push(e),_(u.VOTES,o),_(u.USER_VOTES,n)}function O(e){return(h(u.USER_VOTES)||[]).includes(e)}function x(e){const t=P(e),o=document.createElement("article");o.className="card poll-card fade-in";const n=L(t.expiresAt),r=O(t.id);let s="Активный",a="badge--active";return n&&(s="Завершён",a="badge--closed"),r&&!n&&(s="Вы участвовали",a="badge--voted"),o.innerHTML=`
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

    <p class="poll-card__description">
      ${t.description}
    </p>

    <div class="poll-card__footer">
      <div class="poll-card__meta">
        <span>
          До:
          ${C(t.expiresAt)}
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
  `,o}function B(e=[]){const t=document.createElement("section");return t.className="grid grid--2 grid--3",e.length?(e.forEach(o=>{t.append(x(o))}),t):(t.innerHTML=`
      <div class="card">
        <h2>Опросы не найдены</h2>

        <p>
          Попробуйте изменить параметры поиска.
        </p>
      </div>
    `,t)}async function J(){const e=document.createElement("section");e.className="home-page slide-up",e.innerHTML=`
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
  `;const t=e.querySelector('input[type="search"]'),o=e.querySelector("select"),n=e.querySelector(".home-page__content");let r=[];function s(){const a=f(t.value).toLowerCase(),i=o.value,c=r.filter(d=>{const l=d.question.toLowerCase().includes(a),p=L(d.expiresAt);return l&&(i==="all"||i==="active"&&!p||i==="closed"&&p)});n.innerHTML="",n.append(B(c))}try{r=await q(),s()}catch(a){console.error(a),n.innerHTML=`
      <div class="card">
        <h2>
          Ошибка загрузки
        </h2>

        <p>
          Не удалось загрузить опросы
        </p>
      </div>
    `}return t.addEventListener("input",U(s,300)),o.addEventListener("change",s),e}function F(e,t){const o={};return e.options.forEach(n=>{o[n.id]=0}),t.forEach(n=>{n.selectedOptions.forEach(r=>{o[r]!==void 0&&(o[r]+=1)})}),o}function j(e,t){const o=document.createElement("section");o.className="results-chart card fade-in";const n=F(e,t),r=t.length;o.innerHTML=`
    <h2 class="results-chart__title">
      Результаты голосования
    </h2>

    <div class="results-chart__list"></div>
  `;const s=o.querySelector(".results-chart__list");return e.options.forEach(a=>{const i=f(a.text),c=n[a.id]||0,d=r>0?Math.round(c/r*100):0,l=document.createElement("div");l.className="results-chart__item",l.innerHTML=`
      <div class="results-chart__header">
        <span>${i}</span>

        <span>
          ${c} голосов
          (${d}%)
        </span>
      </div>

      <div
        class="results-chart__bar"
        aria-hidden="true"
      >
        <div
          class="results-chart__fill"
          style="width: ${d}%"
        ></div>
      </div>
    `,s.append(l)}),o}async function z(e){const t=P(e),o=document.createElement("section");o.className="poll-detail card slide-up";const n=L(t.expiresAt),r=O(t.id);o.innerHTML=`
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
  `;const s=o.querySelector(".poll-detail__options"),a=o.querySelector(".poll-detail__form"),i=o.querySelector(".form-error"),c=o.querySelector(".poll-detail__results");t.options.forEach(l=>{const p=f(l.id),m=f(l.text),b=document.createElement("label");b.className="poll-detail__option",b.innerHTML=`
      <input
        type="${t.type==="multiple"?"checkbox":"radio"}"
        name="poll-option"
        value="${p}"
      />

      <span>${m}</span>
    `,s.append(b)});async function d(){const p=(await V()).filter(m=>m.pollId===t.id);c.innerHTML="",c.append(j(t,p))}return(r||n)&&await d(),a.addEventListener("submit",async l=>{l.preventDefault();const p=[...a.querySelectorAll("input:checked")];if(!p.length){i.textContent="Выберите вариант ответа",i.classList.remove("hidden");return}i.classList.add("hidden");const m=p.map(b=>b.value);k(t.id,m),a.reset(),a.innerHTML=`
        <p>
          Спасибо за участие в голосовании!
        </p>
      `,await d()}),o}async function K({query:e}){const t=document.createElement("section"),o=e.get("id");if(!o)return t.innerHTML=`
      <div class="card">
        <h2>Опрос не найден</h2>
      </div>
    `,t;try{const n=await q(),r=w(),a=[...n,...r].find(c=>c.id===o);if(!a)return t.innerHTML=`
        <div class="card">
          <h2>Опрос не найден</h2>

          <p>
            Возможно, опрос был удалён
          </p>
        </div>
      `,t;const i=await z(a);t.append(i)}catch(n){console.error("Poll page error:",n),t.innerHTML=`
      <div class="card">
        <h2>Ошибка загрузки</h2>

        <p>
          Не удалось загрузить опрос
        </p>
      </div>
    `}return t}function S(e){return String(e).trim().length>0}function Y(e,t=3){return String(e).trim().length>=t}function G(e=[]){return e.filter(o=>String(o).trim().length>0).length>=2}function Q(e){const t={};return S(e.question)||(t.question="Введите вопрос опроса"),Y(e.question,10)||(t.question="Вопрос должен содержать минимум 10 символов"),G(e.options)||(t.options="Добавьте минимум 2 варианта ответа"),S(e.category)||(t.category="Выберите категорию"),S(e.expiresAt)||(t.expiresAt="Укажите срок завершения опроса"),t}function W(){const e=document.createElement("section");e.className="card create-poll slide-up",e.innerHTML=`
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
  `;const t=e.querySelector("form"),o=e.querySelector(".create-poll__options"),n=e.querySelector(".create-poll__add-option");function r(i=""){const c=document.createElement("div");return c.className="create-poll__option-row",c.innerHTML=`
      <input
        type="text"
        class="form-input"
        name="option"
        value="${f(i)}"
        placeholder="Вариант ответа"
      />

      <button
        type="button"
        class="button create-poll__remove-option"
      >
        ✕
      </button>
    `,c.querySelector(".create-poll__remove-option").addEventListener("click",()=>{c.remove()}),c}o.append(r()),o.append(r()),n.addEventListener("click",()=>{o.append(r())});function s(){t.querySelectorAll(".form-error").forEach(c=>{c.textContent="",c.classList.add("hidden")})}function a(i){Object.entries(i).forEach(([c,d])=>{const l=t.querySelector(`[data-error="${c}"]`);l&&(l.textContent=d,l.classList.remove("hidden"))})}return t.addEventListener("submit",i=>{i.preventDefault(),s();const c=new FormData(t),d=[...t.querySelectorAll('[name="option"]')].map(m=>f(m.value)),l={id:T("poll"),question:f(c.get("question")),description:f(c.get("description")),category:f(c.get("category")),type:f(c.get("type")),expiresAt:c.get("expiresAt"),createdAt:new Date().toISOString(),authorId:"local_user",options:d.map(m=>({id:T("option"),text:m}))},p=Q({...l,options:d});if(Object.keys(p).length){a(p);return}I(l),t.reset(),o.innerHTML="",o.append(r()),o.append(r()),e.insertAdjacentHTML("beforeend",`
          <div class="card fade-in">
            <p>
              Опрос успешно создан!
            </p>
          </div>
        `)}),e}function X(){const e=document.createElement("section");return e.append(W()),e}const g={USERS:"users",CURRENT_USER:"currentUser"};function R(){const e=localStorage.getItem(g.USERS);return e?JSON.parse(e):[]}function Z(e){localStorage.setItem(g.USERS,JSON.stringify(e))}function ee({username:e,email:t,password:o}){const n=R();if(n.find(a=>a.email===t))throw new Error("Пользователь уже существует");const s={id:crypto.randomUUID(),username:e,email:t,password:o};return n.push(s),Z(n),localStorage.setItem(g.CURRENT_USER,JSON.stringify(s)),s}function te({email:e,password:t}){const n=R().find(r=>r.email===e&&r.password===t);if(!n)throw new Error("Неверный email или пароль");return localStorage.setItem(g.CURRENT_USER,JSON.stringify(n)),n}function y(){const e=localStorage.getItem(g.CURRENT_USER);return e?JSON.parse(e):null}function oe(){return!!y()}function ne(){localStorage.removeItem(g.CURRENT_USER)}function re(){const e=document.createElement("section");e.className="dashboard slide-up";const t=w(),o=D();e.innerHTML=`
    <div class="card dashboard__profile">
      <div class="dashboard__avatar">
        U
      </div>

      <div>
        <h1 class="page-title">
          Личный кабинет
        </h1>

        <p>
          ${y()?.username||"Гость"}
        </p>

        <p>
          ${y()?.email||"Нет email"}
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
  `;const n=e.querySelector(".dashboard__created");return t.length?t.forEach(s=>{n.append(x(s))}):n.innerHTML=`
      <div class="card">
        <p>
          Вы ещё не создавали опросы
        </p>
      </div>
    `,e.querySelector(".dashboard__logout").addEventListener("click",()=>{M(),window.location.reload()}),e}function se(){const e=document.createElement("section");return e.append(re()),e}function ae(){const e=document.createElement("section");return e.className="not-found-page card slide-up",e.innerHTML=`
    <h1 class="page-title">
      404
    </h1>

    <p>
      Страница не найдена
    </p>

    <button class="button">
      Вернуться на главную
    </button>
  `,e.querySelector("button").addEventListener("click",()=>{v("/")}),e}function ce(){const e=document.createElement("section");e.className="auth-page slide-up",e.innerHTML=`
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
  `;const t=e.querySelector("form"),o=e.querySelector(".auth-error");return t.addEventListener("submit",n=>{n.preventDefault();const r=t[0].value.trim(),s=t[1].value.trim();try{te({email:r,password:s}),v("/dashboard")}catch(a){o.textContent=a.message}}),e}function ie(){const e=document.createElement("section");e.className="auth-page slide-up",e.innerHTML=`
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
  `;const t=e.querySelector("form"),o=e.querySelector(".auth-error");return t.addEventListener("submit",n=>{n.preventDefault();const r=t[0].value.trim(),s=t[1].value.trim(),a=t[2].value.trim();try{ee({username:r,email:s,password:a}),v("/dashboard")}catch(i){o.textContent=i.message}}),e}const le={"/":J,"/poll":K,"/create":X,"/dashboard":se,"/login":ce,"/register":ie};function de(){return new URLSearchParams(window.location.search)}function ue(){return window.location.pathname.replace("/interactive-polls-platform","")||"/"}async function E(){const e=document.querySelector("#page-content");if(!e)return;const t=ue(),o=le[t];e.innerHTML="";try{if(!o){e.append(ae());return}const n=await o({query:de()});e.append(n),e.focus()}catch(n){console.error("Ошибка рендера страницы:",n),e.innerHTML=`
      <section class="card">
        <h2>Ошибка загрузки страницы</h2>

        <p>
          Не удалось отобразить страницу.
        </p>
      </section>
    `}}function v(e){window.history.pushState({},"",e),E()}function pe(e){const t=e.target.closest("[data-link]");if(!t)return;e.preventDefault();const o=t.getAttribute("href");o&&v(o)}function fe(){window.addEventListener("popstate",E),document.addEventListener("click",pe),E()}function me(){const e=document.createElement("header");e.className="header";const t=oe()?`
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
  `,e.querySelectorAll("[data-route]").forEach(s=>{s.addEventListener("click",()=>{v(s.dataset.route)})});const o=e.querySelector(".login-btn"),n=e.querySelector(".register-btn"),r=e.querySelector(".logout-btn");return o&&o.addEventListener("click",()=>v("/login")),n&&n.addEventListener("click",()=>v("/register")),r&&r.addEventListener("click",()=>{ne(),window.location.reload()}),e}function he(){const e=document.createElement("div");return e.className="footer",e.innerHTML=`
    <div class="container footer__container">
      <p class="footer__text">
        © 2026 Interactive Polls Platform
      </p>

      <p class="footer__text">
        Курсовой проект по frontend-разработке
      </p>
    </div>
  `,e}const ve=document.querySelector("#app");function ge(){ve.innerHTML=`
    <div class="app-layout">
      <header id="header"></header>

      <main
        id="page-content"
        class="page-content"
        tabindex="-1"
      ></main>

      <footer id="footer"></footer>
    </div>
  `}function be(){const e=document.querySelector("#header"),t=document.querySelector("#footer");e.append(me()),t.append(he())}function _e(){ge(),be(),fe()}_e();
//# sourceMappingURL=index-uf54yj9C.js.map
