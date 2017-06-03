import React from 'react';
import { configure, setAddon } from '@storybook/react';
import InfoAddon, { setDefaultSections } from '../src/';
import { Htmlview } from '../src/';

setAddon(InfoAddon);
setDefaultSections(Htmlview);

configure(() => {
    require('../example/css_story');
    require('../example/story');
}, module);
