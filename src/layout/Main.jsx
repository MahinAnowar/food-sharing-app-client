import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            {/* Navbar would go here */}
            <Outlet />
            {/* Footer would go here */}
        </div>
    );
};

export default Main;
