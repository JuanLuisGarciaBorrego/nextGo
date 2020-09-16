import React from 'react';
import { Transition } from '@tailwindui/react'

function Modal({isOpen, children, handleClose, className = 'sm:max-w-lg sm:w-full', backgroundClick = true}) {

    if(!isOpen) {
        return (<></>);
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition
                    show={isOpen}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="fixed inset-0 transition-opacity"
                >
                    {backgroundClick ?
                        <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={handleClose}> </div> :
                        <div className="absolute inset-0 bg-gray-500 opacity-75"> </div>
                    }
                </Transition>
                {/*This element is to trick the browser into centering the modal contents.*/}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"> </span>&#8203;

                <Transition
                    show={isOpen}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    className={`shadow-xl inline-block align-bottom rounded-lg overflow-hidden transform transition-all sm:my-8 sm:align-middle ${className} `}
                >
                    {children}
                </Transition>
            </div>
        </div>
    )
}

export default Modal;
