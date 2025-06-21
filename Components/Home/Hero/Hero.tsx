'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginModal } from '../LoginSignup/LoginModal';
import { User } from '@/Components/Navbar/Nav';

const Hero = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    const handleLoginSuccess = (userData: User) => {
        setUser(userData);
        setIsLoginModalOpen(false);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedQuery = query.trim();
        if (trimmedQuery) {
            router.push(`/books?query=${encodeURIComponent(trimmedQuery)}`);
        } else {
            router.push('/books');
        }
    };

    return (
        <section className="relative main_bg bg-cover bg-center bg-no-repeat min-h-screen flex items-center">
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white text-center">
                <span
                    data-aos="fade-down"
                    className="inline-block mb-4 px-4 py-1 rounded-full text-sm sm:text-base md:text-xl font-medium bg-yellow-500 text-black shadow"
                >
                    📖 Access 10,000+ Books Instantly
                </span>

                <h1
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-4xl mx-auto mb-6"
                >
                    Welcome to Your Digital Library
                </h1>

                <p
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-gray-200 mb-8 px-2"
                >
                    Read, learn, and grow with thousands of books, audiobooks, and resources — anytime, anywhere.
                </p>

                <form
                    onSubmit={handleSearch}
                    data-aos="zoom-in"
                    data-aos-delay="300"
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-10 w-full px-2"
                >
                    <input
                        type="text"
                        placeholder="Search books by title, author..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full sm:flex-1 px-4 py-3 bg-white text-black placeholder-gray-500 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg"
                    />

                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300 cursor-pointer"
                    >
                        🔍 Search
                    </button>
                </form>

                <div
                    className="flex flex-wrap justify-center gap-4 px-2"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    <Link
                        href="/categories"
                        className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-base sm:text-lg px-6 py-3 rounded-full shadow-lg transition duration-300"
                    >
                        📚 Browse Library
                    </Link>
                    <button
                        onClick={() => setIsLoginModalOpen(true)}
                        disabled={user?.id ? true : false}
                        className="bg-white cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-300 hover:bg-gray-100 text-black font-semibold text-base sm:text-lg px-6 py-3 rounded-full shadow-lg transition duration-300"
                    >
                        👤 Join Now
                    </button>
                </div>

                <div
                    className="mt-10 text-gray-300 text-sm sm:text-base md:text-lg flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
                    data-aos="fade-up"
                    data-aos-delay="500"
                >
                    <span>✅ Free Membership</span>
                    <span>• ✅ 24/7 Access</span>
                    <span>• ✅ For All Ages</span>
                </div>
            </div>

            {isLoginModalOpen && (
                <LoginModal
                    isOpen={isLoginModalOpen}
                    setIsOpen={setIsLoginModalOpen}
                    onLoginSuccess={handleLoginSuccess} // Pass callback
                />
            )}
        </section>

    );
};

export default Hero;
