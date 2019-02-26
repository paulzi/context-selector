# context-selector

[![NPM version](http://img.shields.io/npm/v/context-selector.svg?style=flat)](https://www.npmjs.org/package/context-selector)
[![Build Status](https://img.shields.io/travis/paulzi/context-selector/master.svg)](https://travis-ci.org/paulzi/context-selector)
[![Downloads](https://img.shields.io/npm/dt/context-selector.svg)](https://www.npmjs.org/package/context-selector)
![License](https://img.shields.io/npm/l/context-selector.svg)

Find elements relative other by CSS selector.

[Russian readme](https://github.com/paulzi/context-selector/blob/master/README.ru.md)

## Install

```sh
npm install context-selector
```

## Usage

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

## Documentation

### Selectors

The library provides extended CSS syntax for searching items relative to context element.
The syntax consists of two parts separated by operator `<<`.
First part of the selector selects top context for the search element by second part of selector.
First part can take the following values:

- `$document` or empty first part - selector becomes the normal selector on the document;
- `$context` - search by selector inside context element;
- *any css-selector* - search closest element of context element and search for it.

Second part is simple CSS-selector. If second part is missing, top context returned by first part of the selector is returned.

### Import types

There are several entry points for importing a library:

- `import ContextSelector from 'context-selector'` - similarly `with-shims`;
- `import ContextSelector from 'context-selector/standard'` - easy import without polyfills for ie11;
- `import ContextSelector from 'context-selector/with-shims'` - import with shims for ie11;
- `import ContextSelector from 'context-selector/with-polyfills'` - import with polyfill for ie11;

Differences shims from polyfills you can read in [polyshim](https://github.com/paulzi/polyshim/) package.

When directly include the script from the `dist` folder to the browser, you can get an ContextSelector instance via `window.ContextSelector.default`.

### Methods

- `one(context, selector)` - search first element by extended selector
    - `context {Element}` - context element
    - `selector {String}` - [extended](#Selectors) CSS-selector
    - `@return {Element|null}` - returns target element or null
- `all(context, selector)` - search all elements by extended selector
    - `context {Element}` - context element
    - `selector {String}` - [extended](#Selectors) CSS-selector
    - `@return {Element[]}` - returns array of target elements
- `setShim([setClosest])` - sets shims for non-cross-browser methods
    - `setClosest {Function|null}` - shim for `Element.prototype.closest`

## Testing

To run tests, use: 

```sh
npm test
```

If necessary, you can install launchers for other browsers and activate them in `karma.conf.js`: 

```sh
npm i --save-dev karma-ie-launcher
```

## Browsers support

- Internet Explorer 11+
- Other modern browsers
