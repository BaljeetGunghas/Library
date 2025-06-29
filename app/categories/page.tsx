'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { categories } from '@/Data/data';
import Image from 'next/image';

type CategoryIconProps = {
    icon?: string | null;
    color?: string;
};

const CategoryIcon: React.FC<CategoryIconProps> = ({ icon, color }) => {
    if (!icon) return null;

    const isUrl = typeof icon === 'string' && (icon.startsWith('http://') || icon.startsWith('https://'));
    const isFA = typeof icon === 'string' && icon.includes('fa-');

    if (isUrl) {
        return <Image src={icon} alt="category icon" height={10} width={10} className="w-12 h-12 mx-auto mb-4" />;
    } else if (isFA) {
        return <i className={`${icon} text-4xl mx-auto mb-4`} style={{ color }} aria-hidden="true" />;
    } else {
        return <span className="text-5xl block text-center mb-4" style={{ color }}>{icon}</span>;
    }
};

const CategoriesPage = () => {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    return (
        <>
            <div className="absolute inset-0 bg-black/50" />
            <main className="min-h-screen main_bg text-white px-6 py-[8rem]">
                <div className="max-w-6xl mx-auto">
                    <h1
                        className="text-4xl font-bold text-center mb-12"
                        data-aos="fade-up"
                    >
                        Book Categories
                    </h1>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categories.map((cat, index) => (
                            <Link
                                key={cat.id}
                                href={`books?query=${encodeURIComponent(cat.slug)}&page=1`}
                                className="block backdrop-blur-3xl p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-200 hover:border-yellow-400 text-center"
                                data-aos="zoom-in"
                                data-aos-delay={`${index * 100}`}
                            >
                                <CategoryIcon icon={cat.icon} color={cat.color} />
                                <h2 className="text-xl font-semibold mb-2">{cat.name}</h2>
                                <p className="text-sm text-slate-300">{cat.total_books} books</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default CategoriesPage;
