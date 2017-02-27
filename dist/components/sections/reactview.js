'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHighlight = require('react-highlight');

var _reactHighlight2 = _interopRequireDefault(_reactHighlight);

require('highlight.js/styles/github.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function chunk() {
    var maxSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

    return function (acc, item, index) {
        var expectedIndex = Math.floor(index / maxSize);
        if (acc.length < expectedIndex + 1) {
            acc.push([]);
        }
        var list = acc[expectedIndex];
        list.push(item);
        return acc;
    };
}

function propvalue(value) {
    var type = typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value);

    if (type === 'number') {
        return '={' + value + '}';
    } else if (type === 'string') {
        if (value.length > 50) {
            return '="' + value.slice(0, 47) + '\u2026"';
        }
        return '="' + value + '"';
    } else if (type === 'boolean') {
        if (!value) {
            return '={false}';
        }
        return '';
    } else if (type === 'function') {
        var name = value.name ? value.name + '()' : 'anonymous()';
        return '={' + name + '}';
    } else if (type !== 'object') {
        return '={…}';
    } else if ((0, _react.isValidElement)(value)) {
        return '={<' + (value.type.displayName || value.type.name || value.type) + ' />}';
    }

    var str = value.stringify(value);
    if (str.length > 50) {
        return '=' + str.slice(0, 45) + '\u2026}"';
    }
    return '={' + str + '}';
}

function getData(element) {
    var data = {
        name: null,
        text: null,
        children: null
    };

    if (typeof element === 'string') {
        data.text = element;
        return data;
    }

    if (typeof element === 'number') {
        data.text = String.toString(element);
        return data;
    }

    data.children = element.props.children;
    var type = element.type;

    if (typeof type === 'string') {
        data.name = type;
    } else {
        data.name = type.displayName || type.name || 'Unknown';
    }

    return data;
}

function getProps(node) {
    var props = node.props;
    var defaultProps = node.type.defaultProps;

    if (!props || (typeof props === 'undefined' ? 'undefined' : (0, _typeof3.default)(props)) !== 'object') {
        return '';
    }

    return (0, _keys2.default)(props).filter(function (name) {
        return name !== 'children';
    }).filter(function (name) {
        return !defaultProps || props[name] !== defaultProps[name];
    }).map(function (name) {
        return { key: name, value: props[name] };
    }).reduce(chunk(99), []).map(function (attributes) {
        return attributes.map(function (attribute) {
            return '' + attribute.key + propvalue(attribute.value);
        }).join(' ');
    }).join('\n');
}

function printReact(node) {
    var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var _getData = getData(node),
        name = _getData.name,
        text = _getData.text,
        children = _getData.children;

    // Just text


    if (!name) {
        return '' + padding + text;
    }

    // Single-line tag
    if (!children) {
        var props = getProps(node);
        return '<' + name + ' ' + props + ' />';
    }

    var startTag = padding + '<' + name + ' ' + getProps(node) + '>';
    var endTag = padding + '</' + name + '>';
    var childrenStr = _react.Children.map(children, function (child) {
        return printReact(child, '  ' + padding);
    }).join('\n');
    return startTag + '\n' + childrenStr + '\n' + endTag;
}

function ReactView(_ref) {
    var children = _ref.children;

    var nChildren = (0, _from2.default)(_react.Children.map(children, function (child) {
        return printReact(child);
    })).join('\n\n');
    return _react2.default.createElement(
        _reactHighlight2.default,
        { className: 'html' },
        nChildren
    );
}

ReactView.propTypes = {
    children: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.arrayOf(_react.PropTypes.noe)]).isRequired
};

exports.default = {
    title: 'React',
    element: ReactView
};