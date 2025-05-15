'use client';

import Image from "next/image";
import { FaRegHeart, FaShoppingCart, FaStar, FaSearchPlus } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { getProductByIdApi } from "@/api/Product.api";
import { use, useContext, useEffect, useState } from "react";
import { convertHtmlToPlainText } from "@/components/Editor";
import { AppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";

export default function ProductDetail() {

    const { products, setOrderInfor } = useContext(AppContext);

    const router = useRouter();

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
        if (product) {
            const orderInfo = {
                product: product,
                quantity: quantity,
            };
            setOrderInfor([orderInfo]);
        }
    }, [product, quantity]);

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
                            className={`object-cover transition-transform duration-500 ease-in-out ${isZoomed ? 'scale-150' : 'scale-100'}`}
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
                            <button
                                onClick={() => router.push(`/payment`)}
                                className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                🛒 Mua ngay
                            </button>
                            <button className="p-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <FaRegHeart className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 border rounded-lg p-4 space-y-2">
                            <p className="text-green-600 font-medium">✔ Miễn phí giao hàng toàn quốc</p>
                            <p className="text-blue-600 font-medium">✔ Đổi trả trong 7 ngày nếu lỗi do NSX</p>
                            <div className="flex flex-wrap gap-4 mt-8">
                                <div className="flex items-center space-x-2">
                                    <span className="text-green-600 text-xl">🛡️</span>
                                    <p>Bảo hành 12 tháng</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-blue-600 text-xl">💬</span>
                                    <p>Hỗ trợ trực tuyến 24/7</p>
                                </div>
                            </div>
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

            <div className="mt-12 border-y border-gray-300 dark:border-gray-700 py-8">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Có thể bạn sẽ quan tâm</div>
                <div className="w-full flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-1.5">
                        {products.slice(7, 12).map((prod, idx) => (
                            <div key={idx} className="bg-gray-100 shadow-2xl dark:bg-[#181c2a] rounded-lg p-4 flex flex-col items-center relative">

                                <div className="absolute left-2 top-2 bg-red-600 text-white text-xs font-bold rounded-full px-3 py-1 z-10">-{prod.discount}%</div>

                                <Image onClick={() => router.push(`/product/${prod.id}`)} src={prod.imageUrls[0]} alt={prod.name} width={100} height={100} className="w-64 h-64 object-contain mb-2" />

                                <div className="text-center mt-2">
                                    <div className="font-semibold">{prod.name}</div>
                                    <div className=' my-1.5'>Thương hiệu: {prod.brandName}</div>
                                    <div className=' my-1.5'>Xuất xứ: {prod.brandOrigin}</div>
                                    <div className="text-gray-500 my-2 line-through">Giá: {prod.oldPrice} VNĐ</div>
                                    <div className='text-red-500 font-semibold'> Giá: {prod.newPrice} VNĐ</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 text-center mt-16">
                    <Button className='h-10'>Xem thêm sản phẩm</Button>
                </div>
            </div>
        </div>
    );
}
