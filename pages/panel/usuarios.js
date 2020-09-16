import React, {Fragment, useEffect, useState} from "react";
import withAuth from "../../src/utils/wrapper/withAuth";
import LayoutBase from "../../src/components/layout/LayoutBase";
import Link from "next/link";
import API from "../../src/api";
import {useAuthenticated} from "../../src/context/AuthContext";
import UserList from "../../src/components/List/UserList";
import {Transition} from "@tailwindui/react";
import {buildInfoPaginationObject} from "../../src/utils";
import Pagination from "../../src/components/List/Pagination";
import LoadingList from "../../src/components/List/LoadingList";

function UsersPage() {
    const {token} = useAuthenticated();
    const [data, setData] = useState([]);
    const [info, setInfo] = useState([]);
    const [hasFilter, setHasFilter] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const response = await API.user.list(token);
            setData(response.data.collection.data);
            setInfo(buildInfoPaginationObject(response.data.collection.pagination));
            setLoading(false);
        }

        getData();
    }, []);

    const handlePagination = async (type) => {
        let page = info.page + 1;

        if (type === 'previous') {
            page = info.page - 1;
        }

        setLoading(true);
        const response = await API.user.list(token, page);
        setData(response.data.collection.data);
        setInfo(buildInfoPaginationObject(response.data.collection.pagination));
        setLoading(false);
    }
    const handleNextPage = async (e) => {
        e.preventDefault();
        await handlePagination('next')
    }

    const handlePreviousPage = async (e) => {
        e.preventDefault();
        await handlePagination('previous')
    }

    return (
        <LayoutBase>
            <Transition show={hasFilter}>
                <div className="fixed inset-0 overflow-hidden z-40">
                    <Transition.Child
                        show={hasFilter}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="absolute inset-0 overflow-hidden"
                        onClick={() => setHasFilter(false)}
                    >
                        <></>
                    </Transition.Child>
                    {/*<div className="absolute inset-0 overflow-hidden bg-blue-200">*/}

                    {/*</div>*/}
                    <section className="absolute inset-y-0 max-w-full right-0 flex">
                        <Transition.Child
                            show={hasFilter}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                            className="w-screen max-w-md"
                        >
                            <div className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
                                <div className="flex-1 h-0 overflow-y-auto">
                                    <header className="space-y-1 py-4 px-4 bg-indigo-700 sm:px-6">
                                        <div className="flex items-center justify-between space-x-3">
                                            <h2 className="text-lg leading-7 font-medium text-white">
                                                Filtros
                                            </h2>
                                            <div className="h-7 flex items-center">
                                                <button aria-label="Close panel" onClick={() => setHasFilter(false)} className="text-indigo-200 hover:text-white transition ease-in-out duration-150">
                                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </header>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="px-4 divide-y divide-gray-200 sm:px-6">
                                            <div className="space-y-6 pt-6 pb-5">
                                                <div className="space-y-1">
                                                    <label htmlFor="project_name"
                                                           className="block text-sm font-medium leading-5 text-gray-900">
                                                        Project name
                                                    </label>
                                                    <div className="relative rounded-md shadow-sm">
                                                        <input id="project_name"
                                                               className="form-input block w-full sm:text-sm sm:leading-5 transition ease-in-out duration-150"/>
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <label htmlFor="description"
                                                           className="block text-sm font-medium leading-5 text-gray-900">
                                                        Description
                                                    </label>
                                                    <div className="relative rounded-md shadow-sm">
                                                                        <textarea id="description" rows="4"
                                                                                  className="form-input block w-full sm:text-sm sm:leading-5 transition ease-in-out duration-150"> </textarea>
                                                    </div>
                                                </div>
                                                <fieldset className="space-y-2">
                                                    <legend
                                                        className="text-sm leading-5 font-medium text-gray-900">
                                                        Privacy
                                                    </legend>
                                                    <div className="space-y-5">
                                                        <div className="relative flex items-start">
                                                            <div className="absolute flex items-center h-5">
                                                                <input id="privacy_public"
                                                                       aria-describedby="privacy_public_description"
                                                                       type="radio" name="privacy"
                                                                       className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                                                            </div>
                                                            <div className="pl-7 text-sm leading-5">
                                                                <label htmlFor="privacy_public"
                                                                       className="font-medium text-gray-900">
                                                                    Public access
                                                                </label>
                                                                <p id="privacy_public_description"
                                                                   className="text-gray-500">
                                                                    Everyone with the link will see this
                                                                    project.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="relative flex items-start">
                                                                <div
                                                                    className="absolute flex items-center h-5">
                                                                    <input id="privacy_private-to-project"
                                                                           aria-describedby="privacy_private-to-project_description"
                                                                           type="radio" name="privacy"
                                                                           className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                                                                </div>
                                                                <div className="pl-7 text-sm leading-5">
                                                                    <label
                                                                        htmlFor="privacy_private-to-project"
                                                                        className="font-medium text-gray-900">
                                                                        Private to project members
                                                                    </label>
                                                                    <p id="privacy_private-to-project_description"
                                                                       className="text-gray-500">
                                                                        Only members of this project would
                                                                        be able to access.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="relative flex items-start">
                                                                <div
                                                                    className="absolute flex items-center h-5">
                                                                    <input id="privacy_private"
                                                                           aria-describedby="privacy_private-to-project_description"
                                                                           type="radio" name="privacy"
                                                                           className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                                                                </div>
                                                                <div className="pl-7 text-sm leading-5">
                                                                    <label htmlFor="privacy_private"
                                                                           className="font-medium text-gray-900">
                                                                        Private to you
                                                                    </label>
                                                                    <p id="privacy_private_description"
                                                                       className="text-gray-500">
                                                                        You are the only one able to access
                                                                        this project.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 px-4 py-4 space-x-4 flex justify-between">
                                    <span className="inline-flex rounded-md shadow-sm">
                                      <button type="button" className="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                                        Borrar filtros
                                      </button>
                                    </span>
                                    <span className="inline-flex rounded-md shadow-sm">
                                      <button onClick={() => setHasFilter(false)} type="button" className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                        Listo
                                      </button>
                                    </span>
                                </div>
                            </div>
                        </Transition.Child>
                    </section>
                </div>
            </Transition>


            <Link href="/panel">
                <a className="flex items-center text-sm px-4 text-gray-600 flex sm:px-6 lg:px-8 mt-2 sm:mt-4">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Panel
                </a>
            </Link>

            <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 mt-2 sm:mt-4">
                <div className="w-full max-w-6xl">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Usuarios
                    </h3>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                        Listado de usuarios
                    </p>

                    <div className="mt-5 bg-white shadow overflow-hidden sm:rounded">
                        <div className="block focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out p-4 pb-0">
                            <div className="flex">
                                <div className="min-w-0 flex-1 flex">
                                    <div className="w-full border flex border-r-0 rounded-l">
                                        <label htmlFor="search" className="sr-only">Buscar</label>
                                        <div className="relative text-gray-700 focus-within:text-gray-400 flex w-full">

                                            <input id="search" className="block w-full pl-2 pr-2 py-1 border border-transparent leading-5 text-gray-700 placeholder-gray-700 focus:outline-none focus:bg-white focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out" placeholder="Buscar" type="search"/>
                                        </div>
                                    </div>
                                    <div className="bg-green-200">
                                        <div className="inline-block relative max-w-64">
                                            <select className="text-gray-700 block appearance-none w-full bg-white border hover:border-gray-400 px-4 py-2 pr-8 leading-tight outline-none focus:outline-none">
                                                <option>Really long option that will likely overlap the chevron</option>
                                                <option>Option 2</option>
                                                <option>Option 3</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={() => setHasFilter(true)}
                                            type="button" className="truncate inline-flex justify-center py-2 px-4 border border-r-0 border-l-0 text-sm leading-5 font-medium text-gray-700 bg-indigo-white hover:bg-gray-100 focus:outline-none  transition duration-150 ease-in-out">
                                            Filtros
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="rounded-r inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                        <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                                        </svg>
                                        Buscar
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 pt-4 overflow-x-auto pb-4">
                            <div className="inline-flex flex justify-between items-baseline rounded-md text-sm font-medium leading-5 bg-gray-200 text-gray-600 mr-2">
                                <span className="p-1 border-r ">Filtro</span>
                                <svg className="flex-shrink-0 self-center h-4 w-4 text-gray-600 cursor-pointer hover:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>

                        {loading && <LoadingList/>}

                        {!loading &&
                        <Fragment>
                            <ul>
                                {data.map((item, key) => <UserList item={item} key={key} />)}
                            </ul>

                            <Pagination info={info} totalItem={data.length} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage}/>
                        </Fragment>
                        }
                    </div>

                </div>
            </div>
        </LayoutBase>
    )
}

export default withAuth(UsersPage);
