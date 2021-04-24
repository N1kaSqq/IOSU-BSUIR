import React from 'react';
import './container.css';

function Container(props) {
    return (
        <div className="custom-container">
            {props.children}
        </div>
    )
}

export default Container
