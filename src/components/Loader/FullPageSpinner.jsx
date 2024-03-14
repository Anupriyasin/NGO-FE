import React from 'react';
import './Loader.css';

const FullPageSpinner = () => {
    return (
        <div className="loader-overlay">
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        </div>
    )
}

export default FullPageSpinner