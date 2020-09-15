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

function EditProfile({fixedButton = true}) {
    const {addFlashMessage} = useFlashMessages();

    const initialValues = {
        email: '',
        name: '',
        lastName: ''
    };

    const handleCancel = (values) => {
        console.log('cancel')
    }

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
                                <div className="w-full">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Información personal
                                        </h3>
                                        <p className="mt-1 text-sm leading-5 text-gray-500">
                                           Asegurese que su información sea correcta.
                                        </p>
                                    </div>

                                    <div className="mt-6 grid grid-cols-6 gap-y-4 gap-x-4">
                                        <div className="col-span-2">
                                            <label htmlFor="first_name"
                                                   className="block text-sm font-medium leading-5 text-gray-700">
                                                Nombre
                                            </label>
                                            <div className="mt-1 rounded-md shadow-sm leading-normal">
                                                <Field aria-label="name" name="name" type="text"
                                                       required
                                                       className="p-2 border-solid border border-gray-400 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none"
                                                       autoComplete="off"
                                                       placeholder="Nombre"/>
                                            </div>
                                        </div>

                                        <div className="col-span-4">
                                            <label htmlFor="last_name"
                                                   className="block text-sm font-medium leading-5 text-gray-700">
                                                Apellidos
                                            </label>
                                            <div className="mt-1 rounded-md shadow-sm">
                                                <Field aria-label="lastName" name="lastName" type="text"
                                                       required
                                                       className="p-2 border-solid border border-gray-400 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none"
                                                       autoComplete="off"
                                                       placeholder="Apellidos"/>
                                            </div>
                                        </div>

                                        <div className="col-span-4">
                                            <label htmlFor="email"
                                                   className="block text-sm font-medium leading-5 text-gray-700">
                                                Email
                                            </label>
                                            <div className="mt-1 rounded-md shadow-sm">
                                                <Field aria-label="email" name="email" type="email"
                                                       required
                                                       className="p-2 border-solid border border-gray-400 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none"
                                                       autoComplete="off"
                                                       placeholder="Email"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <SaveOrCancelButtons
                                isSubmitting={isSubmitting}
                                cancel={handleCancel}
                                showCancel={false}
                                fixedButton={fixedButton}
                            />
                        </Form>
                    )
                }}
            </Formik>
        </Fragment>
    )
}

export default EditProfile;
