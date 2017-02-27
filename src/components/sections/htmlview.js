/* eslint-env browser */
import React, { PropTypes as PT } from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';

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

function HtmlView({ element }) {
    return (
        <Highlight className="html">
            {printHtml(element)}
        </Highlight>
    );
}

HtmlView.propTypes = {
    element: PT.any.isRequired // eslint-disable-line react/forbid-prop-types
};

export default {
    title: 'Html',
    element: HtmlView
};
