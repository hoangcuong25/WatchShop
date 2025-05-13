'use client';

import Image from "next/image";
import { FaRegHeart, FaShoppingCart, FaStar, FaSearchPlus } from "react-icons/fa";
import { useParams } from "next/navigation";
import { getProductByIdApi } from "@/api/Product.api";
import { useContext, useEffect, useState } from "react";
import { convertHtmlToPlainText } from "@/components/Editor";
import { AppContext } from "@/context/AppContext";

export default function ProductDetail() {

    const { formatCompactDescription } = useContext(AppContext);

    const { id } = useParams();
    const [product, setProduct] = useState<ProductType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [quantity, setQuantity] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [isZoomed, setIsZoomed] = useState<boolean>(false);
    const [showFullImage, setShowFullImage] = useState<boolean>(false);

    const handleGetProductById = async () => {
        try {
            setIsLoading(true);
            const response = await getProductByIdApi(id as string);
            setProduct(response.data);
        } catch (error) {
            setError(error as string);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleGetProductById();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div
                        className="relative aspect-square rounded-lg overflow-hidden cursor-zoom-in"
                        onMouseEnter={() => setIsZoomed(true)}
                        onMouseLeave={() => setIsZoomed(false)}
                        onClick={() => setShowFullImage(true)}
                    >
                        <Image
                            src={product?.imageUrls[selectedImage] || ''}
                            alt="Watch"
                            fill
                            className={`object-cover transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'
                                }`}
                        />
                        <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full">
                            <FaSearchPlus className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product?.imageUrls.map((image, index) => (
                            <div
                                key={index}
                                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer ${selectedImage === index ? 'ring-2 ring-blue-500' : ''
                                    }`}
                                onClick={() => setSelectedImage(index)}
                            >
                                <Image
                                    src={image}
                                    alt={`Watch ${index}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {product?.name}
                        </h1>
                        <div className="flex items-center mt-2 space-x-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className="w-5 h-5 text-yellow-400"
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600 dark:text-gray-400">
                                (128 đánh giá)
                            </span>
                        </div>
                    </div>

                    <div className="text-3xl font-bold text-blue-600 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <p>{product?.newPrice} ₫</p>
                            <p className="line-through text-xl text-gray-500">{product?.oldPrice} ₫</p>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            {product?.stockQuantity} sản phẩm còn lại
                        </p>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400">
                        {formatCompactDescription(convertHtmlToPlainText(product?.description || ''))}
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700 dark:text-gray-300">Số lượng:</span>
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setQuantity(quantity - 1)}>
                                    -
                                </button>
                                <span className="w-12 text-center">{quantity}</span>
                                <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setQuantity(quantity + 1)}  >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                                <FaShoppingCart className="inline-block mr-2" />
                                Thêm vào giỏ
                            </button>
                            <button className="p-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <FaRegHeart className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="border-t pt-6">
                        <h2 className="text-xl font-semibold mb-4">Thông số kỹ thuật</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Thương hiệu</p>
                                <p className="font-medium">{product?.brandName}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Loại máy</p>
                                <p className="font-medium">{product?.machineTypeName}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Mặt kính</p>
                                <p className="font-medium">{product?.crystalName}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Phân loại</p>
                                <p className="font-medium">{product?.category}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Phong cách</p>
                                <p className="font-medium">{product?.style}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Kiểu dáng</p>
                                <p className="font-medium">{product?.design}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Màu mặt</p>
                                <p className="font-medium">{product?.faceColor}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Đường kính</p>
                                <p className="font-medium">{product?.diameter}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Chất liệu dây</p>
                                <p className="font-medium">{product?.stringMaterial}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Chất liệu vỏ</p>
                                <p className="font-medium">{product?.caseMaterial}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Xuất xứ</p>
                                <p className="font-medium">{product?.brandOrigin}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Image Modal */}
            {showFullImage && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowFullImage(false)}
                >
                    <div className="relative w-full max-w-4xl aspect-square">
                        <Image
                            src={product?.imageUrls[selectedImage] || ''}
                            alt="Watch"
                            fill
                            className="object-contain"
                        />
                        <button
                            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
                            onClick={() => setShowFullImage(false)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
