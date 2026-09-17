# Pet-Project  "Korean-fashion-style"
<img width="2340" height="6163" alt="localhost_8080_privacy" src="https://github.com/user-attachments/assets/a00298ed-66f1-4582-8d17-4ce453987146" />
![Uploading localhost_8080_privacy (7).png…]()
<img width="2215" height="1802" alt="localhost_8080_privacy (5)" src="https://github.com/user-attachments/assets/49ff6ff9-03ee-44ae-a0ea-2fcd363d7b40" />
<img width="2195" height="2253" alt="localhost_8080_privacy (3)" src="https://github.com/user-attachments/assets/f53d8a9d-0ad2-44f8-b484-07d8470b4a3c" />
<img width="2223" height="1802" alt="localhost_8080_privacy (2)" src="https://github.com/user-attachments/assets/368e8f96-cd1a-4b0b-bf61-f2f8a7bf6651" />
<img width="2223" height="1802" alt="localhost_8080_privacy (1)" src="https://github.com/user-attachments/assets/472543de-49b3-405a-b44a-24e17518e3e5" />
<img width="2195" height="1802" alt="localhost_8080_privacy (9)" src="https://github.com/user-attachments/assets/a26da3f7-8367-4b53-b323-ecfe158bd09d" />
<img width="2195" height="1802" alt="localhost_8080_privacy (8)" src="https://github.com/user-attachments/assets/6b5a02d9-b490-473f-b722-1ed364c8970e" />

Магазин корейской одежды 


- **Source Code:** GitHub Repository - 'https://github.com/kristinaJ7/Korean-fashion-style.git',
- **Live Demo:**'https://kristinaj7.github.io/Korean-fashion-style/',


# Стек и зависимости
 - Frontend: React 18, TypeScript 5+
 - State Management: Redux Toolkit
 - Routing: React Router DOM
 - Build: Webpack (HMR, production-сборки, плагины)
 - Backend/Auth/DB: Supabase (PostgreSQL + Auth + Storage)
 - Styling: CSS-модули / глобальный сброс + кастомные стили





### Установка зависимостей

```bash
npm install
# или
yarn
# или
pnpm install
```


#  Запуск:

```
npm run dev
# или
npm run start
```


#Сборка:
```
npm run build
```


# Project structure: 
- `src/components/app/` — компоненты, которые используются в основном макете (шапка, футер, секции каталога).
- `src/components/ui/` — базовые UI-компоненты и дополнительные блоки




```
Korean-fashion-style/
├── .husky/
├── node_modules/
├── public/
└── src/
    ├── assets/                 # Картинки, шрифты, иконки
    ├── components/    # бизнес-логика коппонентов
    │   └── ui/              #  UI компоненты 
    │       ├── cover/
    │       ├── fashion-product/
    │       ├── fashion-products/
    │       ├── favorites-List/
    │       ├── feed-info/
    │       ├── footer/
    │       ├── form-block/
    │       ├── modal/
    │       ├── order-card/
    │       ├── order-info/
    │       ├── orders-list/
    │       ├── pages/          # страницы UI
    │       ├── preloader/
    │       ├── Product-Cards-Section/
    │       ├── product-category/
    │       ├── profile-menu/
    │       └── success/
    ├── data/                   # тут лежат данные 
    ├── pages/                  # страницы приложения (React Router)
    │   ├── HomePage.tsx
    │   ├── CatalogPage.tsx     # рендерится Product-Cards-Section + product-category
    │   ├── ProfilePage.tsx
    │   └── CheckoutPage.tsx
    ├── shared/                 
    │   ├── ДОПИСАТЬ ОБЩИЕ КОМПОНЕНТЫ
    │   ├── 
    │   
    ├── store/                  # Redux store и слайсы
    │   ├── store.ts            # configureStore
    │   ├── basketSlice.ts
    │   ├── productsSlice.ts    # Логика фильтрации и товаров
    │   └── authSlice.ts
    ├── utils/                  # Вспомогательные функции
    ├── custom.d.ts
    ├── img.d.ts
    ├── global.css
    ├── index.tsx               # Точка входа приложения
    ├── .env
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.js
    ├── README.md
    ├── tsconfig.json
    └── webpack.config.js
```





# получение данных

# Данные приходят из Supabase через цепочку: Supabase DB → Utils API → Redux Store → UI.


В файле src/utils/supabase-client.ts создается единый экземпляр клиента. Он проверяет переменные окружения и настраивает хранение сессии в localStorage. Глобальный клиент БД


- export const supabase = createClient(supabaseUrl, supabaseAnonKey, { auth: { storage: window.localStorage, ... } });



# Товары: src/utils/fashion-api.ts → функция fetchProducts().

- Делает SELECT * из таблицы Korean_fashion_style.
- Сортирует по дате: .order("created_at", { ascending: false }).
- Нормализует типы (например, цену из строки в число) и подставляет значения по умолчанию через normalizeProduct.


# Контакты: src/utils/form-api.ts → функция sendContactForm().

- Отправляет данные методом .insert() в таблицу Korean_fashion_style_contacts.


# Профиль: src/utils/fashion-api.ts → функция fetchUserProfile(userId).

- Делает запрос по ID пользователя. Если данных нет — возвращает пустой объект, чтобы приложение не упало.
















# 🗄 Архитектура данных и поток выполнения (Data Flow)

Приложение построено по принципу централизованной загрузки данных и реактивного обновления состояния. Ниже описан ключевой механизм работы главного компонента `App.tsx`.

## 📥 Получение и нормализация данных

При инициализации приложения происходит единовременная загрузка каталога товаров.

*   **Источник:** Таблица `Korean_fashion_style` в Supabase.
*   **Метод:** Функция `fetchProducts()` из `src/utils/fashion-api.ts`.
*   **Нормализация:** В компоненте `App` данные проходят дополнительную обработку в `useEffect`:
    *   Категории, хранящиеся в базе на корейском или смешанном языке (например, `"신발"` или `"shoe"`), приводятся к единому типу TypeScript: `'men' | 'women' | 'shoes' | 'accessories' | 'other'`.
    *   Это позволяет использовать строгую типизацию во всех дочерних компонентах (фильтры, карточки).
*   **Хранение:** Данные сохраняются в локальном стейте компонента `App` (`allProducts`) и передаются вниз по дереву компонентов (например, в `ProductCardsSection`).

## 🔐 Управление авторизацией и сессией

Логика проверки пользователя вынесена в главный компонент для обеспечения глобального контроля доступа.

*   **Проверка сессии:** При монтировании `App` вызывает `supabase.auth.getSession()`.
*   **Синхронизация:** Используется подписка `onAuthStateChange`, которая отслеживает события входа (`SIGNED_IN`) и выхода (`SIGNED_OUT`) в реальном времени, обновляя Redux-стор через экшены `loginSuccess` и `logout`.
*   **Результат:** Флаг `isAuthenticated` в сторе мгновенно обновляется, что влияет на отображение шапки, доступ к приватным страницам и состояние корзины.

## 🗺 Маршрутизация и защита страниц

Используется `react-router-dom` с кастомными обертками для контроля доступа:

| Тип страницы | Компонент-обертка | Логика |
| :--- | :--- | :--- |
| **Приватные** (`/profile`) | `ProtectedRoute` | Если пользователь не авторизован → редирект на `/login`. |
| **Публичные** (`/login`, `/register`) | `PublicRoute` | Если пользователь авторизован → редирект на главную (`/`). |
| **Модальные** (`/cart`, `/favorites`) | `ModalWrapper` | Рендерит контент внутри модального окна. Поведение зависит от наличия `location.state.background`: <br> • Есть `background` → окно поверх текущей страницы. <br> • Нет `background` → страница открывается как отдельный экран. |

## 🧱 Ключевые файлы реализации

| Задача | Файл | Описание |
| :--- | :--- | :--- |
| **Инициализация БД клиента** | `src/utils/supabase-client.ts` | Создание экземпляра `supabase` с настройками хранения токенов. |
| **API запросы** | `src/utils/fashion-api.ts` | Функции `fetchProducts()`, `fetchUserProfile()`, нормализация типов. |
| **Логика главного экрана** | `src/App.tsx` | Загрузка товаров, проверка авторизации, настройка роутов, передача пропсов. |
| **Слайсы Redux** | `src/store/slices/*.ts` | Хранение состояния авторизации (`authSlice`), корзины (`basketSlice`). |
| **UI Компоненты** | `src/components/ui/*` | Переиспользуемые элементы (карточки, кнопки, модалки). |

## ⚙️ Пример потока данных (User Flow)

1.  Пользователь открывает сайт (`/`).
2.  Срабатывает `useEffect` в `App.tsx`: грузятся товары из Supabase, нормализуются категории.
3.  Параллельно проверяется сессия Supabase. Если есть токен — обновляется Redux-стор.
4.  Рендерится `CoverUI` + `ProductCardsSection` (с переданными товарами).
5.  Пользователь кликает на «Корзина».
6.  Происходит переход на роут `/cart`.
7.  Так как переход был из каталога, в `location.state` есть `background`.
8.  `ModalWrapper` видит `background` и рендерит `BasketListUI` внутри модального окна поверх каталога.   
