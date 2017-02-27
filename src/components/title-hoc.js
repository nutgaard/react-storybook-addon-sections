import React from 'react';

export default function withTitleHoc(initalTitle, Component) {
    function Wrapper(props) {
        return <Component {...props} />;
    }

    Wrapper.title = initalTitle;
    Wrapper.withTitle = (title) => withTitleHoc(title, Component);

    return Wrapper;
}
