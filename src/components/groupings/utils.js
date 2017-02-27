/* eslint-disable import/prefer-default-export */
import React from 'react';

export function getTitle(component) {
    return (
        component.title ||
        component.displayName ||
        component.name ||
        (typeof component === 'string' ? component : 'Component')
    );
}

export function factory(SectionImpl) {
    return (...sections) => ({ ...props }) => {
        const sectionElements = sections.map((Section) => (
            <SectionImpl title={getTitle(Section)} key={getTitle(Section)}>
                <Section {...props} />
            </SectionImpl>
        ));
        return <div className="storybook-addons-info__factory">{sectionElements}</div>;
    };
}
