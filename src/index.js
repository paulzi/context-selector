// shorthands for uglify
const $context  = '$context';
const $document = '$document';

// can shim
let closest = Element.prototype.closest;

/**
 * @param {Element} context
 * @param {String} selector
 * @returns {[Element, String]}
 */
function parseQuery(context, selector) {
    let base;
    let scope = $context;
    let parts = selector.split('<<');
    if (parts.length > 1) {
        [scope, selector] = parts;
        scope    = scope.trim() || $document;
        selector = selector.trim();
    }
    if (scope === $document) {
        base = context.ownerDocument;
    } else if (scope === $context) {
        base = context;
    } else {
        base = closest.call(context, scope);
    }

    return [base, selector];
}

export default {
    /**
     * Set shims
     * @param {Function|null} [setClosest]
     */
    setShim: function(setClosest) {
        closest = setClosest || closest;
    },

    /**
     * Find first element by context selector
     * @param {Element} context
     * @param {String} selector
     * @returns {Element|null}
     */
    one: function(context, selector) {
        let [scope, find] = parseQuery(context, selector);
        if (!scope) {
            return null;
        }
        if (!find) {
            return scope;
        }
        return scope.querySelector(find);
    },

    /**
     * Find element list by context selector
     * @param {Element} context
     * @param {String} selector
     * @returns {Element[]}
     */
    all: function(context, selector) {
        let [scope, find] = parseQuery(context, selector);
        if (!scope) {
            return [];
        }
        if (!find) {
            return [scope];
        }
        return Array.prototype.slice.call(scope.querySelectorAll(find));
    },
}