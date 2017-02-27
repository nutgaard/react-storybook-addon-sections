import React, { createElement, Component } from 'react';
import './tabbable.css';

function tabcontainer(...sections) {
    class Tabbable extends Component {
        constructor(props) {
            super(props);

            this.state = { active: sections[0].title };
            this.handleClick = this.handleClick.bind(this);
        }

        handleClick(title) {
            return () => {
                this.setState({ active: title });
            };
        }

        render() {
            const { ...props } = this.props;
            const activeSection = sections.find((section) => section.title === this.state.active);

            const buttons = sections
                .map((section) => {
                    const cls = ['storybook-addons-info__tabbable-button', section === activeSection ? 'active' : '']
                        .join(' ');

                    return (
                        <button className={cls} onClick={this.handleClick(section.title)} key={section.title}>
                            {section.title}
                        </button>
                    );
                });

            return (
                <div className="storybook-addons-info__section storybook-addons-info__tabbable">
                    <div className="storybook-addons-info__tabbable-buttons">{buttons}</div>
                    <div className="storybook-addons-info__tabbable-content">
                        {createElement(activeSection.element, props)}
                    </div>
                </div>
            );
        }
    }
    return Tabbable;
}

export default tabcontainer;
