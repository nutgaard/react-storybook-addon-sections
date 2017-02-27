'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _reactCollapse = require('react-collapse');

var _reactCollapse2 = _interopRequireDefault(_reactCollapse);

require('./collapsable.css');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Collapsable = function (_Component) {
    (0, _inherits3.default)(Collapsable, _Component);

    function Collapsable(props) {
        (0, _classCallCheck3.default)(this, Collapsable);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Collapsable.__proto__ || (0, _getPrototypeOf2.default)(Collapsable)).call(this, props));

        _this.state = {
            open: props.open || false
        };

        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(Collapsable, [{
        key: 'handleClick',
        value: function handleClick(e) {
            e.preventDefault();
            this.setState({ open: !this.state.open });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                title = _props.title,
                children = _props.children;

            var openBtn = this.state.open ? 'Close' : 'Open';
            return _react2.default.createElement(
                'div',
                { className: 'storybook-addons-info__section storybook-addons-info__collapsable' },
                _react2.default.createElement(
                    'button',
                    { className: 'collapsable__btn', onClick: this.handleClick },
                    _react2.default.createElement(
                        'h2',
                        { className: 'collapsable__btntitle' },
                        title
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'collapsable__btnicon' },
                        openBtn
                    )
                ),
                _react2.default.createElement(
                    _reactCollapse2.default,
                    { isOpened: this.state.open },
                    _react2.default.createElement(
                        'div',
                        { className: 'collapsable__content' },
                        children
                    )
                )
            );
        }
    }]);
    return Collapsable;
}(_react.Component);

Collapsable.propTypes = {
    open: _react.PropTypes.bool,
    title: _react.PropTypes.string.isRequired,
    children: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.arrayOf(_react.PropTypes.node)]).isRequired
};
Collapsable.defaultProps = {
    open: false
};

exports.default = (0, _utils.factory)(Collapsable);