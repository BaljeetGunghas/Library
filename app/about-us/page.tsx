import React from 'react';

const AboutPage = () => {
    return (
        <>
            <div className="absolute inset-0 bg-black/50" />
            <main className="min-h-screen main_bg text-white px-6 py-[8rem]">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                        About Us
                    </h1>

                    <p className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 text-gray-300">
                        Empowering readers through knowledge. Welcome to our digital library — your go-to destination for books, education, and lifelong learning.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Section 1 */}
                        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:shadow-lg transition">
                            <h2 className="text-2xl font-semibold mb-3">📚 Who We Are</h2>
                            <p className="text-gray-200 leading-relaxed">
                                We are a community-driven digital library providing access to thousands of books, audiobooks, and educational resources. Our mission is to make knowledge accessible to everyone, everywhere.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:shadow-lg transition">
                            <h2 className="text-2xl font-semibold mb-3">🎯 Our Mission</h2>
                            <p className="text-gray-200 leading-relaxed">
                                To promote reading, support lifelong learning, and build a bridge between knowledge and curiosity. We aim to connect readers with the right books — one page at a time.
                            </p>
                        </div>

                        {/* Section 3 */}
                        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:shadow-lg transition">
                            <h2 className="text-2xl font-semibold mb-3">💡 What We Offer</h2>
                            <ul className="list-disc list-inside text-gray-200 space-y-1">
                                <li>10,000+ Digital & Physical Books</li>
                                <li>Free Membership</li>
                                <li>24/7 Access to Resources</li>
                                <li>Reading Events & Community Programs</li>
                            </ul>
                        </div>

                        {/* Section 4 */}
                        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:shadow-lg transition">
                            <h2 className="text-2xl font-semibold mb-3">🌍 Join the Journey</h2>
                            <p className="text-gray-200 leading-relaxed">
                                Whether you're a student, educator, or curious reader — there's something for everyone. Explore new topics, revisit classics, and grow with us.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>

    );
};

export default AboutPage;
