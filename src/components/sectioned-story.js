import { render } from 'react-dom';
import React, { Component } from 'react';
import { default as PT } from 'prop-types';
import { clsBase, classNames } from './utils';
import './sectioned-story.css';

class SectionedStory extends Component {
    constructor(props) {
        super(props);

        this.element = null;
        this.renderSections = this.renderSections.bind(this);
        this.setElement = this.setElement.bind(this);
        this.setSectionWrapper = this.setSectionWrapper.bind(this);
    }

    componentDidMount() {
        this.renderSections();
    }

    componentDidUpdate() {
        this.renderSections();
    }

    setSectionWrapper(element) {
        this.sectionWrapper = element;
    }

    setElement(element) {
        this.element = element;
    }

    renderSections() {
        const element = this.element && this.element.children[0];

        const { context, sections, children } = this.props;

        const sectionElements = this.element && sections
                .map((Section, i) => {
                    const sectionProps = { context, children, element, key: i };
                    return <Section {...sectionProps} />;
                });

        render(<div className={classNames('portal')}>{sectionElements}</div>, this.sectionWrapper);
    }

    render() {
        const { context, children } = this.props;

        return (
            <div className={clsBase}>
                <div className={classNames('section', 'infoheader')}>
                    <h1 className={classNames('context-kind')}>{context.kind}</h1>
                    <p className={classNames('context-story')}>{context.story}</p>
                </div>
                <div className={classNames('section', 'story')} ref={this.setElement}>
                    { children }
                </div>
                <div className={classNames('portal-reference')} ref={this.setSectionWrapper} />
            </div>
        );
    }
}

/* eslint-disable react/forbid-prop-types */
SectionedStory.propTypes = {
    context: PT.any.isRequired,
    sections: PT.any.isRequired,
    children: PT.any.isRequired
};

export default SectionedStory;
