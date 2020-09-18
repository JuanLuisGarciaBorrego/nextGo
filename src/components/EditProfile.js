import React, {Fragment} from 'react';
import {Formik, Form, Field} from 'formik';
import {useAuthenticated} from "../context/AuthContext";
import {useFlashMessages} from "../context/FlashMessagesContext";
import {FLASH_MESSAGE_ERROR, FLASH_MESSAGE_SUCCESS} from "../constants/flashMessages";
import SaveOrCancelButtons from "./Form/SaveOrCancelButtons";
import API from "../api";
import ErrorFieldForm from "./Form/ErrorFieldForm";

function EditProfile({fixedButton = true}) {
    const {user, token} = useAuthenticated();
    const {addFlashMessage} = useFlashMessages();

    if(user === null) {
        return <></>
    }

    const initialValues = {
        email: user?.email,
        name: user?.name,
        lastName: user?.lastName
    };

    const handleSubmit = async (values, {setSubmitting, setFieldError}) => {
        return new Promise(async () => {
            setSubmitting(true);
            try {
                await API.user.editCurrentUser(token, values.email, values.name, values.lastName);
                addFlashMessage(FLASH_MESSAGE_SUCCESS, 'Cambios guardados', 'Información de su perfil modificada.', false);
            } catch (e) {
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

                                    <div className="mt-6 bg-white shadow sm:rounded p-4">
                                        <div className="grid grid-cols-6 gap-y-4 gap-x-4">
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
                                                <ErrorFieldForm error={errors.name}/>
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
                                                <ErrorFieldForm error={errors.lastName}/>
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
                                                <ErrorFieldForm error={errors.email}/>
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

export default EditProfile;
