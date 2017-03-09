import React, { PropTypes as PT } from 'react';
import { factory } from './utils';

export function InlineElement({ title, children }) {
    return (
        <div className="storybook-addons-info__section">
            <h2>{title}</h2>
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
