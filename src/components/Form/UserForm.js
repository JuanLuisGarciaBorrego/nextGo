import React, {Fragment, useState} from "react";
import {Field, Form} from "formik";
import ErrorFieldForm from "./ErrorFieldForm";
import {ROLES} from "../../constants/roles";
import SaveOrCancelButtons from "./SaveOrCancelButtons";
import {bytesToMb} from "../../utils";
import {useFlashMessages} from "../../context/FlashMessagesContext";
import {FLASH_MESSAGE_ERROR, FLASH_MESSAGE_SUCCESS} from "../../constants/flashMessages";
import API from "../../api";
import {useAuthenticated} from "../../context/AuthContext";

export default function UserForm({isSubmitting, handleChange, setFieldValue, values, errors, isEdit = false}) {
    const {token} = useAuthenticated();

    const {addFlashMessage} = useFlashMessages();
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [upload, setUpload] = useState(false);
    const [file, setFile] = useState(values.avatar);
    const [errorUpload, setErrorUpload] = useState('');

    const handleUpload = async (e) => {
        const fileUpload = e.target.files[0];
        if(!fileUpload) {
            return
        }
        if(fileUpload.type.indexOf('image') !== 0) {
            addFlashMessage(FLASH_MESSAGE_ERROR, 'Oops', 'El archivo subido no es una imagen', false);
        }
        if(bytesToMb(fileUpload.size) > 7.0) {
            addFlashMessage(FLASH_MESSAGE_ERROR, 'Oops', 'Imagen demasiado pesada, máximo 7MB', false);
        }

        let reader = new FileReader();
        reader.readAsDataURL(fileUpload);
        reader.onloadstart = () => {
            setUpload(true)
            setErrorUpload('');
        }
        reader.onloadend = async () => {
            // setFieldValue("avatar", reader.result);

            try {
                const formData = new FormData();
                formData.append('file', fileUpload);
                const response = await API.user.uploadAvatar(token, values.uuid, formData);
                setFile(response.data.data.avatar);
                addFlashMessage(FLASH_MESSAGE_SUCCESS, 'Foto subida', 'Foto perfil cambiada');
            } catch (e) {
                if(e.response.status === 400) {
                    setErrorUpload(e.response.data.data.constraints.file[0]);
                }

                addFlashMessage(FLASH_MESSAGE_ERROR, 'Oops', 'Ha ocurrido un error al subir la foto');
            }

            setUpload(false);
        };
    }

    const handleRemove = async(e) => {
        setFieldValue("avatar", "");
        if(!file) {
            return;
        }

        try {
            await API.user.removeAvatar(token, values.uuid);
            setFile(null);
            addFlashMessage(FLASH_MESSAGE_SUCCESS, 'Foto eliminada', 'La foto ha sido eliminada');
        } catch (e) {
            addFlashMessage(FLASH_MESSAGE_ERROR, 'Oops', 'Ha ocurrido un error al eliminar la foto');
        }
    }

    return (
        <Fragment>
            <Form className="w-full max-w-screen-md" method="POST">
                <div className="flex">
                    <div className="w-full">
                        <div className="p-4 rounded bg-white shadow sm:rounded">
                            <div className="grid grid-cols-6 gap-y-4 gap-x-4">
                                <div className="col-span-2">
                                    <label htmlFor="first_name" className="block text-sm font-medium leading-5 text-gray-700">
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
                                    <label htmlFor="lastName" className="block text-sm font-medium leading-5 text-gray-700">
                                        Apellidos
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <Field aria-label="lastName" name="lastName" type="text"
                                               className="p-2 border-solid border border-gray-400 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none"
                                               autoComplete="off"
                                               placeholder="Apellidos"/>
                                    </div>
                                    <ErrorFieldForm error={errors.lastName}/>
                                </div>

                                <div className="col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
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

                                <div className="col-span-3">
                                    <label htmlFor="role" className="block text-sm font-medium leading-5 text-gray-700 whitespace-no-wrap">
                                        Tipo de usuario
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm relative">
                                        <Field name="role" required component="select" className="appearance-none p-2 border-solid border border-gray-400 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none">
                                            <option value="" disabled>Elige una opción</option>
                                            {ROLES.map((item, key) => {
                                                return <option value={item.type} key={key}>{item.name}</option>
                                            })}
                                        </Field>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <ErrorFieldForm error={errors.role}/>
                                </div>

                                <div className="col-span-3">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-5 text-gray-700">
                                        Contraseña
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm leading-normal relative">
                                        <Field name="password"
                                               type={`${showPassword ? 'text' : 'password'}`}
                                               required={!isEdit}
                                               className="p-2 border-solid border border-gray-400 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none"
                                               autoComplete="off"/>
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"  onClick={handleShowPassword}>
                                            <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                                {!showPassword ?
                                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg> :
                                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </svg>
                                                }
                                            </svg>
                                        </div>

                                    </div>
                                    <ErrorFieldForm error={errors.password}/>
                                </div>

                                <div className="col-span-3">
                                    <div className="relative flex items-start">
                                        <div className="absolute flex items-center">
                                            <input id="isActive"
                                                   onChange={handleChange}
                                                   type="checkbox" defaultChecked={values.isActive}
                                                   className="form-checkbox h-4 w-4 text-green-600 transition duration-150 ease-in-out"/>
                                        </div>
                                        <div className="pl-6 text-sm leading-none leading-snug">
                                            <label htmlFor="isActive" className="font-medium text-gray-700">Activar usuario</label>
                                            <p className="text-gray-500">El usuario está activo y puede entrar mediante
                                                sus credenciales </p>
                                        </div>
                                        <ErrorFieldForm error={errors.isActive}/>
                                    </div>
                                </div>

                                <div className="col-span-3">
                                    <div className="relative flex items-start">
                                        <div className="absolute flex items-center">
                                            <input id="sendEmail"
                                                   onChange={handleChange}
                                                   type="checkbox" defaultChecked={values.sendEmail}
                                                   className="form-checkbox h-4 w-4 text-green-600 transition duration-150 ease-in-out"/>
                                        </div>
                                        <div className="pl-6 text-sm leading-none leading-snug">
                                            <label htmlFor="sendEmail" className="font-medium text-gray-700">Notificación</label>
                                            <p className="text-gray-500">Enviar un email al usuario con los datos de
                                                acceso y contraseña.</p>
                                        </div>
                                        <ErrorFieldForm error={errors.sendEmail}/>
                                    </div>
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="photo" className="block text-sm leading-5 font-medium text-gray-700">
                                        Avatar
                                    </label>
                                    <div className="mt-2 flex items-center">
                                        {file &&
                                        <div className={`${upload && 'animate-pulse'} relative border-dashed flex items-center justify-center h-12 w-12`}>
                                            <img alt='avatar' className="absolute h-12 w-12 rounded-full z-0 bg-gray-100" src={file} />
                                            {upload &&
                                            <svg className={`absolute h-4 w-4 z-10 animate-spin`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            }
                                        </div>
                                        }

                                        {!file &&
                                        <span className={`${upload && 'animate-pulse'} h-12 w-12 rounded-full relative flex items-center justify-center overflow-hidden bg-gray-100`}>
                                            {upload &&
                                            <svg className={`absolute h-4 w-4 z-10 animate-spin`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            }
                                            {!upload &&
                                              <svg className="h-full w-full text-indigo-300" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                                              </svg>
                                            }
                                        </span>
                                        }

                                        <span className="ml-2 flex flex-col hover:bg-gray-100 transition duration-150 ease-in-out">
                                            <label className="flex w-full justify-center">
                                                {!upload &&
                                                <input type='file' name="file" className="hidden" onChange={handleUpload}/>
                                                }
                                                <div className="flex-1 text-center">
                                                    <p className={`${upload ? 'opacity-50 cursor-not-allowed spinner' : ' cursor-pointer'} py-1 px-2 flex-1 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out`}>
                                                    Subir foto
                                                    </p>
                                                </div>
                                            </label>
                                        </span>
                                        {file &&
                                        <span className="ml-2 rounded-md shadow-sm">
                                          <button type="button" onClick={handleRemove} className="py-1 px-2 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                                            Eliminar
                                          </button>
                                        </span>
                                        }
                                    </div>
                                    <ErrorFieldForm error={errorUpload}/>
                                </div>

                                {/*<div className="col-span-6">*/}
                                {/*    <label htmlFor="file_upload" className="block text-sm leading-5 font-medium text-gray-700">*/}
                                {/*        Cambiar avatar*/}
                                {/*    </label>*/}
                                {/*    <div className={`border-2 border-gray-300 border-dashed rounded-md flex-1 flex w-full mt-2 flex-col hover:bg-gray-100 transition duration-150 ease-in-out ${upload ? 'opacity-50 cursor-not-allowed spinner' : ' cursor-pointer'}`}>*/}
                                {/*        <label className="flex w-full justify-center">*/}
                                {/*            {!upload &&*/}
                                {/*            <input type='file' name="file" className="hidden" onChange={handleUpload}/>*/}
                                {/*            }*/}
                                {/*            {!upload &&*/}
                                {/*            <div className="flex-1 px-6 pt-8 pb-6 text-center">*/}
                                {/*                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">*/}
                                {/*                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>*/}
                                {/*                </svg>*/}
                                {/*                <p className="mt-1 text-sm text-gray-600">*/}
                                {/*                    <span className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">Subir archivo</span>*/}
                                {/*                </p>*/}
                                {/*                <p className="mt-1 text-xs text-gray-500">*/}
                                {/*                    Formatos PNG, JPG, GIF con un máximo de 7MB*/}
                                {/*                </p>*/}
                                {/*            </div>*/}
                                {/*            }*/}

                                {/*            {upload &&*/}
                                {/*            <div className="flex-1 px-6 pt-8 pb-6 text-center">*/}
                                {/*                <svg className="mx-auto h-12 w-12 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                                {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />*/}
                                {/*                </svg>*/}
                                {/*                <p className="mt-1 text-sm text-gray-600">*/}
                                {/*                    <span className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">Subiendo archivo</span>*/}
                                {/*                </p>*/}
                                {/*                <p className="mt-1 text-xs text-gray-500">*/}
                                {/*                    Puede durar unos segundos*/}
                                {/*                </p>*/}
                                {/*            </div>*/}
                                {/*            }*/}
                                {/*        </label>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>

                            <SaveOrCancelButtons
                                isSubmitting={isSubmitting}
                                showCancel={true}
                                fixedButton={true}
                            />
                        </div>
                    </div>
                </div>
            </Form>
        </Fragment>
    )
}