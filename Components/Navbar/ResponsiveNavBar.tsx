"use client";

import React, { useState } from 'react'
import MobileNaveBar from './MobileNavBar';
import { Nav } from './Nav';

const ResponsiveNavbar = () => {
    const [showNav, setShowNav] = useState<boolean>(false);

    const showNavHandler = () => setShowNav(true);
    const closeNavHandler = () => setShowNav(false);

    return (
        <div className='relative z-50'>
            <Nav openNav={showNavHandler} />
            {showNav && <MobileNaveBar showNav={showNav} closeNav={closeNavHandler} />}
        </div>
    )
}

export default ResponsiveNavbar