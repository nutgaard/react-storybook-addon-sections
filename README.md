# React Storybook Sections Addon

A React Storybook addon to show additional information for your stories.

[DEMO](http://www.utgaard.xyz/react-storybook-addon-sections)

## Usage

Install the following npm module:

```sh
npm i -D react-storybook-addon-sections
```

Then set the addon in the place you configure storybook like this:

```js
import React from 'react';
import { configure, setAddon } from '@storybook/react';
import sectionsAddon from 'react-storybook-addon-sections';

setAddon(sectionsAddon);

configure(function () {
  ...
}, module);
```

Then create your stories with the `.addWithSections` API.

```js
import React from 'react';
import Button from './Button';
import { storiesOf } from '@storybook/react';

storiesOf('Button')
    .addWithSections('Global sections', () => (
        <Button>Simple</Button>
    ))
    .addWithSections('Single section', () => (
        <Button>Simple</Button>
    ), ReactView);
```

> Have a look at [this example](example/story.js) stories to learn more about the `addWithSections` API.

## The FAQ

**Components lose their names on static build**

Component names also get minified with other javascript code when building for production. When creating components, set the `displayName` static property to show the correct component name on static builds.
