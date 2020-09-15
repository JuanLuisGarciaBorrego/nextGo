import React from "react";
import withAuth from "../../../src/utils/wrapper/withAuth";
import LayoutBase from "../../../src/components/layout/LayoutBase";
import EditProfile from "../../../src/components/EditProfile";
import Link from 'next/link'

function ProfileAccountPage() {

    return (
        <LayoutBase>
            <Link href="/panel">
                <a className="flex items-center text-sm px-4 text-gray-600 flex sm:px-6 lg:px-8 mt-2 sm:mt-4">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Perfil
                </a>
            </Link>

            <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 mt-2 sm:mt-4">
                <EditProfile/>
            </div>
        </LayoutBase>
    )
}

export default withAuth(ProfileAccountPage);
