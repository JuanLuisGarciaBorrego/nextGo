import React, {useState, Fragment} from 'react';
import {Transition} from "@tailwindui/react";
import {Field, Formik, Form} from "formik";
import SERVER_API from "../../api/server";
import {FORMS_ERROR_LOGIN} from "../../constants/forms";
import {ROUTE_LOGIN_REDIRECT_SUCCESS} from "../../constants/routes";

export default function PreviewFile({view, toggleView, seo, viewData}) {

    const initialValues = {
        title: viewData?.title,
        description: viewData?.description
    };

    const handleSubmit = async (values, {setSubmitting, setErrors}) => {
        return new Promise(async () => {
            setSubmitting(true);

            try {
               //Fetch api
                console.log(values)

            } catch (e) {
                setErrors({
                    'errorForm': FORMS_ERROR_LOGIN
                })

                await setSubmitting(false);
                return;
            }

            await setSubmitting(false);
        });
    }

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

                                            <Formik
                                                initialValues={initialValues}
                                                onSubmit={handleSubmit}
                                            >
                                                {({
                                                      isSubmitting
                                                  }) => {
                                                      return (
                                                           <Form>
                                                                <div>
                                                                    <Field name="title"
                                                                           placeholder="Título (Máximo 70 caracteres)" autoComplete="Off" maxLength="70"
                                                                           className="italict py-1 text-xs text-gray-600 border-solid border-b border-gray-400 form-input rounded-sm block w-full transition duration-150 ease-in-out outline-none" />
                                                                </div>
                                                                <div className="mt-4">
                                                                    <Field name="description"
                                                                           placeholder="Descripción (Máximo 120 caracteres)" autoComplete="Off" maxLength="120"
                                                                           className="italic py-1 text-xs text-gray-600 border-solid border-b border-gray-400 form-input rounded-sm block w-full transition duration-150 ease-in-out outline-none" />
                                                                </div>

                                                                <div className="mt-4">
                                                                    <button
                                                                        disabled={isSubmitting && true}
                                                                        className={`${isSubmitting && 'opacity-50 cursor-not-allowed spinner'} text-sm text-gray-600 focus:outline-none flex items-center border border-gray-400 py-1 px-2 text-sm leading-5 font-medium rounded-md hover:bg-gray-100 transition duration-150 ease-in-out outline-none`} type="submit">
                                                                        Guardar
                                                                    </button>
                                                                </div>
                                                           </Form>
                                                      )
                                                }}
                                            </Formik>
                                        </div>
                                        }
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
