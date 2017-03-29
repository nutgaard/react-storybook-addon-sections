import React from 'react';

export default function withTitleHoc(initalTitle, Component, initialProps = {}) {
    function Wrapper(props) {
        return <Component {...props} {...initialProps} />;
    }

    Wrapper.title = initalTitle;
    Wrapper.props = initialProps;
    Wrapper.withTitle = (title) => withTitleHoc(title, Component, initialProps);
    Wrapper.withProps = (props) => withTitleHoc(initalTitle, Component, props);

    return Wrapper;
}
