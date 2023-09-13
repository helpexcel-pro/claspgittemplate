#  Инструкция

### Установка Clasp

Откройте терминал и введите:
```sh
npm install -g @google/clasp
```

Включите Google Apps Script API: https://script.google.com/home/usersettings

![Enable Apps Script API](https://user-images.githubusercontent.com/744973/54870967-a9135780-4d6a-11e9-991c-9f57a508bdf0.gif)

[Полная документация Clasp](https://github.com/google/clasp) (на английском)

### Инициализация

Для инициализации проекта введите в командной строке в папке с проектом:
```sh
npm i 
```

После того как установятся все зависимости, в папке `src` создайте отдельные папки для каждого appscript'a с которым будете работать в этом проекте.

![пример папок](https://github.com/helpexcel-pro/claspgittemplate/assets/101218004/19667cbf-8b10-4322-9328-04744481e303)

### Клонирование скриптов

Откройте в терминале папку для скрипта и введите команду:

```sh
clasp clone
```
с идентификатором скрипта
![Идентификатор скрипта](https://github.com/helpexcel-pro/claspgittemplate/assets/101218004/e922ad82-4b89-4eab-bbb2-de7dfba4689d)

или URL скрипта

#### Примеры:
- `clasp clone "15ImUCpyi1Jsd8yF8Z6wey_7cw793CymWTLxOqwMka3P1CzE5hQun6qiC"`
- `clasp clone "https://script.google.com/d/15ImUCpyi1Jsd8yF8Z6wey_7cw793CymWTLxOqwMka3P1CzE5hQun6qiC/edit"`

В папке сформируется конфиг-файл clasp'a .clasp.json(он не должен попадать в репозиторий!), конфиг-файл appsscript'a appsscript.json и все файлы которые были созданы.


### Правила записи переменных окружения

**Важно!** Все переменные с id папок, файлов, таблиц и листов записывать в отделный файл `_env.js`. Декларацию переменных необходимо производить только через `const`. 

### Запись данных проекта в конфиг-файл

После формирования первоначальных данных в `_env` и `.clasp.json`, для их записи в конфиг файл, в терминале введите команду:

`config:set:dev` - если вы в dev ветке репозитория
`config:set:prod` - если вы в основной ветке репозитория

в конфиг-файле все данные будут записаны согласно ключам `dev` и `prod`

### Чтение данных из конфиг-файла проекта

Для перезаписи данных в файлах `_env` и `.clasp.json` на те что хранятся в конфиг-файле, в терминале введите команду:

`config:get:dev` - будет взяты данные из ключа `dev` конфиг-файла
`config:get:prod` - будет взяты данные из ключа `prod` конфиг-файла
