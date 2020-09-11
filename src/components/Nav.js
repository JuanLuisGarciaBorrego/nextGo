import Link from 'next/link';
import {useAuthenticated} from "../context/AuthContext";

export default function Nav() {
    const isAuthenticated = useAuthenticated();
    return (
        <header>
            <Link href="/">
                <a>Home</a>
            </Link>{' - '}


            <Link href="/panel">
                <a>Panel</a>
            </Link>{'-'}
            <hr/>
        </header>
    );
}
