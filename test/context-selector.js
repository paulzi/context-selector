import ContextSelector from '../with-shims';

const chai   = require('chai');
const assert = chai.assert;

// shorthands
const one = ContextSelector.one;
const all = ContextSelector.all;
const $ = function(selector) {
    return document.querySelector(selector);
};
const $$ = function(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
};

describe("context-selector tests", function() {
    let node = document.createElement('div');
    node.innerHTML = `
        <header class="header">
            <nav class="nav">
                <ul class="nav__list">
                    <li class="nav__item"><a href="#">Item1</a></li>
                    <li class="nav__item"><a href="#">Item2</a></li>
                    <li class="nav__item"><a href="#">Item3</a></li>
                </ul>
            </nav>
        </header>
        <main class="main">
            <section class="component">
                <article class="component__item" id="component__item_1">item 1</article>
                <article class="component__item" id="component__item_2">item 2</article>
            </section>
        </main>
        <footer class="footer">
            <div class="copyright">copyright</div>        
        </footer>
    `;
    document.body.appendChild(node);

    it('default scope', function() {
        assert.strictEqual(one($('.component'), '#component__item_2'), $('#component__item_2'));
        assert.strictEqual(one($('.nav'),       '.nav__item a'),       $('.nav__item a'));
        assert.strictEqual(one($('.nav'),       '.component__item'),   null);
        assert.deepEqual(  all($('.component'), '.component__item'),   $$('.component__item'));
        assert.deepEqual(  all($('.nav'),       '.nav__item a'),       $$('.nav__item a'));
        assert.deepEqual(  all($('.nav'),       '.component__item'),   []);
    });

    it('document scope', function() {
        assert.strictEqual(one($('.component'), '$document << .nav__item'),                    $('.nav__item'));
        assert.strictEqual(one($('.nav'),       '$document << .component #component__item_2'), $('#component__item_2'));
        assert.strictEqual(one($('.component'), '$document << .none'),                         null);
        assert.deepEqual(  all($('.component'), '$document << .nav__item > a'),                $$('.nav__item > a'));
        assert.deepEqual(  all($('.nav'),       '$document << .component__item'),              $$('.component__item'));
        assert.deepEqual(  all($('.component'), '$document << .none'),                         []);
    });

    it('empty scope', function() {
        assert.strictEqual(one($('.component'), '<< .nav__item'),     $('.nav__item'));
        assert.strictEqual(one($('.component'), '<< .none'),          null);
        assert.deepEqual(  all($('.component'), '<< .nav__item > a'), $$('.nav__item > a'));
        assert.deepEqual(  all($('.component'), '<< .none'),          []);
    });

    it('context scope', function() {
        assert.strictEqual(one($('.component'), '$context << #component__item_2'), $('#component__item_2'));
        assert.strictEqual(one($('.nav'),       '$context << .nav__item a'),       $('.nav__item a'));
        assert.strictEqual(one($('.nav'),       '$context << .component__item'),   null);
        assert.deepEqual(  all($('.component'), '$context << .component__item'),   $$('.component__item'));
        assert.deepEqual(  all($('.nav'),       '$context << .nav__item a'),       $$('.nav__item a'));
        assert.deepEqual(  all($('.nav'),       '$context << .component__item'),   []);
    });

    it('context only', function() {
        assert.strictEqual(one($('.component'), '$context <<'), $('.component'));
        assert.deepEqual(  all($('.component'), '$context <<'), $$('.component'));
    });

    it('closest scope', function() {
        assert.strictEqual(one($('#component__item_1'), '.component << #component__item_2'), $('#component__item_2'));
        assert.strictEqual(one($('#component__item_2'), 'body << .nav__item > a'),           $('.nav__item a'));
        assert.strictEqual(one($('#component__item_2'), '.none << .nav__item'),              null);
        assert.strictEqual(one($('#component__item_2'), '.component << .none'),              null);
        assert.deepEqual(  all($('#component__item_1'), '.component << .component__item'),   $$('.component__item'));
        assert.deepEqual(  all($('#component__item_2'), 'body << .nav__item > a'),           $$('.nav__item a'));
        assert.deepEqual(  all($('#component__item_2'), '.none << .nav__item'),              []);
        assert.deepEqual(  all($('#component__item_2'), '.component << .none'),              []);
    });

    it('closest only', function() {
        assert.strictEqual(one($('#component__item_1'), 'section <<'),    $('.component'));
        assert.strictEqual(one($('.component'),         '.component <<'), $('.component'));
        assert.strictEqual(one($('#component__item_2'), '.none <<'),      null);
        assert.deepEqual(  all($('#component__item_2'), 'body <<'),       $$('body'));
        assert.deepEqual(  all($('.component'),         '.component <<'), $$('.component'));
        assert.deepEqual(  all($('#component__item_2'), '.none <<'),      []);
    });
});