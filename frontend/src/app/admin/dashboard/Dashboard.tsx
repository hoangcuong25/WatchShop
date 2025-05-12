'use client';

import { Card } from "@/components/ui/card";
import { FaShoppingCart, FaUsers, FaBox, FaDollarSign } from "react-icons/fa";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { name: 'T1', value: 4000 },
    { name: 'T2', value: 3000 },
    { name: 'T3', value: 2000 },
    { name: 'T4', value: 2780 },
    { name: 'T5', value: 1890 },
    { name: 'T6', value: 2390 },
    { name: 'T7', value: 3490 },
];

const recentOrders = [
    {
        id: "ORD001",
        customer: "Nguyễn Văn A",
        date: "2024-03-20",
        total: "3.500.000₫",
        status: "Đã giao",
    },
    {
        id: "ORD002",
        customer: "Trần Thị B",
        date: "2024-03-19",
        total: "2.800.000₫",
        status: "Đang giao",
    },
    {
        id: "ORD003",
        customer: "Lê Văn C",
        date: "2024-03-18",
        total: "6.200.000₫",
        status: "Chờ xác nhận",
    },
];

const topProducts = [
    {
        name: "Đồng hồ nam Longines Master",
        sales: 15,
        revenue: "1.269.675.000₫",
    },
    {
        name: "Đồng hồ nam Tissot PRX",
        sales: 12,
        revenue: "248.400.000₫",
    },
    {
        name: "Đồng hồ nữ Tissot Classic",
        sales: 10,
        revenue: "189.000.000₫",
    },
];

export default function Dashboard() {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Tổng đơn hàng</p>
                            <h3 className="text-2xl font-bold mt-2">1,234</h3>
                        </div>
                        <div className="p-3 bg-blue-500/10 rounded-full">
                            <FaShoppingCart className="text-blue-500 text-xl" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Tổng doanh thu</p>
                            <h3 className="text-2xl font-bold mt-2">123.4M₫</h3>
                        </div>
                        <div className="p-3 bg-green-500/10 rounded-full">
                            <FaDollarSign className="text-green-500 text-xl" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Khách hàng</p>
                            <h3 className="text-2xl font-bold mt-2">856</h3>
                        </div>
                        <div className="p-3 bg-purple-500/10 rounded-full">
                            <FaUsers className="text-purple-500 text-xl" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Sản phẩm</p>
                            <h3 className="text-2xl font-bold mt-2">234</h3>
                        </div>
                        <div className="p-3 bg-orange-500/10 rounded-full">
                            <FaBox className="text-orange-500 text-xl" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Revenue Chart */}
            <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Doanh thu theo tháng</h2>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Recent Orders & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">Đơn hàng gần đây</h2>
                    <div className="space-y-4">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div>
                                    <p className="font-semibold">{order.id}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{order.customer}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">{order.total}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{order.date}</p>
                                </div>
                                <div>
                                    <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'Đã giao' ? 'bg-green-500/10 text-green-500' :
                                        order.status === 'Đang giao' ? 'bg-blue-500/10 text-blue-500' :
                                            'bg-yellow-500/10 text-yellow-500'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Top Products */}
                <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">Sản phẩm bán chạy</h2>
                    <div className="space-y-4">
                        {topProducts.map((product, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div>
                                    <p className="font-semibold">{product.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Đã bán: {product.sales}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">{product.revenue}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
