import React, { Component } from 'react';
import { getTitle } from './utils';
import './tabbable.css';
import titleHoc from './../title-hoc';
import { classNames } from './../utils';

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
                    const cls = classNames('tabbable-button', section === ActiveSection ? 'tabbable--active' : '');
                    const title = getTitle(section);

                    return (
                        <button className={cls} onClick={this.handleClick(title)} key={`${title}`}>
                            {title}
                        </button>
                    );
                });

            return (
                <div className={classNames('section', 'tabbable')}>
                    <div className={classNames('tabbable-buttons')}>{buttons}</div>
                    <div className={classNames('tabbable-content')}>
                        <ActiveSection {...props} />
                    </div>
                </div>
            );
        }
    }

    return titleHoc(sections.map((s) => getTitle(s)).join('&'), Tabbable);
}

export default tabcontainer;
