import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useRouter} from "next/router";
import {ROUTE_LOGIN} from "../constants/routes";
import {checkAccessControl} from "../utils";

function WrapperSecurity(Component) {

    return (props) => {
        const {isLogged} = useContext(AuthContext);
        const router = useRouter();

        console.log('loading secure is',  isLogged)

        useEffect(() => {
            console.log('wrapper effect');

            const accessControl = checkAccessControl(router);
            console.log(accessControl);
            // async function init() {
            //     if (!isLogged) {
            //         console.log('no está login redirect');
            //         // return router.push(ROUTE_LOGIN);
            //     }
            // }
            // init();
        }, []);

        if(!isLogged) {
            console.log('no mostrar');
            return <h1>No mostrar</h1>
        }

        console.log('mostrar');
        return (<Component {...arguments} />)
    };
}

export default WrapperSecurity;
