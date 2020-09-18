import React, {Fragment, useEffect, useState} from 'react';
import {Formik, Form, Field} from 'formik';
import {useAuthenticated} from "../context/AuthContext";
import {useFlashMessages} from "../context/FlashMessagesContext";
import {FLASH_MESSAGE_ERROR, FLASH_MESSAGE_SUCCESS} from "../constants/flashMessages";
import SaveOrCancelButtons from "./Form/SaveOrCancelButtons";
import API from "../api";
import ErrorFieldForm from "./Form/ErrorFieldForm";
import InputPassword from "./Form/InputPassword";

function ChangePasswordProfile({fixedButton = true}) {
    const {token} = useAuthenticated();
    const {addFlashMessage} = useFlashMessages();

    const initialValues = {
        oldPassword: '',
        newPassword: ''
    };

    const handleSubmit = async (values, {setSubmitting, setFieldError}) => {
        return new Promise(async () => {
            setSubmitting(true);
            try {
                await API.user.changePassword(token, values.oldPassword, values.newPassword);
                addFlashMessage(FLASH_MESSAGE_SUCCESS, 'Cambios guardados', 'Contraseña modificada.', false);
            } catch (e) {
                console.log(e);
                if (e.response.status === 400) {
                    const constraints = e.response.data.data.constraints;
                    const constraintsList = Object.entries(constraints);

                    constraintsList.map((constraint) => {
                        setFieldError(constraint[0], constraint[1][0]);
                    })

                    addFlashMessage(FLASH_MESSAGE_ERROR, 'Oops', 'Revise los datos del formulario.');
                }

                if (e.response.status === 500) {
                    addFlashMessage(FLASH_MESSAGE_ERROR, 'Error desconocido', 'Se ha producido un error, por favor intentelo de nuevo más tarde.', false);
                }

                await setSubmitting(false);
                return;
            }

            await setSubmitting(false);
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
                      onChange,
                      errors
                  }) => {
                    return (
                        <Form className="w-full max-w-screen-md" method="POST">
                            <div className="flex">
                                <div className="w-full">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Cambiar contraseña
                                        </h3>
                                        <p className="mt-1 text-sm leading-5 text-gray-500">
                                            Asegurese que su información sea correcta.
                                        </p>
                                    </div>
                                    <div className="mt-6 bg-white shadow sm:rounded p-4">
                                        <div className="grid grid-cols-6 gap-y-4 gap-x-4">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="oldPassword" className="block text-sm font-medium leading-5 text-gray-700">
                                                    Contraseña actual
                                                </label>
                                                <div className="mt-1 rounded-md shadow-sm leading-normal">
                                                    <InputPassword
                                                        name="oldPassword"
                                                        required
                                                        onChange={handleChange}
                                                        cssInput='p-2 border-solid border border-gray-400 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none'
                                                    />
                                                </div>
                                                <ErrorFieldForm error={errors.oldPassword}/>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="newPassword" className="block text-sm font-medium leading-5 text-gray-700">
                                                    Nueva contraseña
                                                </label>
                                                <div className="mt-1 rounded-md shadow-sm">
                                                    <InputPassword
                                                        name="newPassword"
                                                        required
                                                        onChange={handleChange}
                                                        cssInput='p-2 border-solid border border-gray-400 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none'
                                                    />
                                                </div>
                                                <ErrorFieldForm error={errors.newPassword}/>
                                            </div>
                                        </div>

                                        <SaveOrCancelButtons
                                            isSubmitting={isSubmitting}
                                            showCancel={false}
                                            fixedButton={fixedButton}
                                        />
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

export default ChangePasswordProfile;
