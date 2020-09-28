import React, {useState, Fragment} from 'react';
import {Transition} from "@tailwindui/react";
import {Field} from "formik";

export default function PreviewFile({view, toggleView, seo, viewData}) {
    return (
        <Fragment>
            <Transition show={view}>
                <div className="fixed inset-0 overflow-hidden z-40">
                    <Transition.Child
                        show={view.toString()}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="absolute inset-0 overflow-hidden bg-gray-600 bg-opacity-75 transition-opacity"
                        onClick={toggleView}
                    >
                        <></>
                    </Transition.Child>

                    <section className="absolute inset-y-0 right-0 max-w-full flex pl-10 sm:pl-16">
                        <Transition.Child
                            show={view.toString()}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                            className="w-screen max-w-md"
                        >
                            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-md sm:text-lg leading-none font-medium text-gray-900">
                                            Vista previa
                                        </h2>
                                        <div className="flex items-center">
                                            <button onClick={toggleView}
                                                    aria-label="Close panel" className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150">
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                                </svg>
                                            </button>

                                        </div>
                                    </div>
                                </div>

                                <div className="h-full flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <div className="relative max-h-64">
                                            <img className="h-auto w-full" src={viewData?.path} alt=""/>
                                        </div>
                                        {seo &&
                                        <div className="px-4 flex flex-col">
                                            {(!viewData?.title && !viewData?.description) &&
                                            <div className="space-y-4">
                                                <p className="text-sm text-gray-500 leading-snug mb-4">
                                                    Mejora el posicionamiento web. Añade un título y una breve descripción utilizando las palabras clave para que tengas un mayor impacto en los resultados de búsqueda.
                                                </p>
                                            </div>
                                            }
                                            <form method="POST">
                                                <div>
                                                    <input name="title"
                                                           placeholder="Título (Máximo 70 caracteres)" autoComplete="Off" maxLength="70"
                                                           defaultValue={viewData?.title}
                                                           className="italict py-1 text-xs text-gray-600 border-solid border-b border-gray-400 form-input rounded-sm block w-full transition duration-150 ease-in-out outline-none" />
                                                </div>
                                                <div className="mt-4">
                                                    <input name="description"
                                                           placeholder="Descripción (Máximo 120 caracteres)" autoComplete="Off" maxLength="120"
                                                           defaultValue={viewData?.description}
                                                           className="italic py-1 text-xs text-gray-600 border-solid border-b border-gray-400 form-input rounded-sm block w-full transition duration-150 ease-in-out outline-none" />
                                                </div>

                                                <div className="mt-4">
                                                    <button className="text-sm text-gray-600 focus:outline-none flex items-center border border-gray-400 py-1 px-2 text-sm leading-5 font-medium rounded-md hover:bg-gray-100 transition duration-150 ease-in-out outline-none" type="submit">
                                                        Guardar
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        }
                                    </div>
                                    <div className="flex p-2 space-x-2 flex bottom-0 justify-end">
                                        <span className="rounded-md shadow-sm">
                                          <button type="button" className="py-2 px-2 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                                                Cancelar
                                          </button>
                                        </span>
                                        <span className="rounded-md shadow-sm">
                                          <button type="submit" className="inline-flex justify-center py-2 px-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                            Guardar
                                          </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </section>
                </div>
            </Transition>
        </Fragment>
    )
}
