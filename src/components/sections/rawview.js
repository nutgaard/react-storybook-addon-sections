import React from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';
import titleHoc from './../title-hoc';

function Rawview(source, language) {
    const RawviewComponent = () => (
        <Highlight className={language}>
            {source}
        </Highlight>
    );

    return titleHoc('Raw', RawviewComponent);
}

export default Rawview;
