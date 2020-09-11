import {useState} from "react";
import { Transition } from '@tailwindui/react'
import {useAuthenticated} from "../../context/AuthContext";
import OutsideClickHandler from 'react-outside-click-handler';
import ItemsNavDropdown from "./ItemsNavDropdown";

export default function DropdownMenuUser() {
    const [isOpen, setIsOpen] = useState(false)
    const {user} = useAuthenticated();
    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                setIsOpen(false);
            }}
        >
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button" className="group w-full rounded-md px-3.5 py-2 text-sm leading-5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-500 focus:outline-none focus:bg-gray-200 focus:border-blue-300 active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150" id="options-menu" aria-haspopup="true" aria-expanded="true">
                    <div className="flex w-full justify-between items-center">
                        <div className="flex items-center justify-between space-x-1">
                            {/*<img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" alt=""/>*/}
                            <div className="flex-1 pl-2">
                                <h2 className="text-gray-900 text-sm leading-5 font-medium text-left">Mi cuenta</h2>
                                <h3 className="text-gray-500 text-sm leading-5 truncate text-left">{user?.name} {user?.lastName}</h3>
                            </div>
                        </div>
                        <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                        </svg>
                    </div>
                </button>
            </div>

            <Transition
                show={isOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg"
            >
                <div className="rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <ItemsNavDropdown/>
                </div>
            </Transition>
        </OutsideClickHandler>
    );
}