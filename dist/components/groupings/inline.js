'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InlineElement(_ref) {
    var title = _ref.title,
        children = _ref.children;

    return _react2.default.createElement(
        'div',
        { className: 'storybook-addons-info__section' },
        _react2.default.createElement(
            'h2',
            null,
            title
        ),
        children
    );
}

InlineElement.propTypes = {
    title: _react.PropTypes.string.isRequired,
    children: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.arrayOf(_react.PropTypes.node)]).isRequired
};
InlineElement.defaultProps = {};

exports.default = (0, _utils.factory)(InlineElement);