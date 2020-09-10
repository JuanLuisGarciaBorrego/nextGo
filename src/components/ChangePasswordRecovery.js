import React, {Fragment, useContext} from 'react';
import {Formik, Form, Field} from 'formik';
import API from "../api";
import {FORMS_ERROR_RECOVERY_PASSWORD_NOT_TOKEN} from "../constants/forms";
import Link from "next/link";
import {updateCookie} from "../utils";
import {COOKIE_AUTH, COOKIE_REFRESH_AUTH} from "../constants/cookies";
import Router from 'next/router';
import Logo from "./Logo";
import InputPassword from "./Form/InputPassword";
import SERVER_API from "../api/server";

function ChangePasswordRecovery() {

    const initialValues = {
        token: '',
        password: ''
    };

    const handleSubmit = async (values, {setSubmitting, setErrors}) => {
        return new Promise(async () => {
            setSubmitting(true);

            try {
                const response = await API.security.changePasswordFromRecovery(values.token, values.password);
                const data = await response.data;

                const loginResponse = await SERVER_API.security.login(data.data.email, values.password);
                const dataLogin = await loginResponse.data;

               //auth

            } catch (e) {
                setErrors({
                    'errorForm': FORMS_ERROR_RECOVERY_PASSWORD_NOT_TOKEN
                })

                await setSubmitting(false);
                return;
            }

            await setSubmitting(false);
            // return Router.push('/panel');
        });
    }

    return (
        <Fragment>
            <div>
                <div className="text-center">
                    <span className="inline-block relative">
                        <Logo/>
                    </span>
                </div>
                <h1 className="mt-0 mb-4 text-center text-2xl leading-6 font-extrabold text-gray-900">
                    Cambiar contraseña
                </h1>
                <p className="text-center text-sm leading-tight text-gray-800">
                    Introduce el código que le hemos enviado a su email y escribe su nueva contraseña.
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
                                    <Field aria-label="token" name="token" type="text" required
                                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 focus:z-10 sm:text-sm sm:leading-5"
                                           placeholder="Código enviado a su email"
                                           autoComplete="off"
                                    />
                                </div>
                                <div>
                                    <InputPassword
                                        name="password"
                                        onChange={handleChange}
                                        cssInput='appearance-none rounded-none form-input block w-full px-3 py-2 pr-10 border border-t-0 border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 focus:z-10 sm:text-sm sm:leading-5'
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
                                             <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                                            </svg>
                                        </span>
                                    Cambiar contraseña
                                </button>

                                <div className="mt-6">
                                    <div className="text-sm leading-5">
                                        <Link href="/entrar">
                                            <a href="/entrar"
                                               className="font-medium text-gray-800 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
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

export default ChangePasswordRecovery;
