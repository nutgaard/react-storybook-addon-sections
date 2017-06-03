import React from 'react';
import { default as PT } from 'prop-types';
import { factory } from './utils';
import { classNames } from './../utils';

function InlineElement({ title, children }) {
    return (
        <div className={classNames('section')}>
            <h2 className={classNames('heading')}>{title}</h2>
            { children }
        </div>
    );
}

InlineElement.propTypes = {
    title: PT.string.isRequired,
    children: PT.oneOfType([PT.node, PT.arrayOf(PT.node)]).isRequired
};
InlineElement.defaultProps = {};

export default factory(InlineElement);
