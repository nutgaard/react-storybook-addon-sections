import React, { Component, PropTypes as PT } from 'react';
import './button.css';

class Button extends Component {
    constructor(props) {
        super(props);

        this.state = { click: 0 };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({ click: this.state.click + 1 });

        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    render() {
        const { prefix, children, ...props } = this.props;
        const cls = ['mybtn', this.state.click % 2 === 1 ? '' : 'extra'].join(' ');
        return (
            <button {...props} onClick={this.handleClick} className={cls}>
                <span>{prefix}</span>
                {children}
            </button>
        );
    }
}

Button.defaultProps = {
    prefix: 'Prefix: ',
    onClick: () => {}
};
Button.propTypes = {
    children: PT.node.isRequired,
    onClick: PT.func,
    prefix: PT.string
};

export default Button;
