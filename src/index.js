import React from 'react';
import _SectionedStory from './components/sectioned-story';
import _Htmlview from './components/sections/htmlview';

export const SectionedStory = _SectionedStory;
export const Htmlview = _Htmlview;

const defaultSections = [];

export default {
    addWithSections(storyName, storyFn, _section, ..._sections) {
        const sections = (_section && [_section, ..._sections]) || [...defaultSections];

        return this.add(storyName, (context) => (
            <SectionedStory context={context} sections={sections}>{storyFn(context)}</SectionedStory>
        ));
    }
};

export function setDefaultSections(...newDefaults) {
    return Object.assign(defaultSections, newDefaults);
}
