import React, {Fragment} from "react";

export default function LoadingForm() {
    return (
        <Fragment>
            <div className="w-full max-w-screen-md">
                <div className="flex">
                    <div className="w-full">
                        <div className="p-4 rounded bg-white shadow sm:rounded">
                            <div className="grid grid-cols-6 gap-y-4 gap-x-4">
                                <div className="col-span-2">
                                    <div className="mt-1 rounded-md shadow-sm leading-normal">
                                        <div className="bg-gradient-to-r from-gray-100 via-gray-200 animate-pulse to-gray-100 p-4 border-solid border border-gray-300 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none"> </div>
                                    </div>
                                </div>

                                <div className="col-span-4">
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <div className="bg-gradient-to-r from-gray-100 via-gray-200 animate-pulse to-gray-100  p-4 border-solid border border-gray-300 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none"> </div>
                                    </div>
                                </div>

                                <div className="col-span-4">
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <div className="bg-gradient-to-r from-gray-100 via-gray-200 animate-pulse to-gray-100  p-4 border-solid border border-gray-300 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none"> </div>
                                    </div>
                                </div>

                                <div className="col-span-3">
                                    <div className="mt-1 rounded-md shadow-sm relative">
                                        <div className="bg-gradient-to-r from-gray-100 via-gray-200 animate-pulse to-gray-100  p-4 border-solid border border-gray-300 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none"> </div>
                                    </div>
                                </div>

                                <div className="col-span-3">
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <div className="bg-gradient-to-r from-gray-100 via-gray-200 animate-pulse to-gray-100  p-4 border-solid border border-gray-300 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none"> </div>
                                    </div>
                                </div>

                                <div className="col-span-3">
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <div className="bg-gradient-to-r from-gray-100 via-gray-200 animate-pulse to-gray-100 p-4 border-solid border border-gray-300 form-input rounded-md block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none"> </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative p-2 mt-8 md:pt-5 bg-white border-t border-gray-200">
                                <div className="flex justify-between md:inline-flex">
                                    <span className="rounded-md shadow-sm flex-auto md:flex-1 md:inline-flex mr-3">
                                        <div className="border-solid border border-gray-300 w-full flex md:w-auto justify-center py-4 px-8 border border-transparent text-sm leading-5 font-medium rounded-md bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 animate-pulse"> </div>
                                    </span>
                                    <span className="rounded-md shadow-sm flex-auto md:flex-1 md:inline-flex">
                                        <div className="border-solid border border-gray-300 w-full flex md:w-auto justify-center py-4 px-12 border border-transparent text-sm leading-5 font-medium rounded-md bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 animate-pulse"> </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
