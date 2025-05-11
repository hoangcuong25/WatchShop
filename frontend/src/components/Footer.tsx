'use client';

import { FaFacebookF, FaInstagram, FaYoutube, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const socialLinks = [
    { icon: <FaFacebookF />, href: "https://facebook.com", label: "Facebook" },
    { icon: <FaInstagram />, href: "https://instagram.com", label: "Instagram" },
    { icon: <FaYoutube />, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
    return (
        <footer className="bg-[#161a2b] dark:bg-[#10121a] text-white dark:text-gray-200 pt-10 pb-6 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Thông tin liên hệ */}
                <div>
                    <h3 className="text-lg font-bold mb-3">Liên hệ</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-primary" />
                            123 Đường ABC, Quận 1, TP.HCM
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPhoneAlt className="text-primary" />
                            1900 1234
                        </li>
                        <li className="flex items-center gap-2">
                            <FaEnvelope className="text-primary" />
                            support@watchshop.vn
                        </li>
                    </ul>
                </div>

                {/* Về WatchShop */}
                <div>
                    <h3 className="text-lg font-bold mb-3">Về WatchShop</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline">Giới thiệu</a></li>
                        <li><a href="#" className="hover:underline">Chính sách bảo hành</a></li>
                        <li><a href="#" className="hover:underline">Chính sách đổi trả</a></li>
                        <li><a href="#" className="hover:underline">Hướng dẫn mua hàng</a></li>
                    </ul>
                </div>

                {/* Mạng xã hội */}
                <div>
                    <h3 className="text-lg font-bold mb-3">Kết nối với chúng tôi</h3>
                    <div className="flex space-x-4 mt-2">
                        {socialLinks.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition text-xl"
                                aria-label={item.label}
                            >
                                {item.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
                © {new Date().getFullYear()} WatchShop. All rights reserved.
            </div>
        </footer>
    );
}
