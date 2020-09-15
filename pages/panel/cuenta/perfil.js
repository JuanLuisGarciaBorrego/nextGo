import React from "react";
import withAuth from "../../../src/utils/wrapper/withAuth";
import LayoutBase from "../../../src/components/layout/LayoutBase";
import {useFlashMessages} from "../../../src/context/FlashMessagesContext";
import {FLASH_MESSAGE_SUCCESS} from "../../../src/constants/flashMessages";

function ProfileAccountPage() {
    const {addFlashMessage } = useFlashMessages();

    return (
        <LayoutBase>
            <div className="px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <form className="w-full max-w-screen-md">
                    <div className="flex">
                        <div className="mt-2 pt-2 md:mt-4 md:pt-4 w-full">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Información personal
                                </h3>
                            </div>

                            <div className="mt-6 grid grid-cols-6 gap-y-4 gap-x-4">
                                <div className="col-span-2">
                                    <label htmlFor="first_name" className="block text-sm font-medium leading-5 text-gray-700">
                                        Nombre
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm leading-normal">
                                        <input id="name" name="name" className="p-2 border-solid border border-gray-400 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none"/>
                                    </div>
                                </div>

                                <div className="col-span-4">
                                    <label htmlFor="last_name" className="block text-sm font-medium leading-5 text-gray-700">
                                        Apellidos
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input id="lastName" name="lastName" className="p-2 border-solid border border-gray-400 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none"/>
                                    </div>
                                </div>

                                <div className="col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                                       Email
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input id="email" name="email" className="p-2 border-solid border border-gray-400 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none"/>
                                    </div>
                                </div>

                                <div className="col-span-6">
                                    <fieldset>
                                        <div className="">
                                            <div className="relative flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="comments" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                                                </div>
                                                <div className="ml-3 text-sm leading-5">
                                                    <label htmlFor="comments" className="font-medium text-gray-700">¿Cambiar contraseña?</label>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="col-span-3">
                                    <label htmlFor="first_name" className="block text-sm font-medium leading-5 text-gray-700">
                                        Nueva contraseña
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm leading-normal">
                                        <input id="password" name="password" className="p-2 border-solid border border-gray-400 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none"/>
                                    </div>
                                </div>

                                <div className="col-span-3">
                                    <label htmlFor="last_name" className="block text-sm font-medium leading-5 text-gray-700">
                                        Repetir nueva contraseña
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input id="repeatPassword" name="repeatPassword" className="p-2 border-solid border border-gray-400 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 md:relative p-2 md:p-0 md:mt-8 md:pt-5 border-t border-gray-200 bg-red-400">
                        <div className="flex justify-between md:inline-flex">
                          <span className="rounded-md shadow-sm flex-auto md:flex-1 md:inline-flex ">
                            <button type="button" className="w-full md:w-auto py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                              Cancelar
                            </button>
                          </span>
                          <span className="rounded-md shadow-sm flex-auto md:flex-1 bg-blue-700 ml-3 md:inline-flex ">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    addFlashMessage(FLASH_MESSAGE_SUCCESS, 'Hola', 'descripción de prueba');
                                }}
                                type="submit" className="w-full md:w-auto justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                              Guardar
                            </button>
                          </span>
                        </div>
                    </div>
                </form>
            </div>
        </LayoutBase>
    )
}

export default withAuth(ProfileAccountPage);
