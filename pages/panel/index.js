import React from "react";
import {useAuthenticated} from "../../src/context/AuthContext";
import Nav from "../../src/components/Nav";
import withAuth from "../../src/utils/wrapper/withAuth";
import API from "../../src/api";
import LayoutBase from "../../src/components/layout/LayoutBase";

function PanelPage() {

    const {isAuthenticated, token} = useAuthenticated();

    const click = async() => {
        const user = await API.user.currentUser(token);
    }
    return (
        <LayoutBase>
            {/*Page title & actions */}
            <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex-1 min-w-0">
                    <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                        Home
                    </h1>
                </div>
                <div className="mt-4 flex sm:mt-0 sm:ml-4">
                              <span className="order-1 ml-3 shadow-sm rounded-md sm:order-0 sm:ml-0">
                                <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                                  Share
                                </button>
                              </span>
                    <span className="order-0 sm:order-1 sm:ml-3 shadow-sm rounded-md">
                                <button type="button"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:shadow-outline-purple focus:border-purple-700 active:bg-indigo-700 transition duration-150 ease-in-out">
                                  Create
                                </button>
                              </span>
                </div>
            </div>
            {/*Pinned projects */}
            <div className="px-4 mt-6 sm:px-6 lg:px-8">
                <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Pinned Projects</h2>
            </div>
            {/*Projects list (only on smallest breakpoint) */}
            <div className="mt-10 sm:hidden">
                <div className="px-4 sm:px-6">
                    <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Projects</h2>
                </div>
            </div>
            {/*Projects table (small breakpoint and up)*/}
            <div className="hidden mt-8 sm:block">
                <div className="align-middle inline-block min-w-full border-b border-gray-200">

                </div>
            </div>
        </LayoutBase>
    )
}

export default withAuth(PanelPage);
