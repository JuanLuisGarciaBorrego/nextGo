import React, {Fragment} from 'react';
import Link from 'next/link';
import UserTypeTag from "../UserTypeTag";

function UserList({item, ...arg}) {

    return (
        <Fragment>
            <li className="w-full border-t border-gray-200 cursor-pointer" {...arg}>
                <Link href={`/panel/usuarios/${item.uuid}`}>
                    <div className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                            {/*<img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"/>*/}
                            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                              <svg className="h-full w-full text-indigo-200" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                              </svg>
                            </span>
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                                <div className="text-sm leading-5 font-medium text-indigo-600 truncate">{item.name} {item.lastName}</div>
                                <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                    </svg>
                                    <span className="truncate ml-1"> {item.email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0 mr-2">
                            <div className="flex overflow-hidden">
                                <UserTypeTag roles={item.roles}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                        </svg>
                    </div>
                </div>
            </div>
                </Link>
            </li>
        </Fragment>
    )
}

export default UserList;
