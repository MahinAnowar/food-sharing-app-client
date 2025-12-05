import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center">&copy; {currentYear} Food Sharing App. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
