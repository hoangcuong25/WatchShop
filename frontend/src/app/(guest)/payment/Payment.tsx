'use client'

import { getProductByIdApi } from "@/api/Product.api";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Payment() {
    const searchParams = useSearchParams();
    const productId = searchParams.get("productId");
    const quantity = Number(searchParams.get("quantity") || 1);

    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [address, setAddress] = useState("");
    const [discountCode, setDiscountCode] = useState("");
    const [product, setProduct] = useState<ProductType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGetProductById = async () => {
        try {
            setIsLoading(true);
            const response = await getProductByIdApi(productId as string);
            setProduct(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy sản phẩm:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleGetProductById();
    }, [productId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thanh toán thành công!");
    };

    const productPrice = product ? Number(product.newPrice) * quantity : 0;

    let discountAmount = 0;
    if (discountCode.toUpperCase() === "GIAM10") {
        discountAmount = productPrice * 0.1;
    } else if (discountCode.toUpperCase() === "GIAM20") {
        discountAmount = productPrice * 0.2;
    }

    let shippingFee = 30000;
    if (discountCode.toUpperCase() === "FREESHIP") {
        shippingFee = 0;
    }

    const totalPayable = productPrice - discountAmount + shippingFee;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chi tiết sản phẩm */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Thông tin sản phẩm</h2>
                {product && (
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="min-w-[200px] max-w-[200px] h-[200px] rounded-md overflow-hidden border">
                            <img
                                src={product.imageUrls[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 space-y-1">
                            <h3 className="text-lg font-bold">{product.name}</h3>
                            <p className="text-gray-600">Giá: <strong>{product.newPrice}₫</strong></p>
                            <p className="text-gray-600">Số lượng: <strong>{quantity}</strong></p>
                        </div>
                    </div>
                )}

                {/* Chi tiết thanh toán (bill) */}
                <div className="mt-4 border-t pt-4 space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                        <span>Tạm tính</span>
                        <span>{productPrice.toLocaleString()}₫</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Giảm giá</span>
                        <span>-{discountAmount.toLocaleString()}₫</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Phí giao hàng</span>
                        <span>{shippingFee.toLocaleString()}₫</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold text-base text-blue-700">
                        <span>Tổng thanh toán</span>
                        <span>{totalPayable.toLocaleString()}₫</span>
                    </div>
                </div>
            </div>

            {/* Form thanh toán */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl font-semibold">Thông tin thanh toán</h2>

                <div>
                    <label className="block font-medium mb-1">Địa chỉ nhận hàng</label>
                    <input
                        type="text"
                        className="w-full border rounded-md px-4 py-2"
                        placeholder="Nhập địa chỉ nhận hàng"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Mã giảm giá</label>
                    <input
                        type="text"
                        className="w-full border rounded-md px-4 py-2"
                        placeholder="Nhập mã giảm giá (GIAM10, GIAM20, FREESHIP)"
                        value={discountCode}
                        onChange={e => setDiscountCode(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Phương thức thanh toán</label>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="payment"
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={() => setPaymentMethod("cod")}
                            />
                            Thanh toán khi nhận hàng (COD)
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="payment"
                                value="bank"
                                checked={paymentMethod === "bank"}
                                onChange={() => setPaymentMethod("bank")}
                            />
                            Chuyển khoản ngân hàng
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                    Xác nhận thanh toán
                </button>
            </form>
        </div>
    );
}
