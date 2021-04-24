import React from 'react';
import './flexRow.css';

function FlexRow(props) {
    return (
        <div className="flex-row" onClick={props.onClick}>
            {props.children}
        </div>
    )
}

export default FlexRow
