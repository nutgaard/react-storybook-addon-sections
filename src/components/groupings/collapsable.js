import React, { Component, PropTypes as PT } from 'react';
import Collapse from 'react-collapse';
import './collapsable.css';
import { factory } from './utils';

class Collapsable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open || false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({ open: !this.state.open });
    }

    render() {
        const { title, children } = this.props;
        const openBtn = this.state.open ? 'Close' : 'Open';
        return (
            <div className="storybook-addons-info__section storybook-addons-info__collapsable">
                <button className="collapsable__btn" onClick={this.handleClick}>
                    <h2 className="collapsable__btntitle">{title}</h2>
                    <span className="collapsable__btnicon">{openBtn}</span>
                </button>
                <Collapse isOpened={this.state.open}>
                    <div className="collapsable__content">
                        {children}
                    </div>
                </Collapse>
            </div>
        );
    }
}

Collapsable.propTypes = {
    open: PT.bool,
    title: PT.string.isRequired,
    children: PT.oneOfType([PT.node, PT.arrayOf(PT.node)]).isRequired
};
Collapsable.defaultProps = {
    open: false
};

export default factory(Collapsable);
