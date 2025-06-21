'use client';

import React, { useEffect } from 'react';
import ContactForm from '@/Components/Contact/ContactForm';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactPage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <main className="min-h-screen main_bg text-white px-6 py-[8rem]">
            <div className="max-w-4xl mx-auto">
               <h1
                        className="text-4xl font-bold text-center mb-12"
                        data-aos="fade-up"
                    >
                    Contact Us
                </h1>

                <p
                    className="text-center text-gray-300 mb-12 text-base sm:text-lg"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Got a question, opportunity, or just want to say hi? Fill out the form below — we’d love to hear from you!
                </p>

                <div data-aos="fade-up" data-aos-delay="200">
                    <ContactForm />
                </div>
            </div>
        </main>
    );
};

export default ContactPage;
