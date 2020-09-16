import React from 'react';

export default function UserTypeTag({roles}) {

    if(roles.includes('ROLE_ADMIN')) {
        return(
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-700 text-white">
                Admin
            </span>
        )
    }

    if(roles.includes('ROLE_USER')) {
        return(
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-400 text-white">
                Usuario
            </span>
        )
    }

    return(<></>)
}
