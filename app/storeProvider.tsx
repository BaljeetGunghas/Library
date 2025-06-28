"use client";

import ResponsiveNavbar from '@/Components/Navbar/ResponsiveNavBar';
import { AuthProvider } from '../Components/Home/LoginSignup/authContext';
import { store } from '@/redux/store'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import FixedFooterIcons from '@/Components/Footer/Footer';

const StoreProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <AuthProvider >
                <Toaster richColors position="top-center" />
                <ResponsiveNavbar />
                <div
                    className="main_bg"
                    style={{ position: "relative", overflow: "hidden", zIndex: 10 }}
                >
                    {children}
                </div>
                <FixedFooterIcons />
            </AuthProvider>
        </Provider>
    )
}

export default StoreProvider
