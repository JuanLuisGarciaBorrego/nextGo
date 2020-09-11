import React from "react";
import {useAuthenticated} from "../../src/context/AuthContext";
import Nav from "../../src/components/Nav";
import withAuth from "../../src/utils/wrapper/withAuth";
import API from "../../src/api";

function PanelPage() {

    const {isAuthenticated, token} = useAuthenticated();

    const click = async() => {
        const user = await API.user.currentUser(token);
    }
    return (
        <div>
            <Nav/>
            Panel

            - <div className="text-red-600" onClick={click}>quien soy</div>
        </div>
    )
}

export default withAuth(PanelPage);
