"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.factory = factory;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function factory(SectionImpl) {
    return function () {
        for (var _len = arguments.length, sections = Array(_len), _key = 0; _key < _len; _key++) {
            sections[_key] = arguments[_key];
        }

        return function (_ref) {
            var props = (0, _objectWithoutProperties3.default)(_ref, []);

            var sectionElements = sections.map(function (section) {
                return _react2.default.createElement(
                    SectionImpl,
                    { title: section.title, key: section.title },
                    (0, _react.createElement)(section.element, props)
                );
            });
            return _react2.default.createElement(
                "div",
                { className: "storybook-addons-info__factory" },
                sectionElements
            );
        };
    };
} /* eslint-disable import/prefer-default-export */