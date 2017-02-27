'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

exports.prepMarkdown = prepMarkdown;
exports.getCssRulesForElement = getCssRulesForElement;
exports.getCssRulesForElementDeep = getCssRulesForElementDeep;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env browser */
function prepMarkdown(str) {
    var lines = str.split('\n');

    // Removing empty lines at start of str
    while (lines[0].trim() === '') {
        lines.shift();
    }

    // Finding det starting padding-level
    var padding = 0;
    var matches = lines[0].match(/^ */);
    if (matches) {
        padding = matches[0].length;
    }

    // Removing starting padding-level from all lines
    return lines.map(function (s) {
        return s.slice(padding);
    }).join('\n');
}

function getCssRulesForElement(element) {
    var sheets = document.styleSheets;
    var elementrules = [];

    // eslint-disable-next-line no-param-reassign
    element.matches = element.matches || element.webkitMatchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector;

    (0, _from2.default)(sheets).forEach(function (sheet) {
        var rules = sheet.rules || sheet.cssRules;
        (0, _from2.default)(rules).forEach(function (rule) {
            if (element.matches(rule.selectorText)) {
                elementrules.push(rule.cssText);
            }
        });
    });

    return elementrules;
}

function getCssRulesForElementDeep(element) {
    var set = new _set2.default();
    getCssRulesForElement(element).forEach(function (rule) {
        return set.add(rule);
    });

    (0, _from2.default)(element.querySelectorAll('*')).map(getCssRulesForElement).forEach(function (rules) {
        return rules.forEach(function (rule) {
            return set.add(rule);
        });
    });

    return (0, _from2.default)(set);
}