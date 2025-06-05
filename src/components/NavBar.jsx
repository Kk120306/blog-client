import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { Menu, X } from 'lucide-react';
import { Link } from "react-router-dom";

const NavBar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const authNavItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'All Posts', path: '/posts' },
    ];

    const guestNavItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'All Posts', path: '/posts' },
        { name: 'Sign in', path: '/signin' },
        { name: 'Sign up', path: '/signup' },
    ];

    const navItems = isAuthenticated ? authNavItems : guestNavItems;
    const linkClasses = 'relative text-sm after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sky-500 hover:after:w-full';


    return (
        <nav className="bg-black text-white p-4 pr-6">
            <div className="flex items-center justify-between">
                <Link to="/">
                    <div className="border-l-4 h-14 pl-3">
                        <h3 className="text-lg font-bold">Blog</h3>
                        <p className="text-sm mt-1">Insights<span className="font-bold text-blue-400">.</span></p>
                    </div>
                </Link>

                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <ul className="hidden md:flex space-x-6">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link to={item.path} className={linkClasses}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    {isAuthenticated && <li key="signout">
                        <button onClick={() => {
                            logout();
                        }}>Sign out</button>
                    </li>}
                </ul>
            </div>

            {isOpen && (
                <ul className="md:hidden mt-4 space-y-3">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                className="text-sm hover:underline"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    {isAuthenticated && <li key="signout">
                        <button onClick={() => {
                            logout();
                            setIsOpen(false);
                        }}>Sign out</button>
                    </li>}
                </ul>
            )}
        </nav>
    );
};

export default NavBar;