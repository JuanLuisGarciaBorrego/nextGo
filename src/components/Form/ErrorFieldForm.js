import React from 'react';

function ErrorFieldForm({error}) {

    if(!error) {
        return (<></>);
    }

    return (
        <p className="text-xs font font-italic text-red-500 mt-1">{error}</p>
    )
}

export default ErrorFieldForm;

