'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    User,
    ShoppingCart,
    Gift,
    Heart,
    Package,
    HelpCircle,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    user?: {
        name: string;
        email: string;
        avatar?: string;
    };
}

const menuItems = [
    {
        title: "Thông tin cá nhân",
        href: "/profile",
        icon: User,
    },
    {
        title: "Giỏ hàng",
        href: "/cart",
        icon: ShoppingCart,
    },
    {
        title: "Tích điểm",
        href: "/points",
        icon: Gift,
    },
    {
        title: "Sản phẩm yêu thích",
        href: "/favorites",
        icon: Heart,
    },
    {
        title: "Đơn hàng của tôi",
        href: "/orders",
        icon: Package,
    },
    {
        title: "Hỏi đáp",
        href: "/faq",
        icon: HelpCircle,
    },
];

const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder-avatar.jpg"
};

export function Sidebar({ className, ...props }: SidebarProps) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const sidebarContent = (
        <div className={cn(
            "h-screen bg-white dark:bg-[#0b0d16] text-gray-800 dark:text-white border-r border-gray-200 dark:border-white/10 overflow-y-auto transition-all duration-300",
            isCollapsed ? "w-20" : "w-64",
            className
        )} {...props}>
            <div className="p-4">
                <div className="flex items-center justify-between mb-8">
                    {!isCollapsed && <h1 className="text-xl font-bold text-gray-900 dark:text-white">Tài khoản</h1>}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    >
                        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="px-3 py-2">
                        <div className="flex items-center gap-4 px-4 py-2">
                            <Avatar className="h-12 w-12 border-2 border-gray-200 dark:border-white/20">
                                <AvatarImage src={user?.avatar} />
                                <AvatarFallback className="text-lg bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white">
                                    {user?.name?.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            {!isCollapsed && (
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">{user?.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-white/60">{user?.email}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="px-3 py-2">
                        <div className="space-y-1">
                            {menuItems.map((item) => (
                                <Button
                                    key={item.href}
                                    variant={pathname === item.href ? "default" : "ghost"}
                                    className={cn(
                                        "w-full justify-start",
                                        pathname === item.href
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                                    )}
                                    asChild
                                >
                                    <Link href={item.href}>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {!isCollapsed && item.title}
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="px-3 py-2">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            {!isCollapsed && "Đăng xuất"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={toggleMobileMenu}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-[#0b0d16] text-gray-900 dark:text-white shadow-md"
            >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
