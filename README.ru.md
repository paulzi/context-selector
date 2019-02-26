# context-selector

[![NPM version](http://img.shields.io/npm/v/context-selector.svg?style=flat)](https://www.npmjs.org/package/context-selector)
[![Build Status](https://img.shields.io/travis/paulzi/context-selector/master.svg)](https://travis-ci.org/paulzi/context-selector)
[![Downloads](https://img.shields.io/npm/dt/context-selector.svg)](https://www.npmjs.org/package/context-selector)
![License](https://img.shields.io/npm/l/context-selector.svg)

Find elements relative other by CSS selector.

[English readme](https://github.com/paulzi/context-selector/)

## Установка

```sh
npm install context-selector
```

## Использование

```html
<div class="accord">
    <div class="accord__item">
        <button class="accord__btn" type="button">Expand</button>
        <div class="accord__content">item 1</div>
    </div>
    <div class="accord__item">
        <button class="accord__btn" type="button">Expand</button>
        <div class="accord__content">item 2</div>
    </div>
</div>
```

```javascript
import ContextSelector from 'context-selector';

document.addEventListener('click', function(e) {
    let btn = e.target.closest('.accord__btn');
    if (btn) {
        ContextSelector.one(btn, '.accord__item << .accord__content').classList.add('accord__content_active');
    }
});
```

## Документация

### Селекторы

Библиотека предоставляет расширенный CSS-синтаксис для поиска элементов относительно другого элемента.
Синтаксис состоит из двух частей разделённых оператором `<<`.
Первая часть расширенного селектора выбирает верхний контексный элемент для поиска элемента по второй части селектора.
Первая часть селектора можетт принимать следующие значения:

- `$document` или пустота - селектор превращается в обычный селектор по документу;
- `$context` - поиск внутри контекстного элемента;
- *любой CSS-селектор* - поиск родительского элемента для поиск относительно него.

Вторая часть - обычный CSS-селектор. Если вторая часть пропущена, возвращается верхний контекст найденный по первой части.

### Варианты импорта

Есть несколько входных точек для импорта библиотеки:

- `import ContextSelector from 'context-selector'` - аналогично `with-shims`;
- `import ContextSelector from 'context-selector/standard'` - простой импорт без полифилов для ie11;
- `import ContextSelector from 'context-selector/with-shims'` - импорт с прокладками для ie11;
- `import ContextSelector from 'context-selector/with-polyfills'` - импорт с полифилами для ie11.

Отличия прокладок от полифилов можете прочитать в [polyshim](https://github.com/paulzi/polyshim/).

При прямом подключении скрипта из папки `dist` в браузер, получить экземпляр ContextSelector можно через `window.ContextSelector.default`.

### Методы

- `one(context, selector)` - поиск первого элемента по расширенному селектору
    - `context {Element}` - контекстный элемент
    - `selector {String}` - [расширенный](#Селекторы) CSS-селектор
    - `@return {Element|null}` - возвращает целевой элемент или null если такового нет
- `all(context, selector)` - поиск всех элементов по расширенному селектору
    - `context {Element}` - контекстный элемент
    - `selector {String}` - [расширенный](#Селекторы) CSS-селектор
    - `@return {Element[]}` - возвращает массив целевых элементов
- `setShim([setClosest])` - задаёт прокладки для некроссбраузерных методов
    - `setClosest {Function|null}` - прокладка для `Element.prototype.closest`

## Тестирование

Для запуска тестов используйте:

```sh
npm test
```

При необходимости установите ланчеры для других браузеров и активируйте их в `karma.conf.js`:

```sh
npm i --save-dev karma-ie-launcher
```

## Поддержка браузерами

- Internet Explorer 11+
- Другие современные браузеры
