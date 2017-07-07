/* eslint-env browser */
import React from 'react';
import { default as PT } from 'prop-types';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';
import titleHoc from './../title-hoc';

function printHtml(element, padding = '') {
    if (element instanceof Text) {
        return `${padding}${element.textContent}`;
    }
    let attributes = Array.from(element.attributes)
        .map((attribute) => `${attribute.name}="${attribute.value}"`)
        .join(' ');

    if (attributes.length > 0) {
        attributes = ` ${attributes}`;
    }
    const nodename = element.nodeName.toLowerCase();
    const startTag = `${padding}<${nodename}${attributes}>`;
    const endTag = `${padding}</${nodename}>`;

    const children = Array.from(element.childNodes)
        .filter((node) => !(node instanceof Comment))
        .map((node) => printHtml(node, `  ${padding}`))
        .join('\n');

    return `${startTag}\n${children}\n${endTag}`;
}

function arr(val) {
    return Array.isArray(val) ? val : [val];
}

function peelElement(element, peel, prop) {
    if (peel === 0) {
        return arr(element);
    }

    return arr(element)
        .reduce((output, el) => [...output, ...peelElement(Array.from(el[prop]), peel - 1, prop)], []);
}

function HtmlView({ element, peel }) {
    const peeledElement = peelElement(element, peel, 'children');

    return (
        <Highlight className="html">
            {peeledElement.map((el) => printHtml(el)).join('\n\n')}
        </Highlight>
    );
}

HtmlView.defaultProps = {
    peel: 0
};

HtmlView.propTypes = {
    peel: PT.number,
    element: PT.any.isRequired // eslint-disable-line react/forbid-prop-types
};

export default titleHoc('Html', HtmlView);
