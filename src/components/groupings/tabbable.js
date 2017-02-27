import React, { Component } from 'react';
import { getTitle } from './utils';
import './tabbable.css';
import titleHoc from './../title-hoc';

function tabcontainer(...sections) {
    class Tabbable extends Component {
        constructor(props) {
            super(props);

            this.state = { active: getTitle(sections[0]) };
            this.handleClick = this.handleClick.bind(this);
        }

        handleClick(title) {
            return () => {
                this.setState({ active: title });
            };
        }

        render() {
            const { ...props } = this.props;
            const ActiveSection = sections.find((section) => getTitle(section) === this.state.active);

            const buttons = sections
                .map((section) => {
                    const cls = ['storybook-addons-info__tabbable-button', section === ActiveSection ? 'active' : '']
                        .join(' ');
                    const title = getTitle(section);

                    return (
                        <button className={cls} onClick={this.handleClick(title)} key={`${title}`}>
                            {title}
                        </button>
                    );
                });

            return (
                <div className="storybook-addons-info__section storybook-addons-info__tabbable">
                    <div className="storybook-addons-info__tabbable-buttons">{buttons}</div>
                    <div className="storybook-addons-info__tabbable-content">
                        <ActiveSection {...props} />
                    </div>
                </div>
            );
        }
    }

    return titleHoc(sections.map((s) => getTitle(s)).join('&'), Tabbable);
}

export default tabcontainer;
