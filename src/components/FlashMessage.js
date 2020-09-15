import React from 'react';
import {Transition} from '@tailwindui/react'
import {FLASH_MESSAGE_ERROR, FLASH_MESSAGE_SUCCESS, FLASH_MESSAGE_WARNING} from "../constants/flashMessages";
import {useFlashMessages} from "../context/FlashMessagesContext";

export default function FlashMessage({msg}) {

    const {removeMessage} = useFlashMessages();

    return (
        <Transition
            show={msg.status}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto z-40 mb-4 last:mb-0 z-30"
        >
            <div className="rounded-lg shadow-xs overflow-hidden">
                <div className="p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            {msg.type === FLASH_MESSAGE_SUCCESS &&
                            <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            }

                            {msg.type === FLASH_MESSAGE_WARNING &&
                            <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                            }

                            {msg.type === FLASH_MESSAGE_ERROR &&
                            <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            }
                        </div>
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                            <p className="text-sm leading-5 font-medium text-gray-900">
                                {msg.title}
                            </p>
                            {msg.description &&
                            <p className="mt-1 text-sm leading-5 text-gray-500">
                                {msg.description}
                            </p>
                            }
                        </div>
                        <div className="ml-4 flex-shrink-0 flex">
                            <button
                                className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                                onClick={() => removeMessage(msg)}
                            >
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule="evenodd"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    )
}
FlashMessage.defaultProps = {
    title: '',
    description: null
}
