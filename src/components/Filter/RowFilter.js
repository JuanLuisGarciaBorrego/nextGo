import React, {Fragment, useState} from 'react';
import {Transition} from "@tailwindui/react";

export default function RowFilter({data, expand = true, removeFilter, onChangeFilter}) {
    const [show, setShow] = useState(expand);

    return(
        <div className="">
            <div onClick={() => setShow(!show)} className="py-3 px-4 sm:px-6 flex justify-between hover:bg-gray-100 transition ease-in-out duration-150 cursor-pointer border-l-2 border-white hover:border-indigo-700">
                <div className="block text-gray-800">
                    <div className="text-sm font-medium leading-5 ">{data.title}</div>
                    {data.valueDefined !== '' &&
                        <div className="inline-flex items-center px-1 py-1 rounded-full text-xs font-medium leading-none bg-gray-200 text-gray-600">
                            {data.valueDefined}
                        </div>
                    }
                </div>
                <div>
                    {!show ?
                        <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>:
                        <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    }
                </div>
            </div>
            <Transition
                show={show}
                enter="transition ease-out duration-150"
                enterFrom="transform opacity-0"
                enterTo="transform opacity-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0"
                className="px-4 sm:px-6"
            >
                <p className="pt-2 text-sm leading-5 text-gray-500">{data.description}</p>
                <div className="py-2">

                    {data.type === 'radio' &&
                        <Fragment>
                            {data.group.map((item, key) => <div className="flex items-center" key={key}>
                                <input
                                    onChange={(e) => {
                                        return onChangeFilter(e, {
                                            type: data.type,
                                            data: data,
                                            subData: item,
                                        })
                                    }}
                                    id={item.id} name={data.name} value={item.value} checked={item.checked} type="radio" className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                                <label htmlFor={item.id} className="ml-3">
                                    <span className="block text-sm leading-5 font-medium text-gray-700">{item.label}</span>
                                </label>
                            </div>)}
                        </Fragment>
                    }

                    {data.type === 'text' &&
                        <Fragment>
                            <input id={data.name}
                                   onChange={(e) => {
                                       return onChangeFilter(e, {
                                           type: 'text',
                                           data: data
                                       })
                                   }}
                                   value={data.valueDefined}
                                   className="block w-full p-4 py-2 border leading-5 text-gray-700 placeholder-gray-700 focus:outline-none focus:bg-white focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"
                                   placeholder={data.attr.placeholder} type={data.attr.type} autoComplete={data.attr.autoComplete ? 'on': 'off'}/>
                        </Fragment>
                    }

                    <p className="mt-2 text-xs leading-5 text-indigo-500 cursor-pointer" onClick={() => removeFilter(data)}>
                        Borrar
                    </p>
                </div>
            </Transition>
        </div>
    )
}
