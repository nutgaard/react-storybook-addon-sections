import React from "react";
import Button from "./button";
import { storiesOf } from "@kadira/storybook";
import Inline from "../src/components/groupings/inline";
import Collapsable from "../src/components/groupings/collapsable";
import Tabbable from "../src/components/groupings/tabbable";
import HtmlView from "../src/components/sections/htmlview";
import ReactView from "../src/components/sections/reactview";
import CssView from "../src/components/sections/cssview";

import Rawview from '../src/components/sections/rawview';
import Group from '../src/components/groupings/group';

import buttonSrc from '!!raw-loader!./button.js';

storiesOf('Button')
    .addWithSections('No leaking styles', () => (
        <div>
            <h1>Should not be styled</h1>
            <p>Nor this</p>
            <span>or this</span>
        </div>
    ))
    .addWithSections('Global sections', (context, action) => {
        return (
            <Button onClick={action('global click')}>Simple</Button>
        )
    })
    .addWithSections('Single section', () => (
        <Button>Simple</Button>
    ), ReactView)
    .addWithSections('Single inline section', () => (
        <Button>Simple</Button>
    ), Inline(ReactView))
    .addWithSections('Multiple inline section', () => (
        <Button>Simple</Button>
    ), Inline(ReactView, HtmlView))
    .addWithSections('Peeling wrapper divs', () => (
        <div className="wrap1">
            <div className="wrap2">
                <div className="wrap3">
                    <Button>Simple</Button>
                </div>
                <div className="wrap3">
                    <Button>Simple</Button>
                </div>
                <div className="wrap3">
                    <Button>Simple</Button>
                </div>
            </div>
        </div>
    ), Inline(Group(ReactView.withProps({peel: 3}), HtmlView.withProps({ peel: 3 }), CssView.withProps({specificity: 15})).withTitle('Test')))
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
    ), Tabbable(ReactView.withTitle('JSX'), HtmlView, CssView))
    .addWithSections('Multiple sections', (_, action) => (
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
    ), Tabbable(ReactView, HtmlView.withTitle('Min tittel')))
    .addWithSections('Nested groups', () => (
        <div style={{ padding: '1rem', backgroundColor: '#efefef' }}>
            <Button>Simple</Button>
        </div>
    ), Tabbable(Collapsable(ReactView, HtmlView).withTitle('Markup'), Collapsable(CssView).withTitle('Styling')))
    .addWithSections('Nested groups again', () => (
        <div style={{ padding: '1rem', backgroundColor: '#efefef' }}>
            <Button>Simple</Button>
        </div>
    ), Collapsable(Tabbable(ReactView, HtmlView).withTitle('Markup'), Tabbable(CssView).withTitle('Styling')))
    .addWithSections('Deep nesting again', () => (
            <div style={{ padding: '1rem', backgroundColor: '#efefef' }}>
                <Button>Simple</Button>
            </div>
        ), Collapsable(Collapsable(Collapsable(Collapsable(Inline(HtmlView.withTitle('Min html')).withTitle('Ingenting')).withTitle('I the middle'))).withTitle('top-level')),
        Collapsable(Tabbable(Collapsable(Tabbable(Inline(HtmlView).withTitle('My header')).withTitle('tabbable')).withTitle('collapsable'))),
        Tabbable(Tabbable(Tabbable(Tabbable(Inline(HtmlView.withTitle('content')).withTitle('tab0')).withTitle('tab1')).withTitle('tab2')).withTitle('tab3')))
    .addWithSections('Pure grouping', () => (
        <div style={{ padding: '1rem', backgroundColor: '#efefef' }}>
            <Button>Simple</Button>
        </div>
    ), Collapsable(ReactView, HtmlView), Collapsable(Group(ReactView, HtmlView).withTitle('custom title')))
    .addWithSections('Raw view', () => (
        <div style={{ padding: '1rem', backgroundColor: '#efefef' }}>
            <Button>Simple</Button>
        </div>
    ), Tabbable(Rawview(buttonSrc, 'javascript').withTitle('Button')));
