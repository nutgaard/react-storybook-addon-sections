import { render } from 'react-dom';
import React, { Component, PropTypes as PT } from 'react';
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
                    if (Object.prototype.hasOwnProperty.call(Section, 'element')) {
                        return (
                            <div key={Section.title} className="storybook-addons-info__section">
                                {Section.element(sectionProps)}
                            </div>
                        );
                    }
                    return <Section {...sectionProps} />;
                });

        render(<div className="storybook-addons-info__portal">{sectionElements}</div>, this.sectionWrapper);
    }

    render() {
        const { context, children } = this.props;

        return (
            <div className="storybook-addons-info">
                <div className="storybook-addons-info__section storybook-addons-info__infoheader">
                    <h1 className="storybook-addons-info__context-kind">{context.kind}</h1>
                    <p className="storybook-addons-info__context-story">{context.story}</p>
                </div>
                <div
                    className="storybook-addons-info__section storybook-addons-info__story"
                    ref={this.setElement}
                >
                    { children }
                </div>
                <div className="storybook-addons-info__portal-reference" ref={this.setSectionWrapper} />
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
