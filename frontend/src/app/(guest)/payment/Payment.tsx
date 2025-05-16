'use client'

import { createOrderApi } from "@/api/order.api";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

export default function Payment() {
    const { orderInfor, user } = useContext(AppContext);

    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [address, setAddress] = useState("");
    const [discountCode, setDiscountCode] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thanh toán thành công!");
    };

    const productPrice = () => {
        let total = 0;

        orderInfor.forEach((prod: any) => {
            const rawPrice = prod.product.newPrice.replace(/\./g, "")
            const price = parseInt(rawPrice, 10);
            total += price * prod.quantity;
        });

        return total;
    };

    let discountAmount = 0;
    let totalPayable = productPrice() - discountAmount + 30000;

    const handleOrder = async () => {
        setIsLoading(true);

        try {
            const orderData = {
                userId: user?.id,
                shippingAddress: address,
                paymentMethod,
                totalPayable,
                items: orderInfor.map((prod: any) => ({
                    productId: prod.product.id,
                    quantity: prod.quantity,
                    price: parseFloat(
                        prod.product.newPrice
                            .toString()
                            .replace(/\./g, '')
                            .replace(',', '.')
                    ),
                })),
            };

            const response = await createOrderApi(orderData);
            toast.success("Đặt hàng thành công!");
        }
        catch (error) {
            toast.error("Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau.");
        }
        finally {
            setIsLoading(false);
        }
    };


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chi tiết sản phẩm */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Thông tin sản phẩm</h2>
                {orderInfor && orderInfor.map((prod, index) => (
                    prod && (
                        <div key={index} className="flex flex-col sm:flex-row gap-4 items-start">
                            <div className="min-w-[200px] max-w-[200px] h-[200px] rounded-md overflow-hidden border">
                                {prod.product.imageUrls && prod.product.imageUrls.length > 0 &&
                                    <Image
                                        src={prod.product.imageUrls[0]}
                                        alt={prod.product.name}
                                        width={200}
                                        height={200}
                                        className="w-full h-full object-cover"
                                    />
                                }
                            </div>
                            <div className="flex-1 space-y-1">
                                <h3 className="text-lg font-bold">{prod.product.name}</h3>
                                <p className="text-gray-600">Giá: <strong>{prod.product.newPrice}₫</strong></p>
                                {/* <p className="text-gray-600">Số lượng: <strong>{quantity}</strong></p> */}
                            </div>
                        </div>
                    )
                ))}

                {/* Chi tiết thanh toán */}
                <div className="mt-4 border-t pt-4 space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                        <span>Tạm tính</span>
                        <span>{productPrice().toLocaleString()} VNĐ</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Giảm giá</span>
                        <span>- {discountAmount.toLocaleString()} VNĐ</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Phí giao hàng</span>
                        <span>30.000 VNĐ</span>
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
                    onClick={handleOrder}
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                    Xác nhận thanh toán
                </button>
            </form>
        </div>
    );
}
