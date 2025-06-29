import { navLinks } from '@/Constant/constant'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CgClose } from 'react-icons/cg'
import { MdLocalLibrary } from 'react-icons/md'


// define Props type 
type Props = {
    showNav: boolean;
    closeNav: () => void
}


const MobileNaveBar = ({ showNav, closeNav }: Props) => {
    const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]";
    return (
        <>
            <div
                onClick={closeNav}
                className={`fixed inset-0 bg-black ${navOpen} transition-opacity duration-300 ${showNav ? 'opacity-70 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    } z-60`}
            />

            <div className={`${navOpen} text-white transform transition-all duration-500 delay-300  fixed justify-center flex   flex-col h-full w-[80%] sm:w-[60%] secondary_bg space-y-6 z-100  `}>
                {navLinks.map((navLink) => {
                    return (
                        <Link href={navLink.url} key={navLink.id} onClick={closeNav}>
                            <p className='nav__link text-[20px] ml-12  pb-2  sm:text-[30px] '>{navLink.label}</p>
                        </Link>
                    )
                })}
                {/* {close button} */}
                <div className='flex justify-center items-center space-x-0 absolute -top-[.9rem] '>
                    <Image
                        src={"/images/logo.png"}
                        alt="Baljeet gunghas"
                        width={220}
                        height={200}
                        className="-ml-4 sm:-ml-5 filter invert brightness-200 contrast-150 object-cover "
                    />
                    <MdLocalLibrary className="text-white text-4xl -ml-6" />
                </div>
                <CgClose onClick={closeNav} className='absolute top-[1rem] right-[2rem] sm:w-8 sm:h-8 w-6 h-6 text-white cursor-pointer ' />
                {/* </div> */}
            </div>
        </>
    )
}

export default MobileNaveBar