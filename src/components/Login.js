import React, {Fragment, useContext, useState} from 'react';
import {Formik, Form, Field} from 'formik';
import Router from 'next/router';
import API from "../api";
import {updateCookie} from "../utils";
import {COOKIE_AUTH, COOKIE_REFRESH_AUTH} from "../constants/cookies";
import {ROUTE_LOGIN_REDIRECT_SUCCESS} from "../constants/routes";
import {FORMS_ERROR_LOGIN} from "../constants/forms";
import {APP_NAME} from "../constants/app";
import Link from "next/link";
import Logo from "./Logo";
import InputPassword from "./Form/InputPassword";
import SERVER_API from "../api/server";
import {AuthContext} from "../context/AuthContext";

function Login() {
    const {setLogin} = useContext(AuthContext);

    const initialValues = {
        email: '',
        password: ''
    };

    const handleSubmit = async (values, {setSubmitting, setErrors}) => {
        return new Promise(async () => {
            setSubmitting(true);

            try {
                const loginResponse = await SERVER_API.security.login(values.email, values.password);
                setLogin(loginResponse.data);

            } catch (e) {
                setErrors({
                    'errorForm': FORMS_ERROR_LOGIN
                })

                await setSubmitting(false);
                return;
            }

            await setSubmitting(false);
            return Router.push(ROUTE_LOGIN_REDIRECT_SUCCESS);
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
                <h2 className="mt-2 mb-2 text-center text-2xl leading-6 font-extrabold text-gray-900">
                    Entrar
                </h2>
                <h1 className="text-center text-xl leading-tight font-extrabold text-indigo-800">
                    {APP_NAME}
                </h1>
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
                            <input type="hidden" name="remember" value="true"/>
                            <div className="rounded-md shadow-sm">
                                <div>
                                    <Field aria-label="Email" name="email" type="email" required
                                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 focus:z-10 sm:text-sm sm:leading-5"
                                           placeholder="Email"/>
                                </div>
                                <div className="-mt-px">
                                    <InputPassword
                                        name="password"
                                        onChange={handleChange}
                                        cssInput='px-3 py-2 appearance-none rounded-none form-input block w-full pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 focus:z-10 sm:text-sm sm:leading-5'
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <div className="text-sm leading-5">
                                    <Link href="/recuperar-contrasena">
                                        <a href="/recuperar-contrasena"
                                           className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                            ¿Ha olvidado su contraseña?
                                        </a>
                                    </Link>
                                </div>
                                <div className="text-sm leading-5">
                                    <Link href="/">
                                        <a href="/"
                                           className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                            Ir a inicio
                                        </a>
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-2">

                                <div className="mt-4 h-4">
                                    <p className="text-xs font font-italic text-red-500 ">{errors.errorForm}</p>
                                </div>

                                <button type="submit" disabled={isSubmitting && true}
                                        className={`${isSubmitting && 'opacity-50 cursor-not-allowed spinner'} mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out`}>
                                     <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                          <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                               viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </span>
                                    Entrar
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </Fragment>
    )
}

export default Login;
