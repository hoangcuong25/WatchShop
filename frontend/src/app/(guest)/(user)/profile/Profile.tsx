'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, Upload, Camera } from "lucide-react";

const Profile = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8 text-gray-900">Thông Tin Cá Nhân</h1>

            {/* Header Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative group">
                        <Avatar className="h-32 w-32 border-4 border-blue-100 dark:border-gray-700 transition-transform group-hover:scale-105">
                            <AvatarImage src="/placeholder-avatar.jpg" />
                            <AvatarFallback className="text-3xl bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-white">JD</AvatarFallback>
                        </Avatar>
                        <Button
                            size="icon"
                            variant="secondary"
                            className="absolute -bottom-1 -right-1 rounded-full bg-blue-500 dark:bg-gray-700 shadow-md hover:bg-blue-600 dark:hover:bg-gray-600 text-white"
                        >
                            <Camera className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">John Doe</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">john.doe@example.com</p>
                        <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                            <div className="flex items-center gap-2 text-blue-600 dark:text-gray-300">
                                <Phone className="h-4 w-4" />
                                <span>+84 123 456 789</span>
                            </div>
                            <div className="flex items-center gap-2 text-blue-600 dark:text-gray-300">
                                <MapPin className="h-4 w-4" />
                                <span>TP.HCM, Việt Nam</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Information Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Thông tin cá nhân</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Cập nhật thông tin cá nhân của bạn</p>
                    </div>
                </div>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Họ và tên</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 dark:text-gray-500" />
                                <input
                                    id="name"
                                    value="John Doe"
                                    className="outline-none pl-9 w-full px-4 py-2 rounded-lg border-2 border-gray-400 dark:border-gray-600 focus:border-transparent focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/20"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 dark:text-gray-500" />
                                <input
                                    id="email"
                                    type="email"
                                    value="john.doe@example.com"
                                    disabled
                                    className="outline-none pl-9 w-full px-4 py-2 rounded-lg border-2 border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Số điện thoại</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 dark:text-gray-500" />
                                <input
                                    id="phone"
                                    value="+84 123 456 789"
                                    className="outline-none pl-9 w-full px-4 py-2 rounded-lg border-2 border-gray-400 dark:border-gray-600 focus:border-transparent focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/20"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="age" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Tuổi</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 dark:text-gray-500" />
                                <input
                                    id="age"
                                    type="number"
                                    value="25"
                                    className="outline-none pl-9 w-full px-4 py-2 rounded-lg border-2 border-gray-400 dark:border-gray-600 focus:border-transparent focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/20"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="gender" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Giới tính</Label>
                            <Select defaultValue="MALE">
                                <SelectTrigger className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/20">
                                    <SelectValue placeholder="Chọn giới tính" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MALE">Nam</SelectItem>
                                    <SelectItem value="FEMALE">Nữ</SelectItem>
                                    <SelectItem value="OTHER">Khác</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="md:col-span-2">
                            <Label htmlFor="address" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Địa chỉ</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 dark:text-gray-500" />
                                <input
                                    id="address"
                                    value="123 Đường ABC, Quận XYZ, TP.HCM"
                                    className="outline-none pl-9 w-full px-4 py-2 rounded-lg border-2 border-gray-400 dark:border-gray-600 focus:border-transparent focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/20"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <Button
                            variant="outline"
                            className="px-8 py-3 rounded-lg border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            Hủy
                        </Button>
                        <Button
                            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors gap-2"
                        >
                            <Save className="h-4 w-4" />
                            Lưu thay đổi
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;