import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { FaUtensils, FaBars, FaTimes } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
                            <div className="relative z-50">
                                <div
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="btn btn-ghost btn-circle avatar ring ring-green-500 ring-offset-base-100 ring-offset-2 transition-transform hover:scale-105 cursor-pointer"
                                >
                                    <div className="w-10 rounded-full">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt={user.displayName} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-600 text-xl font-bold">
                                                {user.displayName?.charAt(0) || 'U'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 top-14 w-60 bg-white rounded-xl shadow-2xl p-2 border border-gray-100 transition-all origin-top-right z-50">
                                        <div className="px-4 py-3 border-b border-gray-100 mb-2 bg-gray-50 rounded-t-lg">
                                            <span className="text-gray-900 font-semibold truncate block">Hello, {user.displayName}</span>
                                            <span className="text-xs text-gray-500 truncate block">{user.email}</span>
                                        </div>
                                        <ul className="space-y-1" onClick={() => setIsDropdownOpen(false)}>
                                            <li><NavLink to="/add-food" className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors">Add Food</NavLink></li>
                                            <li><NavLink to="/my-food-requests" className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors">My Food Requests</NavLink></li>
                                            <li><NavLink to="/manage-my-foods" className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors">Manage My Foods</NavLink></li>

                                            <div className="my-2 border-t border-gray-100"></div>

                                            <li>
                                                <button onClick={handleLogOut} className="w-full text-left flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-medium">
                                                    <HiOutlineLogout className="text-lg" /> Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
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

            {/* Mobile Menu Overlay / Drawer */}
            <div className={`fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>

            <div className={`fixed top-0 right-0 z-[100] h-screen w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ backgroundColor: '#ffffff' }}>
                <div className="flex justify-end p-4">
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-green-600">
                        <FaTimes className="text-2xl" />
                    </button>
                </div>
                <div className="px-6 py-4 space-y-4">
                    <ul className="space-y-3">
                        <li><NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `block font-medium text-lg ${isActive ? 'text-green-600' : 'text-gray-700'}`}>Home</NavLink></li>
                        <li><NavLink to="/available-foods" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `block font-medium text-lg ${isActive ? 'text-green-600' : 'text-gray-700'}`}>Available Foods</NavLink></li>
                    </ul>
                    <div className="pt-2">
                        {user ? (
                            <div className="border-t border-gray-200 pt-4">
                                <div className="bg-gray-50 rounded-xl p-4 mb-4 flex items-center gap-3 border border-gray-100">
                                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-green-500 flex-shrink-0">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-600 font-bold text-lg">
                                                {user.displayName?.charAt(0) || 'U'}
                                            </div>
                                        )}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-semibold text-gray-800 truncate">{user.displayName}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                </div>
                                <ul className="space-y-3 px-1">
                                    <li><NavLink to="/add-food" onClick={() => setIsMobileMenuOpen(false)} className="block font-medium text-gray-700 hover:text-green-600 transition-colors">Add Food</NavLink></li>
                                    <li><NavLink to="/my-food-requests" onClick={() => setIsMobileMenuOpen(false)} className="block font-medium text-gray-700 hover:text-green-600 transition-colors">My Food Requests</NavLink></li>
                                    <li><NavLink to="/manage-my-foods" onClick={() => setIsMobileMenuOpen(false)} className="block font-medium text-gray-700 hover:text-green-600 transition-colors">Manage My Foods</NavLink></li>
                                    <li className="pt-4 border-t border-gray-100 mt-2">
                                        <button onClick={() => { handleLogOut(); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium w-full">
                                            <HiOutlineLogout className="text-xl" /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-5 py-3 rounded-xl border border-green-600 text-green-600 font-bold hover:bg-green-50 transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-5 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 shadow-md transition-colors">
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
