'use client';

import ContactForm from '@/Components/Contact/ContactForm';
import React, { useState } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // You can integrate Resend, Nodemailer, or any backend API here
    };

    return (
        <main className="min-h-screen main_bg text-white px-6 py-[8rem]">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Contact Us</h1>
                <p className="text-center text-gray-300 mb-12 text-base sm:text-lg">
                    Got a question, opportunity, or just want to say hi? Fill out the form below — we’d love to hear from you!
                </p>

                <ContactForm />
            </div>
        </main>
    );
};

export default ContactPage;
