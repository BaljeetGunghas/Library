"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaUser, FaLock, FaCheckCircle } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

type Props = {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    onLoginSuccess: (user: { id: string; email: string }) => void; // new callback
};

export const LoginModal = ({ isOpen, setIsOpen, onLoginSuccess }: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    // Simple email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};

        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = () => {
        if (!validate()) return;

        setLoading(true);
        setErrors({});

        setTimeout(() => {
            const user = {
                id: uuidv4(),
                email,
                loggedInAt: new Date().toISOString(),
            };
            localStorage.setItem("user", JSON.stringify(user));
            setSuccessMsg(`Welcome back, ${email}!`);
            onLoginSuccess(user)
            setLoading(false);
            setTimeout(() => {
                setSuccessMsg("");
                setIsOpen(false);
                setEmail("");
                setPassword("");
            }, 2500);
        }, 1000);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl backdrop-blur-2xl p-10 shadow-2xl transition-all relative">
                        <Dialog.Title className="text-3xl font-extrabold text-center text-white mb-6">
                            Sign In
                        </Dialog.Title>

                        {successMsg ? (
                            <div className="flex items-center justify-center text-green-600 space-x-2 text-lg mb-4">
                                <FaCheckCircle className="text-2xl" />
                                <span>{successMsg}</span>
                            </div>
                        ) : (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleLogin();
                                }}
                                className="space-y-6"
                                noValidate
                            >
                                <div className="relative">
                                    <FaUser className="absolute left-4 top-4 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`w-full rounded-xl border px-12 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.email ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                                            }`}
                                        autoFocus
                                        required
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600 pl-12">{errors.email}</p>
                                    )}
                                </div>

                                <div className="relative">
                                    <FaLock className="absolute left-4 top-4 text-gray-400" />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`w-full rounded-xl border px-12 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.password ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                                            }`}
                                        required
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600 pl-12">{errors.password}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-4 text-white font-semibold hover:from-blue-700 hover:to-blue-600 transition ${loading ? "opacity-60 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {loading ? "Logging in..." : "Log In"}
                                </button>
                            </form>
                        )}

                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-5 right-5 rounded-full text-gray-400 hover:text-gray-700 transition text-2xl font-bold"
                            aria-label="Close login modal"
                        >
                            &times;
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    );
}
