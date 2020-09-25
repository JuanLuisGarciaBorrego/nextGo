import React, {useState, useEffect, Fragment} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {Transition} from "@tailwindui/react";
import {Field} from "formik";
import Modal from "../src/components/Modal";
import ModalBasicChildren from "../src/components/ModalBasicChildren";

export default function DemoPage() {
    const [items, setItems] = useState([
        {
            uuid: "1",
            data: {
                title: 'Titulo bla bla',
                description: 'jasjdfalsdfalsfasdf',
                img: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=760&h=650&q=80',

            }
        },
        {
            uuid: "2",
            data: {
                title: null,
                description: null,
                img: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=800&h=800&q=80',
            }
        },
        {
            uuid: "3",
            data: {
                title: null,
                description: null,
                img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=780&h=725&q=80'
            }
        },
        {
            uuid: "4",
            data: {
                title: null,
                description: null,
                img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=450&h=450&q=80'
            }
        }
    ]);

    useEffect(() => {
        const itemsWithCheckedProperty = items.map(e => {
            return {
                ...e,
                checked: false
            }
        });

        setItems(itemsWithCheckedProperty);
        setTotalChecked(0);
    }, [])

    const [totalChecked, setTotalChecked] = useState(0);

    const onSortEnd = ({oldIndex, newIndex}) => {
        setItems(arrayMove(items, oldIndex, newIndex));
    };

    const handleChecked = (e, item) => {
        let totalItemsChecked = totalChecked;
        const update = items.map((el) => {
                if(el.uuid === item.uuid) {
                    if(e.target.checked){
                        totalItemsChecked ++;
                    }else{
                        totalItemsChecked --;
                    }
                    return {
                        ...item,
                        checked: e.target.checked
                    }
                }

                return el;
        });

        setItems(update);
        setTotalChecked(totalItemsChecked);
    };

    const [view, setView] = useState(false);
    const [viewData, setViewData] = useState(null);

    const toggleView = async(e, item = null) => {
        setView(!view);

        if(item) {
            setViewData(item);
        }
    }

    const handleRemove = () => {
        console.log('remove items checked');
    }

    const [isSure, setIsSure] = useState(false);


    const Item = SortableElement(({item }) => {
        return <div className="first:col-span-2 first:row-span-2 flex relative cursor-move focus-visible:underline group rounded-md z-10" >
            <div className="flex justify-center items-center w-full h-full z-0 rounded-md inset-0 group text-center" >
                <img className="rounded-md absolute z-0 group-hover:opacity-50" src={item.data.img} alt="" onClick={(e) => toggleView(e, item)}/>
                <svg className="relative z-10 h-6 w-6 text-gray-600 opacity-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={(e) => toggleView(e, item)}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
            </div>
            <div className={`z-20 self-start justify-self-auto absolute p-1 text-red ${!item.checked && 'opacity-0' } group-hover:opacity-100 transition duration-500 ease-in-out`}>
                <input className="leading-tight cursor-pointer absolute p-2" type="checkbox" defaultChecked={item.checked} onChange={(e) => handleChecked(e, item)} />
            </div>
        </div>}
    );

    const List = SortableContainer(({items}) => {

        return (
            <div className="relative bg-white overflow-hidden p-4 z-0">
                <div className="flex justify-between items-center pb-4">

                    {totalChecked === 0 ? <h3 className="text-sm sm:text-md font-medium text-gray-900">
                        Imágenes
                    </h3>:
                        <Fragment>
                            <p className="text-sm sm:text-md font-medium text-gray-900">{totalChecked} imágenes seleccionados</p>
                            <p className="text-xs truncate text-red-500 hover:text-red-700 flex items-center cursor-pointer" onClick={() => setIsSure(true)}>
                                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span className="hidden sm:block">Eliminar imágenes</span>
                            </p>
                        </Fragment>
                    }
                </div>

                <div className="relative">
                    <div className="absolute w-full">
                        <div className="grid gap-2 grid-cols-4 sm:grid-cols-5 box-grid bg-white ">
                            {items.map((item, key) => <div key={key} className="bg-gray-200 first:col-span-2 first:row-span-2 flex rounded-md"> </div>)}
                        </div>
                    </div>

                    <div className="grid gap-2 grid-cols-4 sm:grid-cols-5 box-grid bg-white">
                        {items.map((item, key) => {
                            return <Item key={item.uuid} index={key} item={item}/>
                        })}
                        <div className="z-0 group text-center flex relative border-dashed border-2 rounded-md hover:border-gray-400 transition duration-150 ease-in-out ">
                            <span className="text-gray-500 group-hover:text-gray-600 mx-auto self-center font-medium leading-none p-2 text-sm text-center focus:outline-none focus:underline cursor-pointer">
                                 <svg className="mx-auto text-center h-8 w-8 sm:h-12 sm:w-12 text-gray-300 group-hover:text-gray-400 " stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className="hidden sm:block font-normal block text-xs">Seleccione o suelte las imágenes aquí </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <Fragment>
            <Transition show={view}>
                <div className="fixed inset-0 overflow-hidden z-40">
                    <Transition.Child
                        show={view.toString()}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="absolute inset-0 overflow-hidden bg-gray-600 bg-opacity-75 transition-opacity"
                        onClick={toggleView}
                    >
                        <></>
                    </Transition.Child>

                    <section className="absolute inset-y-0 right-0 max-w-full flex pl-10 sm:pl-16">
                        <Transition.Child
                            show={view.toString()}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                            className="w-screen max-w-md"
                        >
                            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-md sm:text-lg leading-none font-medium text-gray-900">
                                            Vista previa
                                        </h2>
                                        <div className="flex items-center">
                                            <button onClick={toggleView}
                                                    aria-label="Close panel" className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150">
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-full flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <div className="relative max-h-64">
                                            <img className="h-auto w-full" src={viewData?.data?.img} alt=""/>
                                        </div>
                                        <div className="px-4 flex flex-col">
                                            <div className="space-y-4">
                                                <p className="text-xs text-gray-500 leading-snug">
                                                    Mejora el posicionamiento web de tus imágenes, añade un título y una breve descripción utilizando sus palabras clave para que tengas un mayor impacto en los resultados de búsqueda.
                                                </p>
                                            </div>
                                            <div className="mt-4">
                                                <input name="title"
                                                       placeholder="Título de la imágen" autoComplete="Off" maxLength="70"
                                                       defaultValue={viewData?.data?.title}
                                                       className="italic tpy-1 text-xs text-gray-600 border-solid border-b border-gray-400 form-input rounded-sm block w-full transition duration-150 ease-in-out outline-none" />
                                            </div>
                                            <div className="mt-4">
                                                <input name="description"
                                                       placeholder="Breve descripción de la imagen de la imágen" autoComplete="Off" maxLength="120"
                                                       defaultValue={viewData?.data?.description}
                                                       className="italic tpy-1 text-xs text-gray-600 border-solid border-b border-gray-400 form-input rounded-sm block w-full transition duration-150 ease-in-out outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex p-2 space-x-2 flex bottom-0 justify-end">
                                        <span className="rounded-md shadow-sm">
                                          <button type="button" className="py-2 px-2 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                                                Cancelar
                                          </button>
                                        </span>
                                        <span className="rounded-md shadow-sm">
                                          <button type="submit" className="inline-flex justify-center py-2 px-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                            Guardar
                                          </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </section>
                </div>
            </Transition>

            <Modal isOpen={isSure} handleClose={() => setIsSure(false)} className='w-full sm:max-w-lg sm:w-full'>
                <ModalBasicChildren
                    ico={<svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>}
                    title="¿Estás seguro de eliminar la imagen?"
                    description="Esta acción no puede deshacerse"
                    acceptTitle="Eliminar"
                    acceptAction={handleRemove}
                    cancelAction={() => setIsSure(false)}
                />
            </Modal>

            <div className="max-w-2xl bg-gray-200 p-4 z-0">
                <List items={items} onSortEnd={onSortEnd} axis="xy" lockAxis="xy" hideSortableGhost={true} helperClass="opacity-50" distance={1}/>
            </div>
        </Fragment>
    )
}
