'use client';

import { FaUpload } from 'react-icons/fa';
import React, { useContext, useState } from 'react'
import ProductEditor from '@/components/Editor';
import { AppContext } from '@/context/AppContext';
import { categories, styles, designs, faceColors, stringMaterials, caseMaterials, brandOrigins } from './Data';
import { createProductApi } from '@/api/Product.api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TrashIcon } from 'lucide-react';
interface ProductState {
    productName: string;
    description: string;
    stockQuantity: string;
    oldPrice: string;
    newPrice: string;
    discount: string;
    machineTypeId: string;
    style: string;
    design: string;
    crystalId: string;
    faceColor: string;
    stringMaterial: string;
    caseMaterial: string;
    brandId: string;
    category: string;
    diameter: string;
    brandOrigin: string;
}

export default function AddProduct() {
    const router = useRouter();
    const { brands, machineTypes, crystals } = useContext(AppContext);

    const [product, setProduct] = useState<ProductState>({
        productName: '',
        description: '',
        stockQuantity: '',
        oldPrice: '',
        newPrice: '',
        discount: '',
        machineTypeId: '',
        style: '',
        design: '',
        crystalId: '',
        faceColor: '',
        stringMaterial: '',
        caseMaterial: '',
        brandId: '',
        category: '',
        diameter: '',
        brandOrigin: ''
    });

    const [images, setImages] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleProductChange = (field: keyof ProductState, value: string) => {
        setProduct(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const validateForm = () => {
        if (!product.productName) {
            toast.error('Vui lòng nhập tên sản phẩm');
            return false;
        }
        if (!product.description) {
            toast.error('Vui lòng nhập mô tả sản phẩm');
            return false;
        }
        if (!product.stockQuantity) {
            toast.error('Vui lòng nhập số lượng');
            return false;
        }
        if (!product.oldPrice) {
            toast.error('Vui lòng nhập giá gốc');
            return false;
        }
        if (!product.newPrice) {
            toast.error('Vui lòng nhập giá mới');
            return false;
        }
        if (!product.discount) {
            toast.error('Vui lòng nhập giảm giá');
            return false;
        }
        if (!product.brandId) {
            toast.error('Vui lòng chọn thương hiệu');
            return false;
        }
        if (!product.category) {
            toast.error('Vui lòng chọn danh mục');
            return false;
        }
        if (!product.crystalId) {
            toast.error('Vui lòng chọn mặt kính');
            return false;
        }
        if (images.length === 0) {
            toast.error('Vui lòng tải lên ít nhất một hình ảnh');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setIsSubmitting(true);
            await createProductApi(product, images);
            toast.success('Thêm sản phẩm thành công');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi thêm sản phẩm');
        } finally {
            setIsSubmitting(false);
        }
    };

    console.log(product);

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
                                value={product.productName}
                                onChange={(e) => handleProductChange('productName', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Thương Hiệu</label>
                            <select
                                name="brand"
                                value={product.brandId}
                                onChange={(e) => handleProductChange('brandId', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn thương hiệu</option>
                                {brands.map(brand => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Danh Mục</label>
                            <select
                                name="category"
                                value={product.category}
                                onChange={(e) => handleProductChange('category', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn danh mục</option>
                                {categories.map(category => (
                                    <option key={category.value} value={category.value}>{category.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Số Lượng</label>
                            <input
                                type="number"
                                name="stockQuantity"
                                value={product.stockQuantity}
                                onChange={(e) => handleProductChange('stockQuantity', e.target.value)}
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
                                value={product.oldPrice}
                                onChange={(e) => handleProductChange('oldPrice', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Giá Mới</label>
                            <input
                                type="text"
                                name="newPrice"
                                value={product.newPrice}
                                onChange={(e) => handleProductChange('newPrice', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Khuyến Mãi (%)</label>
                            <input
                                type="text"
                                name="discount"
                                value={product.discount}
                                onChange={(e) => handleProductChange('discount', e.target.value)}
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
                                value={product.machineTypeId}
                                onChange={(e) => handleProductChange('machineTypeId', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn loại máy</option>
                                {machineTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Phong Cách</label>
                            <select
                                name="style"
                                value={product.style}
                                onChange={(e) => handleProductChange('style', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn phong cách</option>
                                {styles.map(style => (
                                    <option key={style.value} value={style.value}>{style.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Thiết Kế</label>
                            <select
                                name="design"
                                value={product.design}
                                onChange={(e) => handleProductChange('design', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn thiết kế</option>
                                {designs.map(design => (
                                    <option key={design.value} value={design.value}>{design.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Mặt Kính</label>
                            <select
                                name="crystal"
                                value={product.crystalId}
                                onChange={(e) => handleProductChange('crystalId', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn mặt kính</option>
                                {crystals.map(crystal => (
                                    <option key={crystal.id} value={crystal.id}>{crystal.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Màu Mặt</label>
                            <select
                                name="faceColor"
                                value={product.faceColor}
                                onChange={(e) => handleProductChange('faceColor', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn màu mặt</option>
                                {faceColors.map(color => (
                                    <option key={color.value} value={color.value}>{color.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Chất Liệu Dây</label>
                            <select
                                name="stringMaterial"
                                value={product.stringMaterial}
                                onChange={(e) => handleProductChange('stringMaterial', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn chất liệu dây</option>
                                {stringMaterials.map(material => (
                                    <option key={material.value} value={material.value}>{material.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Chất Liệu Vỏ</label>
                            <select
                                name="caseMaterial"
                                value={product.caseMaterial}
                                onChange={(e) => handleProductChange('caseMaterial', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn chất liệu vỏ</option>
                                {caseMaterials.map(material => (
                                    <option key={material.value} value={material.value}>{material.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Xuất Xứ</label>
                            <select
                                name="brandOrigin"
                                value={product.brandOrigin}
                                onChange={(e) => handleProductChange('brandOrigin', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                                <option value="">Chọn xuất xứ</option>
                                {brandOrigins.map(origin => (
                                    <option key={origin.value} value={origin.value}>{origin.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Đường Kính</label>
                            <input
                                type="text"
                                name="diameter"
                                value={product.diameter}
                                onChange={(e) => handleProductChange('diameter', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Mô Tả</h2>
                    <ProductEditor content={product.description} setContent={(content) => handleProductChange('description', content)} />
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
                                onChange={(e) => {
                                    const newImages = Array.from(e.target.files || []);
                                    setImages(prevImages => [...prevImages, ...newImages]);
                                }}
                            />
                            <FaUpload className="w-8 h-8 text-gray-400" />
                        </label>
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <img src={URL.createObjectURL(image)} alt={`Hình ảnh ${index + 1}`} className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setImages(prevImages => prevImages.filter((_, i) => i !== index))}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isSubmitting ? 'Đang xử lý...' : 'Thêm Sản Phẩm'}
                    </button>
                </div>
            </form>
        </div>
    );
}