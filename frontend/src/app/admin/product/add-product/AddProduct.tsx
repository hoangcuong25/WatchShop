'use client';

import { FaUpload } from 'react-icons/fa';
import React, { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
    import ProductEditor from '@/components/Editor';

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

const machineTypes = [
    'Automatic',
    'Quartz',
    'Mechanical',
    'Solar',
    'Kinetic',
];

const styles = [
    'Classic',
    'Modern',
    'Sport',
    'Vintage',
    'Minimalist',
];

const designs = [
    'Round',
    'Square',
    'Rectangle',
    'Oval',
    'Tonneau',
];

const crystals = [
    'Sapphire',
    'Mineral',
    'Hardlex',
    'Acrylic',
    'K1',
];

const faceColors = [
    'Black',
    'White',
    'Blue',
    'Silver',
    'Gold',
];

const stringMaterials = [
    'Stainless Steel',
    'Leather',
    'Rubber',
    'Nylon',
    'Titanium',
];

const caseMaterials = [
    'Stainless Steel',
    'Gold',
    'Titanium',
    'Ceramic',
    'Plastic',
];

const brandOrigins = [
    'Switzerland',
    'Japan',
    'Germany',
    'USA',
    'China',
];

export default function AddProduct() {

    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')

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
                                name="stockQuantity"
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Giá Gốc</label>
                            <input
                                type="text"
                                name="oldPrice"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Giá Mới</label>
                            <input
                                type="text"
                                name="newPrice"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Khuyến Mãi (%)</label>
                            <input
                                type="text"
                                name="discount"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Technical Specifications */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Thông Số Kỹ Thuật</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Loại Máy</label>
                            <select
                                name="machineType"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn loại máy</option>
                                {machineTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Phong Cách</label>
                            <select
                                name="style"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn phong cách</option>
                                {styles.map(style => (
                                    <option key={style} value={style}>{style}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Thiết Kế</label>
                            <select
                                name="design"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn thiết kế</option>
                                {designs.map(design => (
                                    <option key={design} value={design}>{design}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Mặt Kính</label>
                            <select
                                name="crystal"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn mặt kính</option>
                                {crystals.map(crystal => (
                                    <option key={crystal} value={crystal}>{crystal}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Màu Mặt</label>
                            <select
                                name="faceColor"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn màu mặt</option>
                                {faceColors.map(color => (
                                    <option key={color} value={color}>{color}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Chất Liệu Dây</label>
                            <select
                                name="stringMaterial"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn chất liệu dây</option>
                                {stringMaterials.map(material => (
                                    <option key={material} value={material}>{material}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Chất Liệu Vỏ</label>
                            <select
                                name="caseMaterial"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn chất liệu vỏ</option>
                                {caseMaterials.map(material => (
                                    <option key={material} value={material}>{material}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Xuất Xứ</label>
                            <select
                                name="brandOrigin"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn xuất xứ</option>
                                {brandOrigins.map(origin => (
                                    <option key={origin} value={origin}>{origin}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Đường Kính</label>
                            <input
                                type="text"
                                name="diameter"
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Mô Tả</h2>
                    <ProductEditor content={description} setContent={setDescription} />
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