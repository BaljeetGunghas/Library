"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginRequest, registerRequest } from "@/redux/slices/authSlice";
import { LoginForm, User } from "@/redux/types/user";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, use, useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./authContext";

type Props = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onAuthSuccess: (user: User) => void;
};

const AuthModal = ({ isOpen, setIsOpen, onAuthSuccess }: Props) => {
  const dispatch = useAppDispatch();
  const { user, setUser } = useAuth();

  const { user: USER, error, loading, token } = useAppSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register

  // Shared state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Register only
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateLogin = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required.";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email address.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email address.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  useEffect(() => {
    if (user || USER) {
      setUser(user || USER);
      localStorage.setItem('token', token || 'demo-token');
      toast.success('Login successful!');
      onAuthSuccess(user || USER)
    }
    if (error) {
      toast.error(error);
    }
  }, [user, USER, error]);

  const onLoginSubmit = (data: LoginForm) => {
    if (!validateLogin()) return;
    setErrors({});
    dispatch(loginRequest(data));
  };


  const handleRegister = () => {
    if (!validateRegister()) return;

    setErrors({});
    const payload = {
      name,
      email,
      password,
    }
    dispatch(registerRequest(payload))
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
    setErrors({});
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-5000" onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl backdrop-blur-2xl p-10 shadow-2xl transition-all relative">
            <Dialog.Title className="text-3xl font-extrabold text-center text-white mb-6">
              {isLogin ? "Sign In" : "Register"}
            </Dialog.Title>

            {successMsg ? (
              <div className="flex items-center justify-center text-green-600 space-x-2 text-lg mb-4">
                <FaCheckCircle className="text-2xl" />
                <span>{successMsg}</span>
              </div>
            ) : isLogin ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onLoginSubmit({ email, password });
                }}
                className="space-y-6"
                noValidate
              >
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full rounded-xl border px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.email ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                      }`}
                    autoFocus
                    required
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600 pl-12">{errors.email}</p>}
                </div>

                <div className="relative">
                  <FaLock className="absolute left-4 top-4 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full rounded-xl border px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.password ? "border-red-500" : "border-gray-300 focus:border-blue-500"
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
                  className={`w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 py-4 text-white font-semibold hover:from-purple-700 hover:to-purple-600 border cursor-pointer transition ${loading ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRegister();
                }}
                className="space-y-6"
                noValidate
              >
                <div className="relative">
                  <FaUser className="absolute left-4 top-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full rounded-xl border px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition ${errors.name ? "border-red-500" : "border-gray-300 focus:border-purple-500"
                      }`}
                    autoFocus
                    required
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600 pl-12">{errors.name}</p>}
                </div>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full rounded-xl border px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition ${errors.email ? "border-red-500" : "border-gray-300 focus:border-purple-500"
                      }`}
                    required
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600 pl-12">{errors.email}</p>}
                </div>

                <div className="relative">
                  <FaLock className="absolute left-4 top-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full rounded-xl border px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition ${errors.password ? "border-red-500" : "border-gray-300 focus:border-purple-500"
                      }`}
                    required
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 pl-12">{errors.password}</p>
                  )}
                </div>

                <div className="relative">
                  <FaLock className="absolute left-4 top-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full rounded-xl border px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition ${errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300 focus:border-purple-500"
                      }`}
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 pl-12">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 py-4 text-white font-semibold hover:from-purple-700 hover:to-purple-600 border cursor-pointer transition ${loading ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>
            )}

            <div className="mt-4 text-center text-sm text-gray-300">
              {isLogin ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => {
                      resetForm();
                      setIsLogin(false);
                    }}
                    className="text-purple-400 hover:underline font-semibold cursor-pointer"
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      resetForm();
                      setIsLogin(true);
                    }}
                    className="text-blue-400 hover:underline font-semibold cursor-pointer"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 rounded-full text-black hover:text-gray-700 transition text-xl font-bold cursor-pointer bg-white opacity-80 h-7 w-7 flex justify-center items-center "
              aria-label="Close auth modal"
            >
              &times;
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};



export default AuthModal