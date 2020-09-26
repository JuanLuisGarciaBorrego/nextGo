import React, {Fragment, useState} from 'react';
import DropdownMenuUser from "../nav/DropdownMenuUser";
import {Transition} from "@tailwindui/react";
import DropdownMenuUserNavBar from "../nav/DropdownMenuUserNavbar";
import Link from 'next/link'
import FlashMessage from "../FlashMessage";
import {useFlashMessages} from "../../context/FlashMessagesContext";
import {useRouter} from "next/router";

function LayoutBase({children}) {
    const [isOpenOffCanvas, setIsOpenOffCanvas] = useState(false);
    const {messages} = useFlashMessages();
    const {asPath} = useRouter();

    return (
        <Fragment>
            <div className="h-screen flex overflow-hidden bg-white">
                <div className="lg:hidden">
                    <Transition show={isOpenOffCanvas}>
                    <div className="fixed inset-0 flex z-10  ">
                        <Transition.Child
                            show={isOpenOffCanvas.toString()}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            className="fixed inset-0"
                        >
                            <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setIsOpenOffCanvas(false)}> </div>
                        </Transition.Child>
                        <Transition.Child
                            show={isOpenOffCanvas.toString()}
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
                                    <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
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
                                            <a href="/"
                                               className={`group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md text-gray-700 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150 hover:text-gray-900 hover:bg-gray-50  ${asPath === '/' && 'bg-gray-200'}`}>
                                                <svg
                                                    className="mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                                </svg>
                                                Home
                                            </a>
                                        </Link>
                                        <Link href="/panel">
                                            <a href="/panel"
                                               className={`group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md text-gray-700 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150 hover:text-gray-900 hover:bg-gray-50  ${asPath === '/panel' && 'bg-gray-200'}`}>
                                                <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                                </svg>
                                                Panel
                                            </a>
                                        </Link>
                                        <Link href="/panel/usuarios">
                                            <a href="/panel/usuarios"
                                               className={`group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md text-gray-700 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150 hover:text-gray-900 hover:bg-gray-50  ${asPath === '/panel/usuarios' && 'bg-gray-200'}`}>
                                                <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                Usuarios
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="mt-8">
                                        <h3 className="px-3 text-xs leading-4 font-sembold text-gray-500 uppercase tracking-wider"
                                            id="teams-headline">
                                            Configuración
                                        </h3>
                                        <div className="mt-1 space-y-1" role="group" aria-labelledby="teams-headline">
                                            <a href="#"
                                               className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150">
                                                <span className="w-2.5 h-2.5 mr-4 bg-indigo-500 rounded-full"> </span>
                                                <span className="truncate">
                                                Servicio
                                              </span>
                                            </a>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14">
                            {/*Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                    </Transition>
                </div>
                {/*Static sidebar for desktop */}
                <div className="hidden lg:flex lg:flex-shrink-0">
                    <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-white">
                        <div className="flex items-center flex-shrink-0 px-6">
                            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-purple-on-white.svg" alt="Workflow"/>
                        </div>
                        {/*Sidebar component, swap this element with another sidebar if you like */}
                        <div className="h-0 flex-1 flex flex-col overflow-y-auto">
                            {/*User account dropdown */}
                            <div className="px-3 mt-6 relative inline-block text-left">
                               <DropdownMenuUser/>
                            </div>
                            {/*Sidebar Search */}
                            <div className="px-3 mt-5">
                                <label htmlFor="search" className="sr-only">Search</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="mr-3 h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <input id="search" className="p-2 form-input block w-full pl-8 sm:text-sm sm:leading-5 rounded-md border border-gray-400 focus:outline-none" placeholder="Buscar"/>
                                </div>
                            </div>
                            {/*Navigation */}
                            <nav className="px-3 mt-6">
                                <div className="space-y-1">
                                    <Link href="/">
                                        <a  href="/"
                                            className={`group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-700 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150 hover:text-gray-900 hover:bg-gray-50  ${asPath === '/' && 'bg-gray-200'}`}>
                                            <svg className="mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                            </svg>
                                            Inicio
                                        </a>
                                    </Link>
                                    <Link href="/panel">
                                        <a href="/panel"
                                           className={`group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-700 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150 hover:text-gray-900 hover:bg-gray-50  ${asPath === '/panel' && 'bg-gray-200'}`}>
                                            <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                            </svg>
                                            Panel
                                        </a>
                                    </Link>
                                    <Link href="/panel/usuarios">
                                        <a href="/panel/usuarios"
                                           className={`group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-700 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150 hover:text-gray-900 hover:bg-gray-50  ${asPath === '/panel/usuarios' && 'bg-gray-200'}`}>
                                            <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Usuarios
                                        </a>
                                    </Link>

                                </div>
                                <div className="mt-8">
                                    {/*Secondary navigation */}
                                    <h3 className="px-3 text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
                                        id="teams-headline">
                                        Configuración
                                    </h3>
                                    <div className="mt-1 space-y-1" role="group" aria-labelledby="teams-headline">
                                        <a href="#"
                                           className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150">
                                            <span className="w-2.5 h-2.5 mr-4 bg-indigo-500 rounded-full"></span>
                                            <span className="truncate">
                                              Servicio
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                {/*- Main column */}
                <div className="flex flex-col w-0 flex-1 overflow-hidden ">
                    {/*Search header */}
                    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
                        {/*Sidebar toggle, controls the 'sidebarOpen' sidebar state.*/}
                        <button
                            onClick={() => setIsOpenOffCanvas(!isOpenOffCanvas)}
                            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 lg:hidden cursor-pointer" aria-label="Open sidebar">
                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M4 6h16M4 12h8m-8 6h16"/>
                            </svg>
                        </button>
                        <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
                            <div className="flex-1 flex">
                                <form className="w-full flex md:ml-0" action="#" method="GET">
                                    <label htmlFor="search_field" className="sr-only">Search</label>
                                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
                                            </svg>
                                        </div>
                                        <input id="search_field" className="block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm" placeholder="Buscar" type="search"/>
                                    </div>
                                </form>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-3 relative">
                                    <DropdownMenuUserNavBar/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-100 pb-4" tabIndex="0">
                        {children}
                        <div className="fixed inset-0 flex items-end justify-center pointer-events-none pt-20 pr-4 lg:pt-4 sm:items-start sm:justify-end pb-16">
                            <div className="flex flex-col w-full items-center sm:items-end">
                                {messages.map((item) => <FlashMessage key={item.uuid} msg={item}/>)}
                            </div>
                        </div>
                    </main>
                </div>
            </div>

        </Fragment>)
}

export default LayoutBase;
