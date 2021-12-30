import React, {useEffect} from 'react';

const Test = ({ match }) => {
    const { name } = match.params;

    return (
        <div>
            <h3> This is {name} page </h3>
        </div>

    );
}

export default Test;