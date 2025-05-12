'use client';

import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { createBrandApi } from '@/api/brand.api';
import Image from 'next/image';
import { toast } from 'sonner';

export default function Brands() {

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const [brandName, setBrandName] = useState('');
    const [brandImage, setBrandImage] = useState<File | null>(null);

    const handleAddBrand = async () => {
        if (!brandName || !brandImage) {
            toast.error('Vui lòng nhập tên và ảnh thương hiệu');
            return;
        }

        const formData = new FormData();
        formData.append('name', brandName);
        formData.append('file', brandImage);

        try {
            const response = await createBrandApi(formData);
            toast.success('Thương hiệu đã được tạo thành công');
            setIsAddDialogOpen(false);
        } catch (error) {
            toast.error('Lỗi khi tạo thương hiệu');
        }
    }

    return (
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Quản lý Thương hiệu</h1>
                <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <FaPlus />
                    Thêm Thương hiệu
                </Button>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Tìm kiếm thương hiệu..."
                    className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500"
                />
                <FaSearch className="absolute left-3 top-3 text-slate-400" />
            </div>

            {/* Brands Table */}
            <Card className="overflow-hidden border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Tên Thương hiệu
                                </th>
                                <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Ngày tạo
                                </th>
                                <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Ngày cập nhật
                                </th>
                                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                    1
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                    Rolex
                                </td>
                                <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                    20/03/2024
                                </td>
                                <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                    20/03/2024
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/50"
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50"
                                        >
                                            <FaTrash />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Add Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="w-[95%] sm:w-[500px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <DialogHeader>
                        <DialogTitle className="text-slate-900 dark:text-white">Thêm Thương hiệu</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Input
                            type="text"
                            placeholder="Nhập tên thương hiệu"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                        />

                        <Input
                            type="file"
                            placeholder="Ảnh thương hiệu"
                            className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500 mt-8"
                            onChange={(e) => setBrandImage(e.target.files?.[0] || null)}
                        />

                        {
                            brandImage && (
                                <Image src={URL.createObjectURL(brandImage)} width={100} height={100} alt="Ảnh thương hiệu" className="w-full h-40 object-cover mt-4" />
                            )
                        }
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleAddBrand}
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Thêm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog>
                <DialogContent className="w-[95%] sm:w-[500px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <DialogHeader>
                        <DialogTitle className="text-slate-900 dark:text-white">Sửa Thương hiệu</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Input
                            type="text"
                            placeholder="Nhập tên thương hiệu"
                            className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                            Hủy
                        </Button>
                        <Button
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Lưu
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Alert Dialog */}
            <AlertDialog>
                <AlertDialogContent className="w-[95%] sm:w-[500px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-slate-900 dark:text-white">Xác nhận xóa</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500 dark:text-slate-400">
                            Bạn có chắc chắn muốn xóa thương hiệu này? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                        <AlertDialogCancel
                            className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                            Hủy
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                        >
                            Xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
