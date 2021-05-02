import React from 'react';
import './flexRow.css';

function FlexRow(props) {

    if (props.hover) {
        return (
            <div className="flex-row hover" onClick={props.onClick}>
                {props.children}
            </div>
        )
    }

    return (
        <div className="flex-row" onClick={props.onClick}>
            {props.children}
        </div>
    )
}

export default FlexRow
