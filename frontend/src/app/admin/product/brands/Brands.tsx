'use client';

import { useState } from 'react';
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

interface Brand {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export default function Brands() {
    const [brands, setBrands] = useState<Brand[]>([
        { id: 1, name: 'Rolex', createdAt: '2024-03-20', updatedAt: '2024-03-20' },
        { id: 2, name: 'Omega', createdAt: '2024-03-20', updatedAt: '2024-03-20' },
        { id: 3, name: 'TAG Heuer', createdAt: '2024-03-20', updatedAt: '2024-03-20' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
    const [newBrandName, setNewBrandName] = useState('');

    const filteredBrands = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddBrand = () => {
        if (newBrandName.trim()) {
            const newBrand: Brand = {
                id: brands.length + 1,
                name: newBrandName,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setBrands([...brands, newBrand]);
            setNewBrandName('');
            setIsAddDialogOpen(false);
        }
    };

    const handleEditBrand = () => {
        if (selectedBrand && newBrandName.trim()) {
            setBrands(brands.map(brand =>
                brand.id === selectedBrand.id
                    ? { ...brand, name: newBrandName, updatedAt: new Date().toISOString() }
                    : brand
            ));
            setNewBrandName('');
            setIsEditDialogOpen(false);
            setSelectedBrand(null);
        }
    };

    const handleDeleteBrand = () => {
        if (selectedBrand) {
            setBrands(brands.filter(brand => brand.id !== selectedBrand.id));
            setIsDeleteDialogOpen(false);
            setSelectedBrand(null);
        }
    };

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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                            {filteredBrands.map((brand) => (
                                <tr key={brand.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                        {brand.id}
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                        {brand.name}
                                    </td>
                                    <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                        {new Date(brand.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                        {new Date(brand.updatedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setSelectedBrand(brand);
                                                    setNewBrandName(brand.name);
                                                    setIsEditDialogOpen(true);
                                                }}
                                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/50"
                                            >
                                                <FaEdit />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setSelectedBrand(brand);
                                                    setIsDeleteDialogOpen(true);
                                                }}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50"
                                            >
                                                <FaTrash />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
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
                            value={newBrandName}
                            onChange={(e) => setNewBrandName(e.target.value)}
                            placeholder="Nhập tên thương hiệu"
                            className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsAddDialogOpen(false);
                                setNewBrandName('');
                            }}
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
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="w-[95%] sm:w-[500px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <DialogHeader>
                        <DialogTitle className="text-slate-900 dark:text-white">Sửa Thương hiệu</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Input
                            type="text"
                            value={newBrandName}
                            onChange={(e) => setNewBrandName(e.target.value)}
                            placeholder="Nhập tên thương hiệu"
                            className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsEditDialogOpen(false);
                                setNewBrandName('');
                                setSelectedBrand(null);
                            }}
                            className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleEditBrand}
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Lưu
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Alert Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="w-[95%] sm:w-[500px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-slate-900 dark:text-white">Xác nhận xóa</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500 dark:text-slate-400">
                            Bạn có chắc chắn muốn xóa thương hiệu "{selectedBrand?.name}"? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                        <AlertDialogCancel
                            onClick={() => {
                                setIsDeleteDialogOpen(false);
                                setSelectedBrand(null);
                            }}
                            className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                            Hủy
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteBrand}
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
