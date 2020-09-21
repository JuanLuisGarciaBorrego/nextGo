import React, {useState, useEffect} from "react";
import withAuth from "../../../src/utils/wrapper/withAuth";
import LayoutBase from "../../../src/components/layout/LayoutBase";
import Link from "next/link";
import API from "../../../src/api";
import {useAuthenticated} from "../../../src/context/AuthContext";
import {useFlashMessages} from "../../../src/context/FlashMessagesContext";
import {FLASH_MESSAGE_ERROR, FLASH_MESSAGE_SUCCESS} from "../../../src/constants/flashMessages";
import {Formik} from "formik";
import UserForm from "../../../src/components/Form/UserForm";
import LoadingForm from "../../../src/components/Form/LoadingForm";
import { useRouter } from 'next/router'
import {whatRoleAmI} from "../../../src/utils";


function EditUserPage() {
    const {token} = useAuthenticated();
    const router = useRouter();
    const {addFlashMessage} = useFlashMessages();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        async function getData() {
            const { uuid } = router.query
            const response = await API.user.show(token, uuid);
            const result = response.data.data;

            setData({
                uuid: result.uuid,
                email: result.email,
                name: result.name,
                lastName: result.lastName,
                role: whatRoleAmI(result.roles),
                password: '',
                isActive: result.active,
                sendEmail: false,
                avatar: result.avatar
            })

            setLoading(false);
        }

        getData();
    },[]);

    const handleSubmit = async (values, {setSubmitting, setFieldError}) => {
        return new Promise(async () => {
            setSubmitting(true);

            try {
                await API.user.edit(token, values.uuid, values.email, values.name, values.lastName, values.password, values.role, values.isActive, values.sendEmail);
                addFlashMessage(FLASH_MESSAGE_SUCCESS, 'Datos guardados', 'Usuario creado', false);

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
        <LayoutBase>
            <Link href="/panel/usuarios">
                <a className="flex items-center text-sm px-4 text-gray-600 flex sm:px-6 lg:px-8 mt-2 sm:mt-4">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                    </svg>
                    Usuarios
                </a>
            </Link>

            <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 mt-2 sm:mt-4">
                <div className="w-full max-w-6xl">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Editar usuario
                    </h3>

                    <div className="pt-6">

                        {loading && <LoadingForm/>}
                        {!loading &&
                        <Formik
                            initialValues={data}
                            onSubmit={handleSubmit}
                        >
                            {({
                                  isSubmitting,
                                  handleChange,
                                  errors,
                                  values,
                                  setFieldValue
                              }) => {
                                return (
                                    <UserForm  isSubmitting={isSubmitting} handleChange={handleChange} handleSubmit={handleSubmit} values={values} errors={errors} setFieldValue={setFieldValue} isEdit={true}/>
                                )
                            }}
                        </Formik>
                        }
                    </div>
                </div>
            </div>

        </LayoutBase>
    )
}

export default withAuth(EditUserPage);
