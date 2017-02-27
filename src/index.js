import React, { Component } from 'react';
import { action } from '@kadira/storybook';
import _SectionedStory from './components/sectioned-story';
import _Htmlview from './components/sections/htmlview';

export const SectionedStory = _SectionedStory;
export const Htmlview = _Htmlview;

const defaultSections = [];

export default {
    addWithSections(storyName, storyFn, _section, ..._sections) {
        const sections = (_section && [_section, ..._sections]) || [...defaultSections];

        return this.add(storyName, (context) => {
            class SectionedStoryRefresher extends Component {
                constructor(props) {
                    super(props);

                    this.state = { counter: 0 };
                    this.actionProxy = this.actionProxy.bind(this);
                }

                actionProxy(...args) {
                    const actionP = action(...args);
                    return (...args2) => {
                        this.setState({ counter: this.state.counter + 1 });
                        actionP(...args2);
                    };
                }

                render() {
                    return (
                        <SectionedStory context={context} sections={sections} counter={this.state.counter}>
                            {storyFn(context, this.actionProxy)}
                        </SectionedStory>
                    );
                }
            }
            return (<SectionedStoryRefresher />);
        });
    }
};

export function setDefaultSections(...newDefaults) {
    return Object.assign(defaultSections, newDefaults);
}
