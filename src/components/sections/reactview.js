import React, { PropTypes as PT, Children, isValidElement } from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';

function chunk(maxSize = 3) {
    return (acc, item, index) => {
        const expectedIndex = Math.floor(index / maxSize);
        if (acc.length < expectedIndex + 1) {
            acc.push([]);
        }
        const list = acc[expectedIndex];
        list.push(item);
        return acc;
    };
}

function propvalue(value) {
    const type = typeof value;

    if (type === 'number') {
        return `={${value}}`;
    } else if (type === 'string') {
        if (value.length > 50) {
            return `="${value.slice(0, 47)}…"`;
        }
        return `="${value}"`;
    } else if (type === 'boolean') {
        if (!value) {
            return '={false}';
        }
        return '';
    } else if (type === 'function') {
        const name = value.name ? `${value.name}()` : 'anonymous()';
        return `={${name}}`;
    } else if (type !== 'object') {
        return '={…}';
    } else if (isValidElement(value)) {
        return `={<${value.type.displayName || value.type.name || value.type} />}`;
    }

    const str = JSON.stringify(value);
    if (str.length > 50) {
        return `=${str.slice(0, 45)}…}"`;
    }
    return `={${str}}`;
}

function getData(element) {
    const data = {
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
    const type = element.type;

    if (typeof type === 'string') {
        data.name = type;
    } else {
        data.name = type.displayName || type.name || 'Unknown';
    }

    return data;
}

function getProps(node) {
    const props = node.props;
    const defaultProps = node.type.defaultProps;

    if (!props || typeof props !== 'object') {
        return '';
    }

    return Object.keys(props)
        .filter((name) => name !== 'children')
        .filter((name) => (!defaultProps || props[name] !== defaultProps[name]))
        .map((name) => ({ key: name, value: props[name] }))
        .reduce(chunk(99), [])
        .map((attributes) => attributes
            .map((attribute) => `${attribute.key}${propvalue(attribute.value)}`)
            .join(' ')
        )
        .join('\n');
}

function printReact(node, padding = '') {
    const { name, text, children } = getData(node);

    // Just text
    if (!name) {
        return `${padding}${text}`;
    }

    // Single-line tag
    if (!children) {
        const props = getProps(node);
        return `<${name} ${props} />`;
    }

    const startTag = `${padding}<${name} ${getProps(node)}>`;
    const endTag = `${padding}</${name}>`;
    const childrenStr = Children.map(children, (child) => printReact(child, `  ${padding}`)).join('\n');
    return `${startTag}\n${childrenStr}\n${endTag}`;
}


function ReactView({ children }) {
    const nChildren = Array.from(Children.map(children, (child) => printReact(child))).join('\n\n');
    return (
        <Highlight className="html">
            {nChildren}
        </Highlight>
    );
}

ReactView.propTypes = {
    children: PT.oneOfType([PT.node, PT.arrayOf(PT.noe)]).isRequired
};

export default {
    title: 'React',
    element: ReactView
};
