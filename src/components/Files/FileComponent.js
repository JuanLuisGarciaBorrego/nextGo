import React, {useState, useEffect, Fragment, useCallback} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {Transition} from "@tailwindui/react";
import {Field} from "formik";
import Modal from "./../Modal";
import ModalBasicChildren from "./../ModalBasicChildren";
import {useDropzone} from 'react-dropzone';
import PreviewFile from "./PreviewFile";

export default function FileComponent({elements = [], title, titleSelected, removeTitle, uploadTitle, uploadOnDrogTitle, handleOnSortEnd, fetchRemove, seo = true}) {
    const [items, setItems] = useState(elements);

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
        const order = arrayMove(items, oldIndex, newIndex);
        setItems(order)
        handleOnSortEnd(order);
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

    const handleRemoveChecked = () => {
        const itemsChecked = items.filter((item) => {
            if(item.checked) {
                delete item['checked'];
                return item;
            }
        });

        // fetchRemove
    }

    const [isSure, setIsSure] = useState(false);

    const Item = SortableElement(({item }) => {
        return <div className="first:col-span-2 first:row-span-2 flex relative cursor-move focus-visible:underline group rounded-md z-10" >
            <div className="flex justify-center items-center w-full h-full z-0 rounded-md inset-0 group text-center" >
                <img className="rounded-md absolute z-0 group-hover:opacity-50" src={item.path} alt="" onClick={(e) => toggleView(e, item)}/>
                <svg className="relative z-10 h-6 w-6 text-gray-600 opacity-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={(e) => toggleView(e, item)}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
            </div>
            <div className={`z-20 self-start justify-self-auto absolute p-1 text-red ${!item.checked && 'opacity-0' } group-hover:opacity-100 transition duration-500 ease-in-out`}>
                <input className="leading-tight cursor-pointer absolute p-2" type="checkbox" defaultChecked={item.checked} onChange={(e) => handleChecked(e, item)} />
            </div>
        </div>}
    );

    const List = SortableContainer(({elements}) => {
        const onDrop = useCallback(acceptedFiles => {
            console.log(acceptedFiles)
            // Do something with the files
        }, []);

        const onDropRejected = useCallback((rejectedFiles) => {
            console.log('0',rejectedFiles)
        }, []);
        const {getRootProps, getInputProps, isDragActive} = useDropzone({maxFiles: 2, onDrop, onDropRejected})


        return (
            <div className="relative bg-white overflow-hidden p-4 z-0">
                <div className="flex justify-between items-center pb-4">

                    {totalChecked === 0 ? <h3 className="text-sm sm:text-md font-medium text-gray-900">{title}</h3>
                        : <Fragment>
                            <p className="text-sm sm:text-md font-medium text-gray-900">{totalChecked} {titleSelected}</p>
                            <p className="text-xs truncate text-red-500 hover:text-red-700 flex items-center cursor-pointer" onClick={() => setIsSure(true)}>
                                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span className="hidden sm:block">{removeTitle}</span>
                            </p>
                        </Fragment>
                    }
                </div>

                <div className="relative">
                    <div className="absolute w-full">
                        <div className="grid gap-2 grid-cols-4 sm:grid-cols-5 box-grid bg-white ">
                            {elements.map((item, key) => <div key={key} className="bg-gray-200 first:col-span-2 first:row-span-2 flex rounded-md"> </div>)}
                        </div>
                    </div>

                    <div className="grid gap-2 grid-cols-4 sm:grid-cols-5 box-grid bg-white">
                        {elements.map((item, key) => {
                            return <Item key={item.uuid} index={key} item={item}/>
                        })}
                        <div {...getRootProps()} className="z-0 group text-center flex relative border-dashed border-2 rounded-md hover:border-gray-400 transition duration-150 ease-in-out focus:outline-none">
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <span className="text-gray-500 group-hover:text-gray-600 mx-auto self-center font-medium leading-none p-2 text-sm text-center focus:outline-none focus:underline cursor-pointer">
                                         <svg className="mx-auto animate-bounce text-center h-8 w-8 sm:h-12 sm:w-12 text-gray-300 group-hover:text-gray-400 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <span className="hidden sm:block font-normal block text-xs">{uploadOnDrogTitle}</span>
                                    </span> :
                                    <span className="text-gray-500 group-hover:text-gray-600 mx-auto self-center font-medium leading-none p-2 text-sm text-center focus:outline-none focus:underline cursor-pointer">
                                         <svg className="mx-auto text-center h-8 w-8 sm:h-12 sm:w-12 text-gray-300 group-hover:text-gray-400 " stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span className="hidden sm:block font-normal block text-xs">{uploadTitle} </span>
                                    </span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <Fragment>
            <PreviewFile
                view={view}
                seo={seo}
                toggleView={toggleView}
                viewData={viewData}
            />

            <Modal isOpen={isSure} handleClose={() => setIsSure(false)} className='w-full sm:max-w-lg sm:w-full'>
                <ModalBasicChildren
                    ico={<svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>}
                    title="¿Estás seguro de eliminar la imagen?"
                    description="Esta acción no puede deshacerse"
                    acceptTitle="Eliminar"
                    acceptAction={handleRemoveChecked}
                    cancelAction={() => setIsSure(false)}
                />
            </Modal>

            <List elements={items} onSortEnd={onSortEnd} axis="xy" lockAxis="xy" hideSortableGhost={true} helperClass="opacity-50" distance={1} onRemove={() => console.log('remove')}/>
        </Fragment>
    )
}
