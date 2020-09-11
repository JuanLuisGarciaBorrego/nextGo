import {Fragment, useState} from "react";
import { Transition } from '@tailwindui/react'
import Link from "next/link";

export default function OffCanvasMenu() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <Fragment>
            {/*  Off-canvas menu overlay, show/hide based on off-canvas menu state.*/}

            {/*  Entering: "transition-opacity ease-linear duration-300"*/}
            {/*    From: "opacity-0"*/}
            {/*    To: "opacity-100"*/}
            {/*  Leaving: "transition-opacity ease-linear duration-300"*/}
            {/*    From: "opacity-100"*/}
            {/*    To: "opacity-0"*/}
            {/*-*/}
            <Transition
                show={isOpen}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="fixed inset-0"
            >
                <div className="absolute inset-0 bg-gray-600 opacity-75"> </div>
            </Transition>
            {/*Off-canvas menu, show/hide based on off-canvas menu state.*/}

            {/*Entering: "transition ease-in-out duration-300 transform"*/}
            {/*  From: "-translate-x-full"*/}
            {/*  To: "translate-x-0"*/}
            {/*Leaving: "transition ease-in-out duration-300 transform"*/}
            {/*  From: "translate-x-0"*/}
            {/*  To: "-translate-x-full"*/}
            <Transition
                show={isOpen}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
                className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white"
            >
                <div className="absolute top-0 right-0 -mr-14 p-1">
                    <button className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600" aria-label="Close sidebar">
                        <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none"
                             viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <div className="flex-shrink-0 flex items-center px-4">
                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-purple-on-white.svg" alt="Workflow"/>
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                    <nav className="px-2">
                        <div className="space-y-1">
                            <Link href="/">
                                <a href="#" className="group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md text-gray-900 bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none transition ease-in-out duration-150">
                                    <svg className="mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                    </svg>
                                    Home
                                </a>
                            </Link>
                            <Link href="/panel">
                                <a href="/panel" className="group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition ease-in-out duration-150">
                                    <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                                    </svg>
                                    My tasksasdf asdf
                                </a>
                            </Link>
                            <a href="#" className="group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition ease-in-out duration-150">
                                <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                Recent
                            </a>
                        </div>
                        <div className="mt-8">
                            <h3 className="px-3 text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider" id="teams-headline">
                                Teams
                            </h3>
                            <div className="mt-1 space-y-1" role="group" aria-labelledby="teams-headline">
                                <a href="#" className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"><span className="w-2.5 h-2.5 mr-4 bg-indigo-500 rounded-full"> </span>
                                    <span className="truncate">
                                    Engineering
                                  </span>
                                </a>

                                <a href="#" className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150">
                                    <span className="w-2.5 h-2.5 mr-4 bg-teal-400 rounded-full"> </span>
                                    <span className="truncate">
                                    Human Resources
                                  </span>
                                </a>

                                <a href="#"
                                   className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150">
                                    <span className="w-2.5 h-2.5 mr-4 bg-orange-500 rounded-full"> </span>
                                    <span className="truncate">
                    Customer Success
                  </span>
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </Transition>
            <div className="flex-shrink-0 w-14">
                {/*Dummy element to force sidebar to shrink to fit close icon */}
            </div>
        </Fragment>
    );
}
