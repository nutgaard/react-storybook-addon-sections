'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Htmlview = exports.SectionedStory = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.setDefaultSections = setDefaultSections;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sectionedStory = require('./components/sectioned-story');

var _sectionedStory2 = _interopRequireDefault(_sectionedStory);

var _htmlview = require('./components/sections/htmlview');

var _htmlview2 = _interopRequireDefault(_htmlview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SectionedStory = exports.SectionedStory = _sectionedStory2.default;
var Htmlview = exports.Htmlview = _htmlview2.default;

var defaultSections = [];

exports.default = {
    addWithSections: function addWithSections(storyName, storyFn, _section) {
        for (var _len = arguments.length, _sections = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
            _sections[_key - 3] = arguments[_key];
        }

        var sections = _section && [_section].concat(_sections) || [].concat(defaultSections);

        return this.add(storyName, function (context) {
            return _react2.default.createElement(
                SectionedStory,
                { context: context, sections: sections },
                storyFn(context)
            );
        });
    }
};
function setDefaultSections() {
    for (var _len2 = arguments.length, newDefaults = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        newDefaults[_key2] = arguments[_key2];
    }

    return (0, _assign2.default)(defaultSections, newDefaults);
}