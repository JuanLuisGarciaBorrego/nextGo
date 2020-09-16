import React, {useState} from 'react';
import {Transition} from "@tailwindui/react";

export default function RowFilter({data, expand = true}) {

    const [show, setShow] = useState(expand);

    return(
        <div className="">
            <div onClick={() => setShow(!show)} className="py-3 px-4 sm:px-6 flex justify-between hover:bg-gray-100 transition ease-in-out duration-150 cursor-pointer border-l-2 border-white hover:border-indigo-700">
                <div className="block text-gray-800">
                    <div className="text-sm font-medium leading-5 ">Titulo</div>
                    <div className="inline-flex items-center px-1 py-1 rounded-full text-xs font-medium leading-none bg-gray-200 text-gray-600">
                      Badge
                    </div>
                </div>
                <div>
                    {!show ?
                        <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>:
                        <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    }
                </div>
            </div>
            <Transition
                show={show}
                enter="transition ease-out duration-150"
                enterFrom="transform opacity-0"
                enterTo="transform opacity-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0"
                className="mb-1 px-4 sm:px-6 "
            >
                sdfasdfasdf
            </Transition>
        </div>
    )
}
