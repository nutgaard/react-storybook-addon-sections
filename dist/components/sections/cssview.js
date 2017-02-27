'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHighlight = require('react-highlight');

var _reactHighlight2 = _interopRequireDefault(_reactHighlight);

var _cssbeautify = require('cssbeautify');

var _cssbeautify2 = _interopRequireDefault(_cssbeautify);

require('highlight.js/styles/github.css');

var _utils = require('./../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Cssview(_ref) {
    var element = _ref.element;

    var css = (0, _cssbeautify2.default)((0, _utils.getCssRulesForElementDeep)(element).join(' '));

    return _react2.default.createElement(
        _reactHighlight2.default,
        { className: 'css' },
        css
    );
}

Cssview.propTypes = {
    element: _react.PropTypes.any.isRequired // eslint-disable-line react/forbid-prop-types
};

exports.default = {
    title: 'Css',
    element: Cssview
};