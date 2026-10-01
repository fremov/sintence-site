# sintence-site

Статический сайт продукта Sintence (оверлей для League of Legends под Windows):
описание, Privacy Policy и Terms of Service. Нужен для заявки на продакшен-ключ Riot.

- Английский — в корне (`index.html`, `privacy.html`, `terms.html`), русский — в `ru/`.
- Чистый HTML и `assets/style.css`: без JavaScript, cookies, аналитики, внешних шрифтов и CDN.
- Все ссылки относительные — сайт работает и на GitHub Pages, и на своём домене.

## Посмотреть локально

Открыть `index.html` в браузере.

## Публикация

GitHub Pages: ветка `main`, папка `/` (корень). `.nojekyll` отключает Jekyll,
`404.html` — страница «не найдено».

## Домен

Сайт — https://sintence.ru (файл `CNAME`; DNS у Beget: четыре A-записи
`185.199.108–111.153` на корень, `www` — CNAME `fremov.github.io`).
Старый адрес `https://fremov.github.io/sintence-site/` перенаправляет сюда.
`robots.txt` и `sitemap.xml` — для поисковиков; в страницах `canonical`
и `hreflang` с полными адресами — при смене домена править их тоже.

## riot.txt

Код подтверждения, который Riot выдаст при заявке, кладётся файлом `riot.txt`
в корень репозитория — он будет на `https://sintence.ru/riot.txt`.
