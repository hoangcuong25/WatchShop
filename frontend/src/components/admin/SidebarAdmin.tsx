'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaHome,
    FaBox,
    FaShoppingCart,
    FaUsers,
    FaChartBar,
    FaCog,
    FaChevronDown,
    FaChevronRight,
    FaChevronLeft,
    FaBars,
    FaTimes,
} from 'react-icons/fa';

interface MenuItem {
    title: string;
    path: string;
    icon: React.ReactNode;
    submenu?: {
        title: string;
        path: string;
    }[];
}

const menuItems: MenuItem[] = [
    {
        title: 'Dashboard',
        path: '/admin/dashboard',
        icon: <FaHome className="w-5 h-5" />,
    },
    {
        title: 'Sản phẩm',
        path: '/admin/products',
        icon: <FaBox className="w-5 h-5" />,
        submenu: [
            { title: 'Danh sách sản phẩm', path: '/admin/products' },
            { title: 'Thêm sản phẩm', path: '/admin/product/add-product' },
            { title: 'Danh mục', path: '/admin/products/categories' },
        ],
    },
    {
        title: 'Đơn hàng',
        path: '/admin/orders',
        icon: <FaShoppingCart className="w-5 h-5" />,
        submenu: [
            { title: 'Tất cả đơn hàng', path: '/admin/orders' },
            { title: 'Đơn hàng mới', path: '/admin/orders/new' },
            { title: 'Đơn hàng đang xử lý', path: '/admin/orders/processing' },
        ],
    },
    {
        title: 'Khách hàng',
        path: '/admin/customers',
        icon: <FaUsers className="w-5 h-5" />,
    },
    {
        title: 'Báo cáo',
        path: '/admin/reports',
        icon: <FaChartBar className="w-5 h-5" />,
        submenu: [
            { title: 'Doanh thu', path: '/admin/reports/revenue' },
            { title: 'Sản phẩm bán chạy', path: '/admin/reports/top-products' },
            { title: 'Khách hàng', path: '/admin/reports/customers' },
        ],
    },
    {
        title: 'Cài đặt',
        path: '/admin/settings',
        icon: <FaCog className="w-5 h-5" />,
    },
];

export default function SidebarAdmin() {
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleSubmenu = (path: string) => {
        setExpandedItems(prev =>
            prev.includes(path)
                ? prev.filter(item => item !== path)
                : [...prev, path]
        );
    };

    const isActive = (path: string) => pathname === path;
    const isSubmenuActive = (submenu: { path: string }[]) =>
        submenu.some(item => pathname === item.path);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const sidebarContent = (
        <div className={`h-screen bg-white dark:bg-[#0b0d16] text-gray-800 dark:text-white border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
            }`}>
            <div className="p-4">
                <div className="flex items-center justify-between mb-8">
                    {!isCollapsed && <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
                    </button>
                </div>
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <div key={item.path}>
                            <Link
                                href={item.submenu ? '#' : item.path}
                                onClick={() => item.submenu && toggleSubmenu(item.path)}
                                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${isActive(item.path) || (item.submenu && isSubmenuActive(item.submenu))
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    {item.icon}
                                    {!isCollapsed && <span>{item.title}</span>}
                                </div>
                                {!isCollapsed && item.submenu && (
                                    <motion.div
                                        animate={{
                                            rotate: expandedItems.includes(item.path) ? 180 : 0,
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FaChevronDown className="w-4 h-4" />
                                    </motion.div>
                                )}
                            </Link>

                            {!isCollapsed && item.submenu && expandedItems.includes(item.path) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="ml-8 mt-2 space-y-1"
                                >
                                    {item.submenu.map((subItem) => (
                                        <Link
                                            key={subItem.path}
                                            href={subItem.path}
                                            className={`block px-4 py-2 rounded-lg transition-colors ${isActive(subItem.path)
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                }`}
                                        >
                                            {subItem.title}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={toggleMobileMenu}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-[#0b0d16] shadow-md"
            >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Desktop sidebar */}
            <div className="hidden lg:block">
                {sidebarContent}
            </div>

            {/* Mobile sidebar */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden fixed inset-y-0 left-0 z-40"
                    >
                        {sidebarContent}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleMobileMenu}
                />
            )}
        </>
    );
}
