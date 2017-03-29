/* eslint-disable import/prefer-default-export */
import React from 'react';
import titleHoc from './../title-hoc';
import { classNames } from './../utils';

export function getTitle(component) {
    return (
        component.title ||
        component.displayName ||
        component.name ||
        (typeof component === 'string' ? component : 'Component')
    );
}

export function factory(SectionImpl) {
    return (...sections) => {
        const Renderer = ({ ...props }) => {
            const sectionElements = sections.map((Section) => (
                <SectionImpl title={getTitle(Section)} key={getTitle(Section)}>
                    <Section {...props} />
                </SectionImpl>
            ));

            return <div className={classNames('factory')}>{sectionElements}</div>;
        };

        return titleHoc(sections.map((s) => getTitle(s)).join(' & '), Renderer);
    };
}
