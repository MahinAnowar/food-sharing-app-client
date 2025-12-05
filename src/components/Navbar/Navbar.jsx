import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error));
    };

    const navLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-blue-500" : ""}>Home</NavLink></li>
            <li><NavLink to="/available-foods" className={({ isActive }) => isActive ? "text-blue-500" : ""}>Available Foods</NavLink></li>
        </>
    );

    const privateNavLinks = (
        <>
            <li><NavLink to="/add-food" className={({ isActive }) => isActive ? "text-blue-500" : ""}>Add Food</NavLink></li>
            <li><NavLink to="/manage-my-foods" className={({ isActive }) => isActive ? "text-blue-500" : ""}>My Foods</NavLink></li>
            <li><NavLink to="/my-food-requests" className={({ isActive }) => isActive ? "text-blue-500" : ""}>My Food Requests</NavLink></li>
        </>
    );

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <img className="h-8 w-8" src="/logo.svg" alt="Logo" />
                        </Link>
                        <div className="hidden md:block">
                            <ul className="ml-10 flex items-baseline space-x-4">
                                {navLinks}
                                {user && privateNavLinks}
                            </ul>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        {user ? (
                            <div className="ml-4 flex items-center md:ml-6">
                                <div className="ml-3 relative">
                                    <div>
                                        <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-8 w-8 rounded-full" src={user.photoURL || "/placeholder.jpg"} alt="User" />
                                        </button>
                                    </div>
                                    {isProfileMenuOpen && (
                                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-600 hover:text-blue-500">Login</Link>
                                <Link to="/register" className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium">Register</Link>
                            </div>
                        )}
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <span className="sr-only">Open main menu</span>
                            {/* Icon for mobile menu */}
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks}
                        {user && privateNavLinks}
                    </ul>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        {user ? (
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full" src={user.photoURL || "/placeholder.jpg"} alt="" />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-gray-800">{user.displayName}</div>
                                    <div className="text-sm font-medium leading-none text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="px-2 space-y-1">
                                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Login</Link>
                                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Register</Link>
                            </div>
                        )}
                         {user && (
                            <div className="mt-3 px-2 space-y-1">
                                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
