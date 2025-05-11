'use client';

import { FaUpload } from 'react-icons/fa';

const categories = [
    'Luxury Watches',
    'Sports Watches',
    'Smart Watches',
    'Classic Watches',
    'Diving Watches',
];

const brands = [
    'Rolex',
    'Omega',
    'TAG Heuer',
    'Seiko',
    'Citizen',
    'Casio',
];

export default function AddProduct() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Thêm Sản Phẩm Mới</h1>

            <form className="space-y-8">
                {/* Basic Information */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Thông Tin Cơ Bản</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Tên Sản Phẩm</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Thương Hiệu</label>
                            <select
                                name="brand"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn thương hiệu</option>
                                {brands.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Danh Mục</label>
                            <select
                                name="category"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn danh mục</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Số Lượng</label>
                            <input
                                type="number"
                                name="stock"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                min="0"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Pricing */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Giá</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Giá Gốc</label>
                            <input
                                type="number"
                                name="price"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                min="0"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Giá Khuyến Mãi</label>
                            <input
                                type="number"
                                name="discountPrice"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                min="0"
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Mô Tả</h2>
                    <textarea
                        name="description"
                        className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                        rows={4}
                        required
                    />
                </div>

                {/* Images */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Hình Ảnh</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <label className="flex items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                multiple
                            />
                            <FaUpload className="w-8 h-8 text-gray-400" />
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Thêm Sản Phẩm
                    </button>
                </div>
            </form>
        </div>
    );
}
