'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHighlight = require('react-highlight');

var _reactHighlight2 = _interopRequireDefault(_reactHighlight);

require('highlight.js/styles/github.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function printHtml(element) {
    var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (element instanceof Text) {
        return '' + padding + element.textContent;
    }
    var attributes = (0, _from2.default)(element.attributes).map(function (attribute) {
        return attribute.name + '="' + attribute.value + '"';
    }).join(' ');

    if (attributes.length > 0) {
        attributes = ' ' + attributes;
    }
    var nodename = element.nodeName.toLowerCase();
    var startTag = padding + '<' + nodename + attributes + '>';
    var endTag = padding + '</' + nodename + '>';

    var children = (0, _from2.default)(element.childNodes).filter(function (node) {
        return !(node instanceof Comment);
    }).map(function (node) {
        return printHtml(node, '  ' + padding);
    }).join('\n');

    return startTag + '\n' + children + '\n' + endTag;
} /* eslint-env browser */


function HtmlView(_ref) {
    var element = _ref.element;

    return _react2.default.createElement(
        _reactHighlight2.default,
        { className: 'html' },
        printHtml(element)
    );
}

HtmlView.propTypes = {
    element: _react.PropTypes.any.isRequired // eslint-disable-line react/forbid-prop-types
};

exports.default = {
    title: 'Html',
    element: HtmlView
};