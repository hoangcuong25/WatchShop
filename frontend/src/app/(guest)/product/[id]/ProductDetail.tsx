'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FaHeart, FaRegHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    specifications: {
        brand: string;
        model: string;
        movement: string;
        case: string;
        strap: string;
        waterResistance: string;
    };
    rating: number;
    reviews: number;
    stock: number;
}

export default function ProductDetail() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isWishlist, setIsWishlist] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // TODO: Fetch product data from API
        // This is mock data for demonstration
        setProduct({
            id: params.id as string,
            name: "Rolex Submariner Date",
            price: 1250000000,
            description: "The Rolex Submariner Date is a legendary diving watch that has become an icon of luxury watchmaking. With its distinctive design and exceptional performance, it's the perfect companion for underwater exploration.",
            images: [
                "/images/watch1.jpg",
                "/images/watch2.jpg",
                "/images/watch3.jpg",
                "/images/watch4.jpg"
            ],
            specifications: {
                brand: "Rolex",
                model: "Submariner Date",
                movement: "Automatic",
                case: "Stainless Steel, 41mm",
                strap: "Oyster Bracelet",
                waterResistance: "300m / 1000ft"
            },
            rating: 4.8,
            reviews: 128,
            stock: 5
        });
    }, [params.id]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                            src={product.images[selectedImage]}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`relative aspect-square rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-blue-500' : ''
                                    }`}
                            >
                                <Image
                                    src={image}
                                    alt={`${product.name} - Image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {product.name}
                        </h1>
                        <div className="flex items-center mt-2 space-x-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(product.rating)
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600 dark:text-gray-400">
                                ({product.reviews} đánh giá)
                            </span>
                        </div>
                    </div>

                    <div className="text-3xl font-bold text-blue-600">
                        {formatPrice(product.price)}
                    </div>

                    <p className="text-gray-600 dark:text-gray-400">
                        {product.description}
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700 dark:text-gray-300">Số lượng:</span>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <FaShoppingCart className="inline-block mr-2" />
                                Thêm vào giỏ
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsWishlist(!isWishlist)}
                                className="p-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {isWishlist ? (
                                    <FaHeart className="w-6 h-6 text-red-500" />
                                ) : (
                                    <FaRegHeart className="w-6 h-6" />
                                )}
                            </motion.button>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="border-t pt-6">
                        <h2 className="text-xl font-semibold mb-4">Thông số kỹ thuật</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Thương hiệu</p>
                                <p className="font-medium">{product.specifications.brand}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Model</p>
                                <p className="font-medium">{product.specifications.model}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Bộ máy</p>
                                <p className="font-medium">{product.specifications.movement}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Vỏ máy</p>
                                <p className="font-medium">{product.specifications.case}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Dây đeo</p>
                                <p className="font-medium">{product.specifications.strap}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Chống nước</p>
                                <p className="font-medium">{product.specifications.waterResistance}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
