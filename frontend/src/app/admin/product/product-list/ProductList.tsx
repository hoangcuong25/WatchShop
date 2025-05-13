'use client';

import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';

export default function ProductList() {
    const router = useRouter();
    const {
        products,
        currentPage,
        totalPages,
        isLoading,
        fetchProducts
    } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brandName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            fetchProducts(newPage);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Quản Lý Sản Phẩm</h1>
                <button
                    onClick={() => router.push('/admin/product/add-product')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                    <FaPlus className="text-lg" /> Thêm Sản Phẩm Mới
                </button>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Tìm kiếm theo tên hoặc thương hiệu..."
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <button className="bg-gray-100 dark:bg-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2">
                        <FaFilter /> Bộ Lọc
                    </button>
                </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                            {/* Product Image */}
                            <div className="relative aspect-square w-full">
                                <Image
                                    src={product.imageUrls[0]}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm">
                                    -{product.discount}%
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                    {product.brandName}
                                </p>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                            {product.oldPrice}
                                        </span>
                                        <span className="text-lg font-bold text-green-600">
                                            {product.newPrice}
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Còn: {product.stockQuantity}
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => router.push(`/admin/product/edit/${product.id}`)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        <FaEdit className="w-5 h-5" />
                                    </button>
                                    <button
                                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        <FaTrash className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Trước
                    </button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i)}
                                className={`px-4 py-2 rounded-lg ${currentPage === i
                                    ? 'bg-blue-600 text-white'
                                    : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    } transition-colors`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Sau
                    </button>
                </nav>
            </div>
        </div>
    );
}
