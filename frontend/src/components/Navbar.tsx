'use client';

import { FaHome, FaBars } from 'react-icons/fa';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const menuItems = [
    { label: 'THƯƠNG HIỆU' },
    { label: 'ĐỒNG HỒ NAM' },
    { label: 'ĐỒNG HỒ NỮ' },
    { label: 'ĐỒNG HỒ ĐÔI' },
    { label: 'SỬA ĐỒNG HỒ' },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-[#161a2b]">
            {/* Desktop menu */}
            <ul className="hidden md:flex items-center h-12 px-2">
                <li className="mr-8 flex items-center">
                    <a
                        href="/"
                        className="text-white text-lg flex items-center h-10 border-b-2 border-transparent hover:border-white transition"
                    >
                        <FaHome />
                    </a>
                </li>
                {menuItems.map((item) => (
                    <li key={item.label} className="mr-8">
                        <a
                            href="#"
                            className="text-white text-[15px] font-medium tracking-wide h-10 flex items-center border-b-2 border-transparent hover:border-white transition"
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center h-12 px-4">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <button
                            aria-label="Open menu"
                            className="text-white text-2xl focus:outline-none"
                        >
                            <FaBars />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-[#161a2b] text-white w-64">
                        <div className="flex flex-col space-y-4 mt-8">
                            <a
                                href="/"
                                className="flex items-center space-x-2 text-lg font-semibold hover:text-blue-400"
                                onClick={() => setOpen(false)}
                            >
                                <FaHome />
                                <span>Trang chủ</span>
                            </a>
                            {menuItems.map((item) => (
                                <a
                                    key={item.label}
                                    href="#"
                                    className="text-[16px] font-medium hover:text-blue-400"
                                    onClick={() => setOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
                <span className="ml-3 text-white font-bold text-lg">MENU</span>
            </div>
        </nav>
    );
};

export default Navbar;