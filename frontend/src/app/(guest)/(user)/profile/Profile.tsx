'use client';

import { updateUserApi } from "@/api/user.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppContext } from "@/context/AppContext";
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, Upload, Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { use, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Profile = () => {

    const { user } = useContext(AppContext);

    const [userUpdate, setUserUpdate] = useState({
        name: '',
        phone: '',
        age: 0,
        gender: '',
        address: '',
    })
    const [isLoading, setIsLoading] = useState(false);

    const [avatar, setAvatar] = useState<File | null>(null);

    const formErrors = (): boolean => {
        if (!userUpdate.name) {
            toast.error("Tên không được để trống");
            return false;
        }
        if (userUpdate.phone === "") {
            toast.error("Số điện thoại không được để trống");
            return false;
        }
        if (userUpdate.age === 0) {
            toast.error("Tuổi không được để trống");
            return false;
        }
        if (!userUpdate?.gender) {
            toast.error("Giới tính không được để trống");
            return false;
        }
        if (!userUpdate.address) {
            toast.error("Địa chỉ không được để trống");
            return false;
        }
        return true; // No errors
    }

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Kiểm tra lỗi
        const isValid = formErrors();
        if (!isValid) {
            setIsLoading(false); // Stop loading if there are errors
            return;
        }

        try {
            // Gửi dữ liệu người dùng và avatar nếu có
            const response = await updateUserApi(userUpdate, avatar as File);

            toast.success("Cập nhật thông tin thành công");
        } catch (error: any) {
            // Xử lý lỗi an toàn hơn
            const errorMessage = error?.response?.data?.message || "Cập nhật thông tin thất bại";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    console.log(userUpdate)

    useEffect(() => {
        if (user) {
            setUserUpdate({
                name: user.name,
                phone: user.phone,
                age: user.age,
                address: user.address,
                gender: user.gender,
            });
        }
    }, [user]);

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-200 shadow-2xl rounded-2xl">
            <h1 className="text-2xl font-bold mb-8 text-gray-700">Thông Tin Cá Nhân</h1>

            {/* Header Card */}
            <div className="bg-gray-100 dark:bg-[#181c2a] rounded-lg shadow-md p-4 md:p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                    <div className="relative group">
                        <Avatar className="h-32 w-32 rounded-full border-4 border-blue-100 dark:border-white/20 shadow-md transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
                            {avatar ?
                                <Image
                                    src={URL.createObjectURL(avatar)}
                                    alt="User avatar"
                                    className="object-cover h-full w-full rounded-full"
                                    width={128}
                                    height={128}
                                /> :
                                < AvatarImage
                                    src={user?.avatar || "/placeholder-avatar.jpg"}
                                    alt="User avatar"
                                    className="object-cover h-full w-full rounded-full"
                                />
                            }
                            <AvatarFallback className="flex items-center justify-center text-3xl font-semibold bg-blue-50 dark:bg-[#232a41] text-blue-600 dark:text-white">
                                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                            </AvatarFallback>
                        </Avatar>

                        <button
                            type="button"
                            onClick={() => document.getElementById("avatarInput")?.click()}
                            className="absolute -bottom-1 -right-1 rounded-full bg-blue-500 dark:bg-[#232a41] shadow-md hover:bg-blue-600 dark:hover:bg-[#2a3145] text-white p-2"
                        >
                            <Camera className="h-4 w-4" />
                        </button>

                        <input
                            id="avatarInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setAvatar(e.target.files[0]);
                                }
                            }}
                        />

                    </div>
                    <div className="text-center md:text-left space-y-2 w-full">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-7">{user?.name}</h2>
                        <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Phone className="h-4 w-4" />
                                <span className='hover:underline'>{user?.phone ? user.phone : "chưa cập nhật"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <MapPin className="h-4 w-4" />
                                <span>{user?.address != null ? user?.address : "chưa cập nhật"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Information Card */}
            <div className="bg-white dark:bg-[#181c2a] rounded-lg shadow-md p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6 pb-4 border-b border-gray-200 dark:border-[#232a41] gap-2 md:gap-0">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Thông tin cá nhân</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Cập nhật thông tin cá nhân của bạn</p>
                    </div>
                </div>

                <form className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                            <Label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Họ và tên</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                <input
                                    id="name"
                                    value={userUpdate?.name}
                                    onChange={(e) => setUserUpdate({ ...userUpdate, name: e.target.value })}
                                    className="outline-none pl-9 w-full px-4 py-2 rounded-lg border-2 border-gray-400 dark:border-[#2a3145] focus:border-transparent focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/20 bg-white dark:bg-[#232a41] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={user?.email}
                                    disabled
                                    className="outline-none pl-9 w-full px-4 py-2 rounded-lg border-2 border-gray-400 dark:border-[#2a3145] bg-gray-50 dark:bg-[#232a41] text-gray-500 dark:text-gray-400 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Số điện thoại</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                <input
                                    id="phone"
                                    type="number"
                                    value={userUpdate?.phone}
                                    onChange={(e) => setUserUpdate({ ...userUpdate, phone: e.target.value })}
                                    className="outline-none pl-9 w-full px-4 py-2 rounded-lg border-2 border-gray-400 dark:border-[#2a3145] focus:border-transparent focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/20 bg-white dark:bg-[#232a41] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="age" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Tuổi</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                <input
                                    id="age"
                                    type="number"
                                    value={userUpdate?.age}
                                    onChange={(e) => setUserUpdate({ ...userUpdate, age: Number(e.target.value) })}
                                    className="outline-none pl-9 w-full px-4 py-2 rounded-lg border-2 border-gray-400 dark:border-[#2a3145] focus:border-transparent focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/20 bg-white dark:bg-[#232a41] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="gender" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Giới tính</Label>
                            <Select
                                value={userUpdate.gender}
                                onValueChange={(value) =>
                                    setUserUpdate({ ...userUpdate, gender: value as GenderEnum })
                                }
                            >
                                <SelectTrigger className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#2a3145] focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/20 bg-white dark:bg-[#232a41] text-gray-900 dark:text-gray-100">
                                    <SelectValue placeholder="Chọn giới tính" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-[#232a41]">
                                    <SelectItem value="MALE">Nam</SelectItem>
                                    <SelectItem value="FEMALE">Nữ</SelectItem>
                                    <SelectItem value="OTHER">Khác</SelectItem>
                                </SelectContent>
                            </Select>


                        </div>
                        <div className="md:col-span-2">
                            <Label htmlFor="address" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Địa chỉ</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                <input
                                    id="address"
                                    value={userUpdate?.address == null ? "Chưa cập nhật" : userUpdate?.address}
                                    onChange={(e) => setUserUpdate({ ...userUpdate, address: e.target.value })}
                                    className="outline-none pl-9 w-full px-4 py-2 rounded-lg border-2 border-gray-400 dark:border-[#2a3145] focus:border-transparent focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/20 bg-white dark:bg-[#232a41] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-end md:space-x-4 space-y-2 md:space-y-0 pt-4 md:pt-6 border-t border-gray-200 dark:border-[#232a41]">
                        <Button
                            variant="outline"
                            className="px-8 py-3 rounded-lg border-gray-200 dark:border-[#2a3145] hover:bg-gray-100 dark:hover:bg-[#232a41]"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            onClick={handleUpdateUser}
                            className={`px-8 py-3 flex items-center justify-center bg-blue-500 text-white rounded-lg transition-all gap-2
              ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-600"}`}
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                            <span>{isLoading ? "Đang lưu..." : "Lưu thay đổi"}</span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;