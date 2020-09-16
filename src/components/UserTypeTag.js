import React from 'react';

export default function UserTypeTag({roles}) {

    if(roles.includes('ROLE_ADMIN')) {
        return(
            <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-indigo-700 text-white">
                <svg className="mr-1 h-2 w-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3"/>
                </svg>
                Admin
            </span>
        )
    }

    if(roles.includes('ROLE_USER')) {
        return(
            <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-indigo-400 text-white">
                <svg className="mr-1 h-2 w-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3"/>
                </svg>
                Usuario
            </span>
        )
    }

    return(<></>)
}
