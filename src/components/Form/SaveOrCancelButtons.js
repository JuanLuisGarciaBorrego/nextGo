import React, {Fragment} from 'react';

export default function SaveOrCancelButtons({cancel, isSubmitting, showCancel = true, fixedButton = false}) {
    return (
        <Fragment>
            {fixedButton &&
            <div className="mt-10 md:mt-0"> </div>
            }

            <div className={`${fixedButton ? 'fixed inset-x-0 bottom-0 md:relative p-2 md:p-0 md:mt-8 md:pt-5 bg-white' : 'px-0 py-4 mt-4'} border-t border-gray-200`}>
                <div className="flex justify-between md:inline-flex">
                    {showCancel &&
                      <span className="rounded-md shadow-sm flex-auto md:flex-1 md:inline-flex mr-3">
                        <button type="reset"
                                disabled={isSubmitting && true}
                                onClick={cancel}
                                className={`w-full md:w-auto py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 transition duration-150 ease-in-out ${isSubmitting && 'opacity-50 cursor-not-allowed text-gray-500'} `}>
                          Cancelar
                        </button>
                      </span>
                    }
                    <span className="rounded-md shadow-sm flex-auto md:flex-1 bg-blue-700 md:inline-flex ">
                    <button disabled={isSubmitting && true}
                            type="submit"
                            className={`${isSubmitting && 'opacity-50 cursor-not-allowed'} w-full flex md:w-auto justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out`}>

                        {isSubmitting ?
                            <Fragment>
                                <svg className="animate-spin h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                </svg>
                                Guardando
                            </Fragment> :
                            <Fragment>
                                Guardar
                            </Fragment>
                        }
                    </button>
                  </span>
                </div>
            </div>
        </Fragment>
    )
}
