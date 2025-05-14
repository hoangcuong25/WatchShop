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
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
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

export function Sidebar({ className, isMobileOpen, onMobileClose, ...props }: SidebarProps) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Sidebar content (shared for both mobile and desktop)
    const sidebarContent = (
        <div
            className={cn(
                "h-screen bg-white dark:bg-[#0b0d16] text-gray-800 dark:text-white border-r border-gray-200 dark:border-white/10 transition-all duration-300 flex flex-col w-64 md:relative md:translate-x-0 md:z-0",
                // Mobile: slide in/out
                isMobileOpen ? "fixed inset-y-0 left-0 z-50 translate-x-0" : "-translate-x-full fixed inset-y-0 left-0 z-50 md:translate-x-0 md:relative md:block",
                "md:block", // always block on md+
                className
            )}
            style={{
                transition: 'transform 0.2s',
            }}
            {...props}
        >
            <div className="px-3 py-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                    {!isCollapsed && <h1 className="text-xl font-bold text-gray-900 dark:text-white">Tài khoản</h1>}
                    {/* Only show close button on mobile */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={onMobileClose}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="space-y-4">
                    <div className="py-2">
                        <div className="flex items-center gap-4 py-2">
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
            {/* Overlay for mobile only */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onMobileClose}
                />
            )}
            {/* Sidebar: always render, but only visible on mobile if open, always visible on md+ */}
            {sidebarContent}
        </>
    );
}
