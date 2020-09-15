import {Fragment} from "react";
import Link from 'next/link'
import {useAuthenticated} from "../../context/AuthContext";

export default function ItemsNavDropdown() {
    const {handleLogout} = useAuthenticated()
    return (
        <Fragment>
            <div className="py-1">
                <Link href="/panel/cuenta/perfil">
                    <a href="/panel/cuenta/perfil" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Perfil</a>
                </Link>
                <Link href="/panel/cuenta/cambiar-contrasena">
                    <a href="/panel/cuenta/cambiar-contrasena" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Cambiar contraseña</a>
                </Link>
            </div>
            <div className="border-t border-gray-100"> </div>
            {/*<div className="py-1">*/}
            {/*    <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Get desktop app</a>*/}
            {/*    <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Support</a>*/}
            {/*</div>*/}
            <div className="border-t border-gray-100"> </div>
            <div className="py-1">
                <a href="/salir"
                   onClick={(e) => {e.preventDefault(); handleLogout()}}
                   className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Salir</a>
            </div>
        </Fragment>
    );
}
