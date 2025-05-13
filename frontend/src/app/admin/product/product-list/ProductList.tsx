'use client';

import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProductList() {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Danh Sách Sản Phẩm</h1>
                <button
                    onClick={() => router.push('/admin/product/add-product')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                    <FaPlus /> Thêm Sản Phẩm
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên hoặc thương hiệu..."
                    className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                />
            </div>

            {/* Product Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Hình Ảnh</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tên Sản Phẩm</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Thương Hiệu</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Giá</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tồn Kho</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="relative h-16 w-16">
                                    <Image
                                        src="/placeholder.png"
                                        alt="Product"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">Tên sản phẩm</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-500 dark:text-gray-300">Thương hiệu</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-500 dark:text-gray-300">
                                    <span className="text-red-500 font-medium">1.000.000đ</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-500 dark:text-gray-300">10</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                >
                                    <FaEdit className="w-5 h-5" />
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-900"
                                >
                                    <FaTrash className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <nav className="flex items-center gap-2">
                    <button
                        className="px-3 py-1 rounded-lg border dark:border-gray-600"
                    >
                        Trước
                    </button>
                    <button
                        className="px-3 py-1 rounded-lg bg-blue-500 text-white"
                    >
                        1
                    </button>
                    <button
                        className="px-3 py-1 rounded-lg border dark:border-gray-600"
                    >
                        Sau
                    </button>
                </nav>
            </div>
        </div>
    );
}
