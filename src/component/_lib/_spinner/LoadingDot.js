import React from 'react'
import '../../../styles/sass/component/_lib/_spinner/_loadingDot.scss';

function LoadingDot(props) {
    return (
        <div className="overlay">
            <div className={`positioning-loading`}>
                <div className={props.nclass}>
                <span role="progressbar" className="loading">Loading...</span>
                </div>
            </div> 
        </div>

    )
}

export default LoadingDot
