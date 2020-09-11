import {useState} from "react";
import { Transition } from '@tailwindui/react'
import OutsideClickHandler from "react-outside-click-handler";
import ItemsNavDropdown from "./ItemsNavDropdown";

export default function DropdownMenuUserNavBar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                setIsOpen(false);
            }}
        >
            <div>
                <button onClick={() => setIsOpen(!isOpen)} className="max-w-xs flex items-center text-sm rounded-full focus:outline-none" id="user-menu" aria-label="User menu" aria-haspopup="true">
                    {/*<img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>*/}
                    <h2 className="text-gray-900 text-sm leading-5 font-medium">Mi cuenta</h2>
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
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
            >
                <div className="rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <ItemsNavDropdown/>
                </div>
            </Transition>
        </OutsideClickHandler>
    );
}
