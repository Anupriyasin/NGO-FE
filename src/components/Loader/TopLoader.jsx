import React, { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';

export default function TopLoader(props) {
    const [progress, setProgress] = useState(0);
    const loading = props.loading;
    useEffect(() => {
        setProgress(loading);
    }, [loading]);

    return (
        <>
        </>
        // <LoadingBar
        //     progress={progress}
        //     color='#f11946'
        //     height={4}
        // />
    );
}
