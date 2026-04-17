import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Shared/Footer';
import RedBot from '../Component/AIChatBot/RedBot';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
            <RedBot></RedBot>
        </div>
    );
};

export default RootLayout;