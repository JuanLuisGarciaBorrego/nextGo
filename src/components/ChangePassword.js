import React, {Fragment} from 'react';
import {Formik, Form, Field} from 'formik';
import {useRouter} from 'next/router';
import {ROUTE_LOGIN_REDIRECT_SUCCESS} from "../constants/routes";
import {FORMS_ERROR_LOGIN} from "../constants/forms";
import {APP_NAME} from "../constants/app";
import Link from "next/link";
import Logo from "./Logo";
import InputPassword from "./Form/InputPassword";
import SERVER_API from "../api/server";
import {useAuthenticated} from "../context/AuthContext";
import {useFlashMessages} from "../context/FlashMessagesContext";
import {FLASH_MESSAGE_SUCCESS} from "../constants/flashMessages";
import SaveOrCancelButtons from "./Form/SaveOrCancelButtons";

function ChangePassword({fixedButton = false}) {
    const {addFlashMessage} = useFlashMessages();

    const initialValues = {
        newPassword: '',
        oldPassword: ''
    };

    // const handleSubmit =  (e) => {
    //     e.preventDefault();
    //     addFlashMessage(FLASH_MESSAGE_SUCCESS, 'Hola', 'descripción de prueba');
    // }

    const handleSubmit = async (values, {setSubmitting, setErrors}) => {

        console.log('kjkkkk')
        return new Promise(async () => {
            setSubmitting(true);
            // try {
            //     const loginResponse = await SERVER_API.security.login(values.email, values.password);
            //     setLogin(loginResponse.data);
            //
            // } catch (e) {
            //     setErrors({
            //         'errorForm': FORMS_ERROR_LOGIN
            //     })
            //
            //     await setSubmitting(false);
            //     return;
            // }
            //
            // await setSubmitting(false);
            // return router.push(ROUTE_LOGIN_REDIRECT_SUCCESS);
        });
    }

    return (
        <Fragment>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}

            >
                {({
                      isSubmitting,
                      handleChange,
                      handleReset,
                      errors
                  }) => {
                    return (
                        <Form className="w-full max-w-screen-md" method="POST">
                            <div className="flex">
                                <div className="mt-2 pt-2 md:mt-4 md:pt-4 w-full">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Cambiar contraseña
                                        </h3>
                                    </div>

                                    <div className="mt-6 grid grid-cols-6 gap-y-4 gap-x-4">

                                        <div className="col-span-6">
                                            <label htmlFor="first_name"
                                                   className="block text-sm font-medium leading-5 text-gray-700">
                                                Contraseña actual
                                            </label>
                                            <div className="mt-1 rounded-md shadow-sm leading-normal">
                                                <InputPassword
                                                    name="oldPassword"
                                                    onChange={handleChange}
                                                    cssInput='p-2 border-solid border border-gray-400 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none'
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6">
                                            <label htmlFor="first_name"
                                                   className="block text-sm font-medium leading-5 text-gray-700">
                                                Nueva contraseña
                                            </label>
                                            <div className="mt-1 rounded-md shadow-sm leading-normal">
                                                <InputPassword
                                                    name="newPassword"
                                                    onChange={handleChange}
                                                    cssInput='p-2 border-solid border border-gray-400 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <SaveOrCancelButtons
                                isSubmitting={isSubmitting}
                                fixedButton={fixedButton}
                                showCancel={false}
                            />
                        </Form>
                    )
                }}
            </Formik>
        </Fragment>
    )
}

export default ChangePassword;
