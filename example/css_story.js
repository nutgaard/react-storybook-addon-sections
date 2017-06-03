import React from 'react';
import { storiesOf } from '@storybook/react';
import Inline from '../src/components/groupings/inline';
import CssView from '../src/components/sections/cssview';
import './css_style.css';

storiesOf('Cssview')
    .addWithSections('Show basic styles', () => (
        <div className="basic">
            <h1>Has some basic styling</h1>
        </div>
    ), Inline(CssView.withProps({ specificity: 11 })));