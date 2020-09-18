import React, {Fragment, useEffect, useState} from 'react';
import {useAuthenticated} from "../context/AuthContext";
import {buildInfoPaginationObject} from "../utils";
import {changeFilter, removeFilter} from "../manager/filter";
import {Transition} from "@tailwindui/react";
import RowFilter from "./Filter/RowFilter";
import LoadingList from "./List/LoadingList";
import Pagination from "./List/Pagination";

function ListComponent({children, allFilters, fetch, parametersFilter, ItemComponent}) {

    const {token} = useAuthenticated();
    const [data, setData] = useState([]);
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const response = await fetch(token);
            setData(response.data.collection.data);
            setInfo(buildInfoPaginationObject(response.data.collection.pagination));
            setLoading(false);
        }

        getData();
    }, []);

    //filters
    const [filters, setFilters] = useState(allFilters)
    const [showFilter, setShowFilter] = useState(false);

    const onChangeFilter = async (e, content) => {
        const update = changeFilter(e, content, filters);
        setFilters(update);
    }
    const onRemoveFilter = async(filter) => {
        const update = await removeFilter(filter, filters)

        setFilters(update);
    }
    const removeAllFilter = () => {
        setFilters(allFilters);
    }

    const search = filters.find(item => item.main);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const parameters = await parametersFilter(filters);
        setLoading(true);
        const response = await fetch(token, 1, parameters);
        setData(response.data.collection.data);
        setInfo(buildInfoPaginationObject(response.data.collection.pagination));
        setLoading(false);
        setShowFilter(false);
    }

    //pagination
    const handlePagination = async (type) => {
        let page = info.page + 1;

        if (type === 'previous') {
            page = info.page - 1;
        }

        setLoading(true);
        const response = await fetch(token, page);
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
        <Fragment>
            <Transition show={showFilter}>
                <div className="fixed inset-0 overflow-hidden z-40">
                    <Transition.Child
                        show={showFilter.toString()}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="absolute inset-0 overflow-hidden"
                        onClick={() => setShowFilter(false)}
                    >
                        <></>
                    </Transition.Child>

                    <section className="absolute inset-y-0 max-w-full right-0 flex">
                        <Transition.Child
                            show={showFilter.toString()}
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
                                    <header className="space-y-1 py-4 px-4 bg-gray-200 sm:px-6">
                                        <div className="flex items-center justify-between space-x-3">
                                            <h2 className="text-lg leading-7 text-gray-800">
                                                Filtros
                                            </h2>
                                            <div className="h-7 flex items-center">
                                                <button aria-label="Close panel" onClick={() => setShowFilter(false)} className="text-gray-600 hover:text-white transition ease-in-out duration-150">
                                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </header>
                                    <div className="flex-1 flex flex-col justify-between">
                                        {filters.map((item, key) => <RowFilter key={key} data={item} filters={filters} onChangeFilter={onChangeFilter} removeFilter={onRemoveFilter} expand={false}/>)}
                                    </div>
                                </div>
                                <div className="flex-shrink-0 px-4 py-4 space-x-4 flex justify-between">
                                    <span className="inline-flex rounded-md shadow-sm">
                                      <button type="button" onClick={removeAllFilter} className="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                                        Borrar filtros
                                      </button>
                                    </span>
                                    <span className="inline-flex rounded-md shadow-sm">
                                      <button type="button" onClick={handleSubmit} className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                        Buscar
                                      </button>
                                    </span>
                                </div>
                            </div>
                        </Transition.Child>
                    </section>
                </div>
            </Transition>

            <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 mt-2 sm:mt-4">
                <div className="w-full max-w-6xl">
                    {children}
                    <div className="overflow-hidden bg-white shadow sm:rounded">
                        <div className="block focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out p-4 pb-2">
                            <form className="flex" method="POST" onSubmit={handleSubmit}>
                                <div className="min-w-0 flex-1 flex">
                                    <div className="w-full border flex border-r-0 rounded-l">
                                        <label htmlFor={search.name} className="sr-only">Buscar</label>
                                        <div className="relative text-gray-700 focus-within:text-gray-400 flex w-full">
                                            <input id={search.name}
                                                   value={search.valueDefined}
                                                   onChange={(e) => {
                                                       return onChangeFilter(e, {
                                                           type: 'text',
                                                           data: search
                                                       })
                                                   }}
                                                   className="block w-full pl-2 pr-2 py-1 border border-transparent leading-5 text-gray-700 placeholder-gray-700 focus:outline-none focus:bg-white focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"
                                                   placeholder={search.attr.placeholder} type={search.attr.type} autoComplete={search.attr.autoComplete ? 'on': 'off'}/>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={() => setShowFilter(true)}
                                                type="button"
                                                className="truncate inline-flex justify-center py-2 px-4 border border-r-0 text-sm leading-5 font-medium text-gray-700 bg-indigo-white hover:bg-gray-100 focus:outline-none  transition duration-150 ease-in-out">
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
                            </form>
                        </div>
                        <div className="px-4 overflow-x-auto">
                            {filters.filter(filter => filter.isUsed).map((filter) => <div key={filter.name} className="inline-flex flex justify-between items-baseline rounded-md text-sm font-medium leading-5 bg-gray-200 text-gray-600 mr-2 my-1">
                                <span className="p-1 border-r text-xs font-medium">{filter.shortTitle}: <span className="text-xs italic">{filter.valueDefined}</span></span>
                                <svg className="flex-shrink-0 self-center h-4 w-4 text-gray-600 cursor-pointer hover:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => onRemoveFilter(filter)}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>)}
                        </div>

                        {loading && <LoadingList/>}

                        {!loading &&
                        <Fragment>
                            <ul className="mt-2">
                                {data.map((item, key) => <ItemComponent item={item} key={key}/>)}
                            </ul>

                            <Pagination info={info} totalItem={data.length} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage}/>
                        </Fragment>
                        }
                    </div>

                </div>
            </div>

        </Fragment>
    )
}

export default ListComponent;
