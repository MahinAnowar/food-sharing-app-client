import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { FaUtensils, FaBars, FaTimes } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    };

    const navLinkClasses = ({ isActive }) =>
        `px-4 py-2 rounded-lg transition-all duration-300 font-medium ${isActive
            ? 'bg-green-600 text-white shadow-md'
            : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
        }`;

    const navLinks = (
        <>
            <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
            <li><NavLink to="/available-foods" className={navLinkClasses}>Available Foods</NavLink></li>
        </>
    );

    const authLinks = (
        <>
            <li><NavLink to="/add-food" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Add Food</NavLink></li>
            <li><NavLink to="/my-food-requests" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">My Food Requests</NavLink></li>
            <li><NavLink to="/manage-my-foods" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Manage My Foods</NavLink></li>
        </>
    );

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Brand */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="p-2 bg-green-100 rounded-full">
                                <FaUtensils className="text-green-600 text-xl" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                                Community Foods
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ul className="flex items-center space-x-2">
                            {navLinks}
                        </ul>
                    </div>

                    {/* Right Side: Auth */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring ring-green-500 ring-offset-base-100 ring-offset-2 transition-transform hover:scale-105">
                                    <div className="w-10 rounded-full">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt={user.displayName} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-600 text-xl font-bold">
                                                {user.displayName?.charAt(0) || 'U'}
                                            </div>
                                        )}
                                    </div>
                                </label>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-gray-100">
                                    <li className="menu-title px-4 py-2 border-b border-gray-100">
                                        <span className="text-gray-900 font-semibold truncate block">Hello, {user.displayName}</span>
                                    </li>
                                    {authLinks}
                                    <div className="divider my-1"></div>
                                    <li>
                                        <button onClick={handleLogOut} className="flex items-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-600">
                                            <HiOutlineLogout className="text-lg" /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="px-5 py-2.5 rounded-full font-medium text-green-600 hover:bg-green-50 transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="px-5 py-2.5 rounded-full font-medium bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-green-50 focus:outline-none transition-colors"
                        >
                            {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`md:hidden absolute top-16 left-0 w-full bg-white shadow-lg border-b border-gray-100 transition-all duration-300 origin-top transform ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0 overflow-hidden'}`}>
                <div className="px-4 py-4 space-y-3">
                    <ul className="space-y-2">
                        {navLinks}
                    </ul>
                    <div className="border-t border-gray-100 pt-4">
                        {user ? (
                            <>
                                <div className="flex items-center gap-3 px-4 mb-4">
                                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-green-500">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-600 font-bold">
                                                {user.displayName?.charAt(0) || 'U'}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{user.displayName}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <ul className="space-y-1">
                                    {authLinks}
                                    <li className="mt-2">
                                        <button onClick={handleLogOut} className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg">
                                            <HiOutlineLogout /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <div className="flex flex-col gap-3 px-4">
                                <Link to="/login" className="w-full text-center px-5 py-2.5 rounded-lg border border-green-600 text-green-600 font-medium hover:bg-green-50 transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="w-full text-center px-5 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 shadow-md transition-colors">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
