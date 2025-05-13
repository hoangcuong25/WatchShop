'use client';

import Image from "next/image";
import { FaRegHeart, FaShoppingCart, FaStar } from "react-icons/fa";
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
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                            src="/images/watch1.jpg"
                            alt="Watch"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {(product?.imageUrls || []).map((image, index) => (
                            <div
                                key={index}
                                className="relative aspect-square rounded-lg overflow-hidden"
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

                    <div className="text-3xl font-bold text-blue-600 flex items-center gap-2">
                        <p>{product?.newPrice} ₫</p>
                        <p className="line-through text-xl text-gray-500">{product?.oldPrice} ₫</p>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400">
                        {formatCompactDescription(convertHtmlToPlainText(product?.description || ''))}
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700 dark:text-gray-300">Số lượng:</span>
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                                    -
                                </button>
                                <span className="w-12 text-center">1</span>
                                <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
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
                                <p className="font-medium">Rolex</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Model</p>
                                <p className="font-medium">Submariner Date</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Bộ máy</p>
                                <p className="font-medium">Automatic</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Vỏ máy</p>
                                <p className="font-medium">Stainless Steel, 41mm</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Dây đeo</p>
                                <p className="font-medium">Oyster Bracelet</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Chống nước</p>
                                <p className="font-medium">300m / 1000ft</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
