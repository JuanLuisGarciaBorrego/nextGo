import Link from 'next/link';
import {useAuthenticated} from "../context/AuthContext";

export default function Nav() {
    const isAuthenticated = useAuthenticated();
    return (
        <header>
            <Link href="/">
                <a>Home</a>
            </Link>{' - '}

            <Link href="/hola">
                <a>Hola</a>
            </Link>{'-'}

            <Link href="/panel">
                <a>Panel</a>
            </Link>{'-'}

            <Link href="/panel/hola">
                <a>Panel hola</a>
            </Link>
            <hr/>
        </header>
    );
}
