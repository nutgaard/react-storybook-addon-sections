import React, { PropTypes as PT } from 'react';
import Highlight from 'react-highlight';
import cssbeautify from 'cssbeautify';
import 'highlight.js/styles/github.css';
import { getCssRulesForElementDeep } from './../utils';

function Cssview({ element }) {
    const css = cssbeautify(getCssRulesForElementDeep(element).join(' '));

    return (
        <Highlight className="css">
            {css}
        </Highlight>
    );
}

Cssview.propTypes = {
    element: PT.any.isRequired // eslint-disable-line react/forbid-prop-types
};


export default {
    title: 'Css',
    element: Cssview
};
