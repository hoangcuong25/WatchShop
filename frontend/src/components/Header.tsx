'use client';

import Image from "next/image";
import Logo from "@public/logo.png";
import { FaPhone, FaMapMarkerAlt, FaShoppingCart, FaUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

export default function Header() {
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
                                className="w-full px-4 py-2 pl-10 text-gray-900 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-6">
                        {/* Phone */}
                        <div className="hidden md:flex items-center space-x-2 hover:text-blue-500 cursor-pointer">
                            <FaPhone className="text-lg" />
                            <div>
                                <p className="text-sm text-gray-500">Gọi ngay</p>
                                <p className="font-semibold">1900 1234</p>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="hidden md:flex items-center space-x-2 hover:text-blue-500 cursor-pointer">
                            <FaMapMarkerAlt className="text-lg" />
                            <div>
                                <p className="text-sm text-gray-500">Vị trí</p>
                                <p className="font-semibold">Tìm cửa hàng</p>
                            </div>
                        </div>

                        {/* Cart */}
                        <div className="relative hover:text-blue-500 cursor-pointer">
                            <FaShoppingCart className="text-2xl" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                0
                            </span>
                        </div>

                        {/* Login */}
                        <div className="flex items-center space-x-2 hover:text-blue-500 cursor-pointer">
                            <FaUser className="text-xl" />
                            <span className="hidden md:block font-medium">Đăng nhập</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}