import React, {useEffect, useState} from "react";
import withAuth from "../../src/utils/wrapper/withAuth";
import LayoutBase from "../../src/components/layout/LayoutBase";
import Link from "next/link";
import API from "../../src/api";
import {useAuthenticated} from "../../src/context/AuthContext";
import UserList from "../../src/components/List/UserList";
import UserTypeTag from "../../src/components/UserTypeTag";

function UsersPage() {
    const {token} = useAuthenticated();
    const [data, setData] = useState([]);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        async function getData() {
            const response = await API.user.list(token);
            console.log(response.data.collection);
            setData(response.data.collection.data);
            setInfo(response.data.collection.pagination);
        }

        getData();
    }, []);

    return (
        <LayoutBase>
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
                        <div className="block focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out p-4">
                            <div className="flex">
                                <div className="min-w-0 flex-1 flex">
                                    <div className="w-full bg-blue-700 border flex border-r-0 rounded-l">
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
                                    <div className="">
                                        <button type="submit" className="truncate inline-flex justify-center py-2 px-4 border border-r-0 border-l-0 text-sm leading-5 font-medium text-gray-700 bg-indigo-white hover:bg-gray-100 focus:outline-none  transition duration-150 ease-in-out">
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

                        <ul>
                            {data.map((item, key) => <UserList item={item} key={key} />)}
                        </ul>
                    </div>

                </div>
            </div>
        </LayoutBase>
    )
}

export default withAuth(UsersPage);
