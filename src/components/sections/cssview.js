import React, { PropTypes as PT } from 'react';
import Highlight from 'react-highlight';
import cssbeautify from 'cssbeautify';
import 'highlight.js/styles/github.css';
import { getCssRulesForElementDeep } from './../utils';
import titleHoc from './../title-hoc';



export function CssviewElement({ element, specificity }) {
    console.log(`specificity`, specificity);
    const css = cssbeautify(getCssRulesForElementDeep(element, specificity).join(' '));

    return (
        <Highlight className="css">
            {css}
        </Highlight>
    );
}

CssviewElement.defaultProps = {
    specificity: 0
};
CssviewElement.propTypes = {
    element: PT.any.isRequired, // eslint-disable-line react/forbid-prop-types
    specificity: PT.number
};

export default titleHoc('Css', CssviewElement);
