import React, {Fragment} from 'react';
import {Formik, Form, Field} from 'formik';
import Router from 'next/router';
import API from "../api";
import Link from 'next/link'
import {FORMS_ERROR_RECOVERY_PASSWORD_NOT_EMAIL} from "../constants/forms";
import {APP_NAME} from "../constants/app";
import Logo from "./Logo";

function RecoveryPassword() {

    const initialValues = {
        email: '',
    };

    const handleSubmit = async (values, {setSubmitting, setErrors}) => {
        return new Promise(async() => {
            setSubmitting(true);

            try {
                await API.security.recoveryPassword(values.email);
            } catch (e) {
                setErrors({
                    'errorForm': FORMS_ERROR_RECOVERY_PASSWORD_NOT_EMAIL
                })

                await setSubmitting(false);
                return;
            }

            await setSubmitting(false);
            return Router.push('/cambiar-contrasena');
        });
    }

    return (
        <Fragment>
            <div>
                <div className="text-center">
                    <span className="inline-block relative">
                        <Logo />
                    </span>
                </div>
                <h1 className="mt-0 mb-4 text-center text-2xl leading-6 font-extrabold text-gray-900">
                    Recuperar contraseña
                </h1>
                <p className="text-center text-sm leading-tight text-gray-800">
                    Introduce el e-mail asociado a su cuenta de {APP_NAME} y le enviaremos un código para restaurar su contraseña.
                </p>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({
                      isSubmitting,
                      handleChange,
                      errors
                  }) => {

                    return (
                        <Form className="mt-8">
                            <div className="rounded-md shadow-sm">
                                <div>
                                    <Field aria-label="Email" name="email" type="email" required
                                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 focus:z-10 sm:text-sm sm:leading-5"
                                           placeholder="Email"
                                           autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="mt-2">
                                <div className="mt-4 h-4">
                                    <p className="text-xs font font-italic text-red-500 ">{errors.errorForm}</p>
                                </div>

                                <button type="submit"
                                        disabled={isSubmitting && true}
                                        className={`${isSubmitting && 'opacity-50 cursor-not-allowed spinner'} mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out`}>
                                         <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </span>
                                    Recuperar
                                </button>

                                <div className="mt-6">
                                    <div className="text-sm leading-5 ">
                                        <Link href="/entrar">
                                            <a href="/entrar"
                                               className="font-medium text-indigo-800 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                                Volver a entrar
                                            </a>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </Fragment>
    )
}

export default RecoveryPassword;
