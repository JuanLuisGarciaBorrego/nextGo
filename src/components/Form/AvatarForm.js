import React, {Fragment, useCallback, useState} from "react";
import ErrorFieldForm from "./ErrorFieldForm";
import Modal from "../Modal";
import Cropper from "react-easy-crop";
import API from "../../api";
import {FLASH_MESSAGE_ERROR, FLASH_MESSAGE_SUCCESS} from "../../constants/flashMessages";
import {bytesToMb, getCroppedImg} from "../../utils";
import {useFlashMessages} from "../../context/FlashMessagesContext";
import {useAuthenticated} from "../../context/AuthContext";

export default function AvatarForm({userUuid, avatar = null, currentUser = false}) {
    const {addFlashMessage} = useFlashMessages();
    const {token, changeAvatar} = useAuthenticated();

    const [upload, setUpload] = useState(false);
    const [file, setFile] = useState(avatar);
    const [img, setImg] = useState(null);
    const [errorUpload, setErrorUpload] = useState('');

    const handleRemove = async (e) => {
        // setFieldValue("avatar", "");
        if (!file) {
            return;
        }

        try {
            await API.user.removeAvatar(token, userUuid);
            setFile(null);
            addFlashMessage(FLASH_MESSAGE_SUCCESS, 'Foto eliminada', 'La foto ha sido eliminada');
            if(currentUser) {
                changeAvatar(null)
            }
        } catch (e) {
            addFlashMessage(FLASH_MESSAGE_ERROR, 'Oops', 'Ha ocurrido un error al eliminar la foto');
        }
    }

    const [crop, setCrop] = useState({x: 0, y: 0})
    const [zoom, setZoom] = useState(1.0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const showCroppedImage = useCallback(async () => {
        setUpload(true);
        const cropped = await getCroppedImg(
            img,
            croppedAreaPixels
        )
        try {
            const newImage = new File([cropped], 'avatar.jpg');
            const formData = new FormData();
            formData.append('file', newImage);

            const response = await API.user.uploadAvatar(token, userUuid, formData);
            setFile(response.data.data.avatar);
            addFlashMessage(FLASH_MESSAGE_SUCCESS, 'Foto subida', 'Foto perfil cambiada');

            if(currentUser) {
                changeAvatar(response.data.data.avatar)
            }

        } catch (e) {
            if (e.response.status === 400) {
                setErrorUpload(e.response.data.data.constraints.file[0]);
            }
            addFlashMessage(FLASH_MESSAGE_ERROR, 'Oops', 'Ha ocurrido un error al subir la foto');
        }

        setOpen(false);
        setUpload(false);

    }, [croppedAreaPixels])

    const [isOpen, setOpen] = useState(false);

    const openModal = async (e) => {
        const fileUpload = e.target.files[0];

        if (!fileUpload) {
            return
        }

        if (fileUpload.type.indexOf('image') !== 0) {
            addFlashMessage(FLASH_MESSAGE_ERROR, 'Oops', 'El archivo subido no es una imagen', false);
            return;
        }
        if (bytesToMb(fileUpload.size) > 7.0) {
            addFlashMessage(FLASH_MESSAGE_ERROR, 'Oops', 'Imagen demasiado pesada, máximo 7MB', false);
            return;
        }
        setImg(URL.createObjectURL(fileUpload));
        setOpen(true);
    }

    return (
        <Fragment>
            <Modal
                isOpen={isOpen}
                className='w-full  sm:max-w-lg sm:w-full'
                handleClose={() => setOpen(false)}
            >
                <div
                    className="align-bottom bg-white rounded-lg px-4 py-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-lg sm:w-full sm:p-4"
                    role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="sm:flex sm:items-start z-50 bg-white">
                        <div className="w-full bg-gray-500 h-40 sm:h-64 z-50 relative">
                            <Cropper
                                image={img}
                                crop={crop}
                                zoom={zoom}
                                aspect={1 / 1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}

                            />
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:ml-3 flex items-center flex-col sm:flex-row">
                        <span className="flex w-full sm:flex-1 sm:mr-3">
                            <div className="slidecontainer">
                                <input type="range" min={1} max={3} step={0.1} value={zoom}
                                       onChange={e => setZoom(e.target.value)}
                                       className="slider" aria-labelledby="Zoom"/>
                            </div>
                        </span>

                        <span className="flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto mt-2 sm:mt-0">
                          <button type="button" onClick={() => setOpen(false)}
                                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-gray-300 focus:shadow-outline-gray transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Cancelar
                          </button>
                        </span>

                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto sm:mr-2 mt-2 sm:mt-0">
                          <button type="button" onClick={showCroppedImage}
                                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Guardar
                          </button>
                        </span>
                    </div>
                </div>
            </Modal>

            <div className="flex items-center">
                {file &&
                <div className={`${upload && 'animate-pulse'} relative border-dashed flex items-center justify-center h-12 w-12`}>
                    <img alt='avatar'
                         className="absolute h-12 w-12 rounded-full z-0 bg-gray-100"
                         src={file}/>
                    {upload &&
                    <svg className={`absolute h-4 w-4 z-10 animate-spin`} fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    }
                </div>
                }

                {!file &&
                <span
                    className={`${upload && 'animate-pulse'} h-12 w-12 rounded-full relative flex items-center justify-center overflow-hidden bg-gray-100`}>
                                            {upload &&
                                            <svg className={`absolute h-4 w-4 z-10 animate-spin`} fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                            </svg>
                                            }
                    {!upload &&
                    <svg className="h-full w-full text-indigo-300" fill="currentColor"
                         viewBox="0 0 24 24">
                        <path
                            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                    }
                                        </span>
                }

                <span className="ml-2 flex flex-col hover:bg-gray-100 transition duration-150 ease-in-out">
                                            <label className="flex w-full justify-center">
                                                {!upload &&
                                                <input type='file' name="file" className="hidden" onChange={openModal}/>
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
        </Fragment>
    )
}
