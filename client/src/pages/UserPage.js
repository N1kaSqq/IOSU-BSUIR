import React, { useEffect } from 'react';

function UserPage(props) {

    useEffect(() => {
        console.log(props);
    }, []);

    return (
        <div>
            <h1>{props.match.params.id}</h1>
        </div>
    )
}

export default UserPage
