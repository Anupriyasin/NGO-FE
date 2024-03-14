import React from 'react'

const Spinner = () => {
    return (
        <div className="d-flex justify-content-center align-items-center spinner">
            <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    )
}

export default Spinner