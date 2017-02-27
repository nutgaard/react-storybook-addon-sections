'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./tabbable.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tabcontainer() {
    for (var _len = arguments.length, sections = Array(_len), _key = 0; _key < _len; _key++) {
        sections[_key] = arguments[_key];
    }

    var Tabbable = function (_Component) {
        (0, _inherits3.default)(Tabbable, _Component);

        function Tabbable(props) {
            (0, _classCallCheck3.default)(this, Tabbable);

            var _this = (0, _possibleConstructorReturn3.default)(this, (Tabbable.__proto__ || (0, _getPrototypeOf2.default)(Tabbable)).call(this, props));

            _this.state = { active: sections[0].title };
            _this.handleClick = _this.handleClick.bind(_this);
            return _this;
        }

        (0, _createClass3.default)(Tabbable, [{
            key: 'handleClick',
            value: function handleClick(title) {
                var _this2 = this;

                return function () {
                    _this2.setState({ active: title });
                };
            }
        }, {
            key: 'render',
            value: function render() {
                var _this3 = this;

                var props = (0, _objectWithoutProperties3.default)(this.props, []);

                var activeSection = sections.find(function (section) {
                    return section.title === _this3.state.active;
                });

                var buttons = sections.map(function (section) {
                    var cls = ['storybook-addons-info__tabbable-button', section === activeSection ? 'active' : ''].join(' ');

                    return _react2.default.createElement(
                        'button',
                        { className: cls, onClick: _this3.handleClick(section.title), key: section.title },
                        section.title
                    );
                });

                return _react2.default.createElement(
                    'div',
                    { className: 'storybook-addons-info__section storybook-addons-info__tabbable' },
                    _react2.default.createElement(
                        'div',
                        { className: 'storybook-addons-info__tabbable-buttons' },
                        buttons
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'storybook-addons-info__tabbable-content' },
                        (0, _react.createElement)(activeSection.element, props)
                    )
                );
            }
        }]);
        return Tabbable;
    }(_react.Component);

    return Tabbable;
}

exports.default = tabcontainer;