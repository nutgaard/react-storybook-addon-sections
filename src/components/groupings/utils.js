/* eslint-disable import/prefer-default-export */
import React, { createElement } from 'react';

export function factory(SectionImpl) {
    return (...sections) => ({ ...props }) => {
        const sectionElements = sections.map((section) => (
            <SectionImpl title={section.title} key={section.title}>
                {createElement(section.element, props)}
            </SectionImpl>
        ));
        return <div className="storybook-addons-info__factory">{sectionElements}</div>;
    };
}
