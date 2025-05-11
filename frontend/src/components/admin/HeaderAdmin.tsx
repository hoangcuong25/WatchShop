'use client';

import { useState } from 'react';
import { FaBell, FaSearch, FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { LogoutApi } from "@/api/auth.api";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HeaderAdmin() {
    const router = useRouter();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user } = useContext(AppContext);

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Đơn hàng mới",
            message: "Bạn có đơn hàng mới #ORD001",
            time: "5 phút trước",
            read: false,
        },
        {
            id: 2,
            title: "Cập nhật kho",
            message: "Sản phẩm Longines Master đã hết hàng",
            time: "1 giờ trước",
            read: false,
        },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleLogout = async () => {
        await LogoutApi();
        localStorage.removeItem('access_token');
        router.push('/login');
    };

    // Close menus when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.notification-menu') && !target.closest('.notification-trigger')) {
            setIsNotificationOpen(false);
        }
        if (!target.closest('.user-menu') && !target.closest('.user-trigger')) {
            setIsUserMenuOpen(false);
        }
    };

    // Add click outside listener
    useState(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    return (
        <div className="bg-[#0b0d16] text-white">
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold">Admin Dashboard</h1>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden flex-1 max-w-2xl mx-8 lg:block">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="w-full px-4 py-2 pl-10 bg-muted text-foreground rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-xl" />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-6">
                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Notifications */}
                        <div className="relative">
                            <div
                                className="relative cursor-pointer notification-trigger"
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                            >
                                <FaBell className="text-2xl" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {unreadCount}
                                    </span>
                                )}
                            </div>

                            <AnimatePresence>
                                {isNotificationOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2.5 z-50 border border-gray-200 dark:border-gray-700 overflow-hidden notification-menu"
                                    >
                                        <div className="absolute -top-3 left-0 right-0 h-3" />
                                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Thông báo</h3>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className="group px-4 py-3 hover:bg-sky-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out relative"
                                                >
                                                    <div className="absolute inset-0 bg-sky-50/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
                                                    <div className="relative z-10">
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-semibold text-gray-800 dark:text-gray-200">{notification.title}</span>
                                                            <span className="text-xs text-gray-500">{notification.time}</span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* User Menu */}
                        <div className="relative">
                            <div
                                className="flex items-center space-x-2 cursor-pointer user-trigger"
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            >
                                {user?.avatar ? (
                                    <Image src={user.avatar} alt="Avatar" width={32} height={32} className="rounded-full" />
                                ) : (
                                    <FaUser className="text-xl" />
                                )}
                                <span className="hidden md:block font-medium">{user?.name || 'Admin'}</span>
                            </div>

                            <AnimatePresence>
                                {isUserMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2.5 z-50 border border-gray-200 dark:border-gray-700 overflow-hidden user-menu"
                                    >
                                        <div className="absolute -top-3 left-0 right-0 h-3" />
                                        <button className="w-full group flex items-center px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out relative">
                                            <div className="absolute inset-0 bg-sky-50/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
                                            <FaCog className="mr-2 text-gray-700 transition-transform duration-200 group-hover:scale-110 group-hover:text-gray-900 relative z-10" />
                                            <span className="font-medium group-hover:text-gray-900 relative z-10">Cài đặt</span>
                                        </button>
                                        <div className="border-t border-gray-200 dark:border-gray-700 my-1.5"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full group flex items-center px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out relative"
                                        >
                                            <div className="absolute inset-0 bg-sky-50/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
                                            <FaSignOutAlt className="mr-2 text-gray-700 transition-transform duration-200 group-hover:scale-110 group-hover:text-gray-900 relative z-10" />
                                            <span className="font-medium group-hover:text-gray-900 relative z-10">Đăng xuất</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
