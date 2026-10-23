# Городской портал Махачкалы

Одностраничный сайт с городской информацией, афишей событий, погодой и полезными услугами. Интерфейс написан на React, а афишу отдаёт Express API.

**Сайт:** [city-widget-site.vercel.app](https://city-widget-site.vercel.app/?v=7fb587d#services)

## Возможности

- Главная секция с картой Махачкалы и краткой информацией о городе.
- Лента событий с переключением карточек.
- Афиша с поиском, фильтром по категориям и сортировкой по дате, цене и популярности.
- Избранные события; выбранные идентификаторы сохраняются в `localStorage` браузера.
- Погода и прогноз на пять дней для Махачкалы, Каспийска и Буйнакска через Open-Meteo.
- Карточки городских услуг с адресами и телефонами организаций, новости и полезные адреса.
- Светлая и тёмная темы; выбор темы сохраняется в `localStorage`.
- Адаптивная вёрстка для компьютеров и телефонов.

## Технологии

| Часть | Технологии |
| --- | --- |
| Интерфейс | React 19, Vite 8, CSS Modules |
| Сервер | Node.js, Express 5, TypeScript |
| Данные событий | `backend/events.ts`, эндпоинт `GET /api/events` |
| Погода | Open-Meteo Forecast API |
| Карта | OpenStreetMap |
| Размещение | Vercel |

## Как устроен проект

```text
src/
  App.jsx                  тема и состояние избранного
  components/
    Header/                навигация, погода, избранное
    Main/                  секции страницы, карточки и окна событий
    Footer/                ссылки в нижней части страницы
public/                    изображения и иконки
backend/
  index.ts                 Express API
  events.ts                данные афиши
vite.config.js             прокси /api для локальной разработки
vercel.static.json         маршрутизация опубликованного сайта
```

`Main/index.jsx` собирает секции страницы. `useEvents.js` загружает афишу с `/api/events`; если запрос не удался, интерфейс использует локальные данные из `backend/events.ts`. Компонент `Header/Weather.jsx` отдельно обращается к Open-Meteo.

## API

`GET /api/events` возвращает JSON-массив событий. Каждое событие содержит `id`, `title`, `category`, `date`, `startTime`, `venue`, `price` и `popularity`. Исходные данные лежат в `backend/events.ts`.

Во время локальной разработки Vite перенаправляет запросы `/api` на Express-сервер по адресу `http://localhost:3000`. Если API работает по другому адресу, задайте переменную окружения `CITY_API_URL` перед запуском Vite. На Vercel запросы `/api` с сайта перенаправляются в отдельный проект API по правилам `vercel.static.json`.

## Запуск сайта вместе с бэкендом

Нужны Node.js 24 и npm. Склонируйте репозиторий, перейдите в его папку и выполните:

```bash
git clone https://github.com/sen1or0dio/city-widget.git
cd city-widget
npm install
npm run dev
```

`npm install` также установит зависимости папки `backend`. Команда `npm run dev` одновременно запустит Express API и Vite:

- сайт: `http://localhost:5173`;
- API: `http://localhost:3000/api/events`.

Откройте `http://localhost:5173` в браузере. Проверьте ответ бэкенда по адресу `http://localhost:3000/api/events`. Остановить оба процесса можно сочетанием `Ctrl+C` в терминале. Отдельные проверки: `npm run build`, `npm run lint` и `npm --prefix backend run typecheck`.
