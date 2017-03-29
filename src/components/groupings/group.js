import { PropTypes as PT } from 'react';
import { factory } from './utils';

function Group({ children }) {
    return children;
}

Group.propTypes = {
    children: PT.oneOfType([PT.node, PT.arrayOf(PT.node)]).isRequired
};

export default factory(Group);
