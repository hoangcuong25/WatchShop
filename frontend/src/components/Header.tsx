'use client';

import Image from "next/image";
import Logo from "@public/logo.png";
import { FaPhone, FaMapMarkerAlt, FaShoppingCart, FaUser, FaSignInAlt, FaUserPlus, FaCog } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { ThemeToggle } from "./theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { AppContext } from "@/context/AppContext";
import { LogoutApi } from "@/api/auth.api";
import { useRouter } from "next/navigation";
export default function Header() {

    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    const { user } = useContext(AppContext);

    const handleLogout = async () => {
        await LogoutApi();
        localStorage.removeItem('access_token');
        router.push('/login');
    }

    return (
        <div className="bg-[#0b0d16] text-white">
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Image src={Logo} alt="Logo" width={120} height={40} className="h-10 w-auto" />
                    </div>

                    {/* Search Bar */}
                    <div className="hidden flex-1 max-w-2xl mx-8 lg:block">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="w-full px-4 py-2 pl-10 bg-muted dark:bg-gray-800 text-foreground rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-xl" />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-6">
                        {/* Phone */}
                        <div className="hidden md:flex items-center space-x-2 cursor-pointer">
                            <FaPhone className="text-lg" />
                            <div>
                                <p className="text-sm text-muted-foreground">Gọi ngay</p>
                                <p className="font-semibold">1900 1234</p>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="hidden md:flex items-center space-x-2 cursor-pointer">
                            <FaMapMarkerAlt className="text-lg" />
                            <div>
                                <p className="text-sm text-muted-foreground">Vị trí</p>
                                <p className="font-semibold">Tìm cửa hàng</p>
                            </div>
                        </div>

                        {/* Cart */}
                        <div className="relative cursor-pointer">
                            <FaShoppingCart className="text-2xl" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                0
                            </span>
                        </div>

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Login with Dropdown */}
                        {
                            !user ?
                                <div
                                    className="relative"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <div className="flex items-center space-x-2 cursor-pointer">
                                        <FaUser className="text-xl" />
                                        <span className="hidden md:block font-medium">Đăng nhập</span>
                                    </div>

                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2.5 z-50 border border-gray-200 dark:border-gray-700 overflow-hidden"
                                            >
                                                <div className="absolute -top-3 left-0 right-0 h-3" />
                                                <Link href="/login" className="group flex items-center px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out relative">
                                                    <div className="absolute inset-0 bg-sky-50/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
                                                    <FaSignInAlt className="mr-2 text-gray-700 transition-transform duration-200 group-hover:scale-110 group-hover:text-gray-900 relative z-10" />
                                                    <span className="font-medium group-hover:text-gray-900 relative z-10">Đăng nhập</span>
                                                </Link>
                                                <Link href="/register" className="group flex items-center px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out relative">
                                                    <div className="absolute inset-0 bg-sky-50/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
                                                    <FaUserPlus className="mr-2 text-gray-700 transition-transform duration-200 group-hover:scale-110 group-hover:text-gray-900 relative z-10" />
                                                    <span className="font-medium group-hover:text-gray-900 relative z-10">Đăng ký</span>
                                                </Link>
                                                <div className="border-t border-gray-200 dark:border-gray-700 my-1.5"></div>
                                                <div className="group flex items-center px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out cursor-pointer relative">
                                                    <div className="absolute inset-0 bg-sky-50/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
                                                    <FcGoogle className="mr-2 text-xl transition-transform duration-200 group-hover:scale-110 relative z-10" />
                                                    <span className="font-medium group-hover:text-gray-900 relative z-10">Đăng nhập với Google</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                :
                                <div
                                    className="relative"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <div className="flex items-center space-x-2 cursor-pointer">
                                        <Image src={user?.avatar} alt="Avatar" width={32} height={32} className="rounded-full" />
                                        <span className="hidden md:block font-medium">{user?.name}</span>
                                    </div>

                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2.5 z-50 border border-gray-200 dark:border-gray-700 overflow-hidden"
                                            >
                                                <div className="absolute -top-3 left-0 right-0 h-3" />
                                                <Link href="/profile" className="group flex items-center px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out relative">
                                                    <div className="absolute inset-0 bg-sky-50/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
                                                    <FaUser className="mr-2 text-gray-700 transition-transform duration-200 group-hover:scale-110 group-hover:text-gray-900 relative z-10" />
                                                    <span className="font-medium group-hover:text-gray-900 relative z-10">Tài khoản</span>
                                                </Link>
                                                <Link href="/orders" className="group flex items-center px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out relative">
                                                    <div className="absolute inset-0 bg-sky-50/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
                                                    <FaShoppingCart className="mr-2 text-gray-700 transition-transform duration-200 group-hover:scale-110 group-hover:text-gray-900 relative z-10" />
                                                    <span className="font-medium group-hover:text-gray-900 relative z-10">Đơn hàng</span>
                                                </Link>
                                                {user?.role === 'ADMIN' && (
                                                    <Link href="/admin/dashboard" className="group flex items-center px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out relative">
                                                        <div className="absolute inset-0 bg-sky-50/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
                                                        <FaCog className="mr-2 text-gray-700 transition-transform duration-200 group-hover:scale-110 group-hover:text-gray-900 relative z-10" />
                                                        <span className="font-medium group-hover:text-gray-900 relative z-10">Quản trị</span>
                                                    </Link>
                                                )}
                                                <div className="border-t border-gray-200 dark:border-gray-700 my-1.5"></div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full group flex items-center px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out relative"
                                                >
                                                    <div className="absolute inset-0 bg-sky-50/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
                                                    <FaSignInAlt className="mr-2 text-gray-700 transition-transform duration-200 group-hover:scale-110 group-hover:text-gray-900 relative z-10" />
                                                    <span className="font-medium group-hover:text-gray-900 relative z-10">Đăng xuất</span>
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}