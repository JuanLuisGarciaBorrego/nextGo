import React, {Fragment} from 'react';

function LoadingItem() {

    return (
        <Fragment>
            <div className="w-full border-t border-gray-200 block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out p-4">
                <div className="flex items-center">
                    <div className="text-sm leading-5 font-medium truncate h-4 w-1/2 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 animate-pulse"> </div>
                    <div className="ml-2 flex-shrink-0 flex h-4 w-1/6 bg-gray-100 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100 animate-pulse">

                    </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex w-full">
                        <div className="flex h-6 w-full bg-gradient-to-r from-gray-100 via-gray-300 to-gray-200 animate-pulse">
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default LoadingItem;
