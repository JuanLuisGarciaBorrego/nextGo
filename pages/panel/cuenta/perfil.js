import React from "react";
import withAuth from "../../../src/utils/wrapper/withAuth";
import LayoutBase from "../../../src/components/layout/LayoutBase";
import EditProfile from "../../../src/components/EditProfile";

function ProfileAccountPage() {

    return (
        <LayoutBase>
            <div className="px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <EditProfile/>
            </div>
        </LayoutBase>
    )
}

export default withAuth(ProfileAccountPage);
