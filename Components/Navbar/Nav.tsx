"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import { navLinks } from "@/Constant/constant";
import { MdLocalLibrary } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { LoginModal } from "../Home/LoginSignup/LoginModal";

type Props = {
    openNav: () => void;
};

type User = {
    id: string;
    email: string;
    avatarUrl?: string;
};

const Nav = ({ openNav }: Props) => {
    const [navBg, setNavebg] = useState<boolean>(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = () => {
            if (window.scrollY >= 90) {
                setNavebg(true);
            } else {
                setNavebg(false);
            }
        };

        window.addEventListener("scroll", handler);
        return () => {
            window.removeEventListener("scroll", handler);
        };
    }, []);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Close dropdown if clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        }
        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setDropdownOpen(false);
    };

    const handleLoginSuccess = (userData: User) => {
        setUser(userData);
        setIsLoginModalOpen(false);
    };

    return (
        <div
            className={`fixed h-[12vh] z-[100] ${navBg ? "backdrop-blur-xl bg-black/30" : "fixed bg-transparent"
                } transition-all duration-300 w-full`}
        >
            <div className="flex items-center h-full justify-between w-[95%] sm:w-[90%] xl:w-[80%] mx-auto ">
                <div className="flex justify-center items-center space-x-0">
                    <Image
                        src={"/images/logo.png"}
                        alt="Baljeet gunghas"
                        width={220}
                        height={200}
                        className="-ml-8 sm:-ml-5 filter invert brightness-200 contrast-150 object-cover "
                    />
                    <MdLocalLibrary className="text-white text-4xl -ml-6" />
                </div>

                <div className="flex items-center space-x-5">
                    <div className="hidden lg:flex items-center text-white text-md space-x-8 ">
                        {navLinks.map((navLink) => {
                            return (
                                <Link
                                    href={navLink.url}
                                    key={navLink.id}
                                    className="cursor-pointer"
                                >
                                    <p className="nav__link">{navLink.label}</p>
                                </Link>
                            );
                        })}
                    </div>

                    {/* User Auth Section */}
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                                aria-label="User menu"
                            >
                                {/* Use avatar if available else default icon */}
                                {user.avatarUrl ? (
                                    <Image
                                        src={user.avatarUrl}
                                        alt="User Avatar"
                                        width={40}
                                        height={40}
                                        className="rounded-full object-cover"
                                    />
                                ) : (
                                    <FaUserCircle className="text-white text-4xl" />
                                )}
                                <span className="text-white hidden sm:inline-block truncate max-w-[120px]">
                                    {user.email}
                                </span>
                            </button>

                            {/* Dropdown menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50 py-2">
                                    <Link href={'/reserved-books'} className=" block px-4 py-2 text-gray-700 text-sm cursor-pointer">
                                        Reserved Book
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsLoginModalOpen(true)}
                            className="md:px-10 md:py-3 px-8 py-3 text-blue-700 font-semibold sm:text-base text-sm bg-white hover:bg-gray-200 transition-all duration-200 rounded-lg cursor-pointer"
                        >
                            Login
                        </button>
                    )}

                    <HiBars3BottomRight
                        onClick={openNav}
                        className="w-8 h-8 cursor-pointer text-white lg:hidden"
                    />
                </div>
            </div>

            {isLoginModalOpen && (
                <LoginModal
                    isOpen={isLoginModalOpen}
                    setIsOpen={setIsLoginModalOpen}
                    onLoginSuccess={handleLoginSuccess} // Pass callback
                />
            )}
        </div>
    );
};

export default Nav;
