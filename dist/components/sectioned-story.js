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

var _reactDom = require('react-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./sectioned-story.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SectionedStory = function (_Component) {
    (0, _inherits3.default)(SectionedStory, _Component);

    function SectionedStory(props) {
        (0, _classCallCheck3.default)(this, SectionedStory);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SectionedStory.__proto__ || (0, _getPrototypeOf2.default)(SectionedStory)).call(this, props));

        _this.element = null;
        _this.renderSections = _this.renderSections.bind(_this);
        _this.setElement = _this.setElement.bind(_this);
        _this.setSectionWrapper = _this.setSectionWrapper.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(SectionedStory, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.renderSections();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.renderSections();
        }
    }, {
        key: 'setSectionWrapper',
        value: function setSectionWrapper(element) {
            this.sectionWrapper = element;
        }
    }, {
        key: 'setElement',
        value: function setElement(element) {
            this.element = element;
        }
    }, {
        key: 'renderSections',
        value: function renderSections() {
            var element = this.element && this.element.children[0];

            var _props = this.props,
                context = _props.context,
                sections = _props.sections,
                children = _props.children;


            var sectionElements = this.element && sections.map(function (Section, i) {
                var sectionProps = { context: context, children: children, element: element, key: i };
                if (Object.prototype.hasOwnProperty.call(Section, 'element')) {
                    return _react2.default.createElement(
                        'div',
                        { key: element.title, className: 'storybook-addons-info__section' },
                        Section.element(sectionProps)
                    );
                }
                return _react2.default.createElement(Section, sectionProps);
            });

            (0, _reactDom.render)(_react2.default.createElement(
                'div',
                { className: 'storybook-addons-info__portal' },
                sectionElements
            ), this.sectionWrapper);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                context = _props2.context,
                children = _props2.children;


            return _react2.default.createElement(
                'div',
                { className: 'storybook-addons-info' },
                _react2.default.createElement(
                    'div',
                    { className: 'storybook-addons-info__section storybook-addons-info__infoheader' },
                    _react2.default.createElement(
                        'h1',
                        { className: 'storybook-addons-info__context-kind' },
                        context.kind
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'storybook-addons-info__context-story' },
                        context.story
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: 'storybook-addons-info__section storybook-addons-info__story',
                        ref: this.setElement
                    },
                    children
                ),
                _react2.default.createElement('div', { className: 'storybook-addons-info__portal-reference', ref: this.setSectionWrapper })
            );
        }
    }]);
    return SectionedStory;
}(_react.Component);

/* eslint-disable react/forbid-prop-types */


SectionedStory.propTypes = {
    context: _react.PropTypes.any.isRequired,
    sections: _react.PropTypes.any.isRequired,
    children: _react.PropTypes.any.isRequired
};

exports.default = SectionedStory;