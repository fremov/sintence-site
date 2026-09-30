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

## riot.txt и свой домен

Код подтверждения, который Riot выдаст при заявке, кладётся файлом `riot.txt`
в корень репозитория. Riot ищет `riot.txt` в корне домена, а
`https://fremov.github.io/sintence-site/` — подкаталог, поэтому нужен свой домен:
тогда же добавляется файл `CNAME` с именем домена.
