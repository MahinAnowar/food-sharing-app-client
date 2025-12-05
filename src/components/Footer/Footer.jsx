import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaUtensils, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-gray-800 rounded-full group-hover:bg-green-600 transition-colors duration-300">
                                <FaUtensils className="text-green-500 group-hover:text-white text-xl transition-colors duration-300" />
                            </div>
                            <span className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                                Community Foods
                            </span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed max-w-xs">
                            Connecting communities through food sharing. Reduce waste, share love, and make a difference one meal at a time.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                                <FaFacebook className="text-lg" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                                <FaTwitter className="text-lg" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                                <FaInstagram className="text-lg" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                                <FaLinkedin className="text-lg" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6 border-b border-gray-700 pb-2 inline-block">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="hover:text-green-500 transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/available-foods" className="hover:text-green-500 transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                    Available Foods
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="hover:text-green-500 transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="hover:text-green-500 transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6 border-b border-gray-700 pb-2 inline-block">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded bg-gray-800 flex items-center justify-center flex-shrink-0 text-green-500">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Headquarters</p>
                                    <p className="text-sm">123 Road, Unknown City</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded bg-gray-800 flex items-center justify-center flex-shrink-0 text-green-500">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Phone</p>
                                    <p className="text-sm">+880111111111</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded bg-gray-800 flex items-center justify-center flex-shrink-0 text-green-500">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Email</p>
                                    <p className="text-sm">support@communityfoods.com</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-gray-950 py-6 border-t border-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} <span className="text-green-500 font-medium">Community Foods</span>. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
