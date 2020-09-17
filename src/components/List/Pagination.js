import React, {Fragment} from 'react';

function Pagination({info, totalItem, handlePreviousPage, handleNextPage}) {
    if(totalItem === 0) {
        return (
            <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <p className="text-sm leading-5 text-gray-700">
                    Sin resultados
                </p>
            </nav>
        )
    }

    return (
        <Fragment>
            {info.page &&
            <nav
                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:block">
                    <p className="text-sm leading-5 text-gray-700">
                        {info.page === 1 ?
                            <Fragment><span className="font-medium">1</span> a <span className="font-medium">{totalItem}</span> de <span className="font-medium">{info.total}</span> resultados</Fragment>:
                            <Fragment><span className="font-medium">{(info.page - 1) * totalItem + 1}</span> a <span className="font-medium">{info.page * totalItem}</span> de <span className="font-medium">{info.total}</span> resultados</Fragment>
                        }

                    </p>
                </div>
                <div className="flex-1 flex justify-between sm:justify-end">
                    <button
                        type="button"
                        disabled={!info.previous}
                        onClick={handlePreviousPage}
                        className={`${!info.previous && 'opacity-50 cursor-not-allowed'} relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}>
                        Previous
                    </button>
                    <button type="button"
                            disabled={!info.next}
                            onClick={handleNextPage}
                            className={`${!info.next && 'opacity-50 cursor-not-allowed'} ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}>
                        Next
                    </button>
                </div>
            </nav>
            }
        </Fragment>
    )
}

export default Pagination;
