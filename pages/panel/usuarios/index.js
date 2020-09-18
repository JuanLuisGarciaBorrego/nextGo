import React from "react";
import withAuth from "../../../src/utils/wrapper/withAuth";
import LayoutBase from "../../../src/components/layout/LayoutBase";
import Link from "next/link";
import API from "../../../src/api";
import UserList from "../../../src/components/List/UserList";
import {searchFilter} from "../../../src/manager/filter";
import ListComponent from "../../../src/components/ListComponent";

const allFilters = [
    {
        title: 'Buscador',
        description: 'Buscar por nombre y/o apellidos',
        shortTitle: 'Búsqueda',
        type: 'text',
        name: 'query',
        group: [],
        isUsed: false,
        labelDefined: '',
        valueDefined: '',
        value: '',
        attr: {
            type: 'search',
            placeholder: 'Escribe el nombre a buscar',
            autoComplete: false
        },
        main: true
    },
    {
        title: 'Buscador por emails',
        description: 'Buscar por email ',
        shortTitle: 'Email',
        type: 'text',
        name: 'email',
        group: [],
        isUsed: false,
        labelDefined: '',
        valueDefined: '',
        value: '',
        attr: {
            type: 'search',
            placeholder: 'Escribe elemail a buscar',
            autoComplete: false
        },
        main: false
    },
    {
        title: '¿Usuario bloqueado?',
        description: 'Filtrar por usuarios bloqueados o activos',
        shortTitle: 'Usuario',
        type: 'radio',
        name: 'active',
        group: [
            {id: 'status_block', label: 'Bloqueado', value: false, checked: false},
            {id: 'status_unblock', label: 'Activo', value: true, checked: false}
        ],
        isUsed: false,
        labelDefined: '',
        valueDefined: '',
        main: false
    }
];

function UsersPage() {

    const parametersFilter = async(filtersParam) => {
        const parameters = searchFilter(filtersParam);
        if(parameters.hasOwnProperty('active')) {
            parameters['active'] = parameters['active'] === 'Activo'
        }

        return parameters;
    }

    return (
        <LayoutBase>
            <Link href="/panel">
                <a className="flex items-center text-sm px-4 text-gray-600 flex sm:px-6 lg:px-8 mt-2 sm:mt-4">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                    </svg>
                    Panel
                </a>
            </Link>

            <ListComponent allFilters={allFilters} fetch={API.user.list} parametersFilter={parametersFilter} ItemComponent={UserList}>
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Usuarios
                        </h3>
                        <p className="mt-1 text-sm leading-5 text-gray-500 mb-5">
                            Listado de usuarios
                        </p>
                    </div>
                    <div>
                        <Link href="/panel/usuarios/crear">
                            <button type="button"  className="inline-flex justify-center py-2 px-4 border border-indigo-600 text-sm leading-5 font-medium rounded-md bg-white text-indigo-600 hover:bg-gray-100 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out">
                                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                                Buscar
                            </button>
                        </Link>
                    </div>
                </div>
            </ListComponent>
        </LayoutBase>
    )
}

export default withAuth(UsersPage);
