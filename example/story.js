import React from "react";
import Button from "./button";
import { storiesOf, action } from "@kadira/storybook";
import Inline from '../src/components/groupings/inline';
import Collapsable from '../src/components/groupings/collapsable';
import Tabbable from '../src/components/groupings/tabbable';
import HtmlView from '../src/components/sections/htmlview';
import ReactView from '../src/components/sections/reactview';
import CssView from '../src/components/sections/cssview';

storiesOf('Button')
    .addWithSections('Global sections', () => (
        <Button>Simple</Button>
    ))
    .addWithSections('Single section', () => (
        <Button>Simple</Button>
    ), ReactView)
    .addWithSections('Single inline section', () => (
        <Button>Simple</Button>
    ), Inline(ReactView))
    .addWithSections('Multiple inline section', () => (
        <Button>Simple</Button>
    ), Inline(ReactView, HtmlView))
    .addWithSections('Single collapsable section', () => (
        <Button>Simple</Button>
    ), Collapsable(ReactView))
    .addWithSections('Multiple collapsable section', () => (
        <Button>Simple</Button>
    ), Collapsable(ReactView, HtmlView), Collapsable(ReactView, HtmlView))
    .addWithSections('Single tabbable section', () => (
        <Button>Simple</Button>
    ), Tabbable(ReactView))
    .addWithSections('Multiple tabbable section', () => (
        <Button>Simple</Button>
    ), Tabbable(ReactView, HtmlView), Tabbable(ReactView, HtmlView))
    .addWithSections('Even more multiple tabbable section', () => (
        <Button>Simple</Button>
    ), Tabbable(ReactView, HtmlView, CssView))
    .addWithSections('Multiple sections', () => (
        <div className="classNavn" disabled>
            <Button onClick={action('btn')}>
                Sections Test Skjer a?
            </Button>
        </div>
    ), ReactView, HtmlView, CssView)
    .addWithSections('Combination section', () => (
        <Button>Simple</Button>
    ), CssView, Inline(CssView), Tabbable(ReactView, HtmlView), Collapsable(ReactView, HtmlView))
    .addWithSections('Props', () => (
        <div style={{ padding: '1rem', backgroundColor: '#efefef' }}>
            <Button>Simple</Button>
        </div>
    ), Tabbable(ReactView, HtmlView));

// --- Nothing ---
// ReactView, HtmlView, CssView
// ReactView
// Inline(ReactView)
// Inline(ReactView, HtmlView)
// Inline(ReactView), Inline(HtmlView)
// Collapsable(ReactView, HtmlView, CssView)
// Tabbable(ReactView, HtmlView, CssView)
// Inline(ReactView), Tabbable(HtmlView, CssView), Collapsable(AnotherView)