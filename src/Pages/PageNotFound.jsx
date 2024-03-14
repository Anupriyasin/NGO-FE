import React from 'react';
import './Error404.css';
import error from '../images/error404.gif';

const PageNotFound = () => {

    return (

        <>
            <div className='mt-3 px-0 px-md-3'>
                <div className='text-center'>
                    <div className='Table'>
                        <img src={error} className='mw-100' alt="Error" />
                        <h1>Sorry, This page doesn't exist</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageNotFound