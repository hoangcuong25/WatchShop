'use client';

import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Crystal {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export default function Crystals() {
    const [crystals, setCrystals] = useState<Crystal[]>([
        {
            id: 1,
            name: 'Sapphire Crystal',
            description: 'Mặt kính Sapphire chống trầy xước cao cấp',
            createdAt: '2024-03-20',
            updatedAt: '2024-03-20'
        },
        {
            id: 2,
            name: 'Mineral Crystal',
            description: 'Mặt kính khoáng chất, độ bền tốt',
            createdAt: '2024-03-20',
            updatedAt: '2024-03-20'
        },
        {
            id: 3,
            name: 'Acrylic Crystal',
            description: 'Mặt kính nhựa, dễ thay thế và sửa chữa',
            createdAt: '2024-03-20',
            updatedAt: '2024-03-20'
        },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCrystal, setSelectedCrystal] = useState<Crystal | null>(null);
    const [newCrystal, setNewCrystal] = useState({
        name: '',
        description: ''
    });

    const filteredCrystals = crystals.filter(crystal =>
        crystal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crystal.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddCrystal = () => {
        if (newCrystal.name.trim() && newCrystal.description.trim()) {
            const newType: Crystal = {
                id: crystals.length + 1,
                name: newCrystal.name,
                description: newCrystal.description,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setCrystals([...crystals, newType]);
            setNewCrystal({ name: '', description: '' });
            setIsAddDialogOpen(false);
        }
    };

    const handleEditCrystal = () => {
        if (selectedCrystal && newCrystal.name.trim() && newCrystal.description.trim()) {
            setCrystals(crystals.map(crystal =>
                crystal.id === selectedCrystal.id
                    ? {
                        ...crystal,
                        name: newCrystal.name,
                        description: newCrystal.description,
                        updatedAt: new Date().toISOString()
                    }
                    : crystal
            ));
            setNewCrystal({ name: '', description: '' });
            setIsEditDialogOpen(false);
            setSelectedCrystal(null);
        }
    };

    const handleDeleteCrystal = () => {
        if (selectedCrystal) {
            setCrystals(crystals.filter(crystal => crystal.id !== selectedCrystal.id));
            setIsDeleteDialogOpen(false);
            setSelectedCrystal(null);
        }
    };

    return (
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Quản lý Chất liệu Mặt kính</h1>
                <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <FaPlus />
                    Thêm Chất liệu
                </Button>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Tìm kiếm chất liệu mặt kính..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500"
                />
                <FaSearch className="absolute left-3 top-3 text-slate-400" />
            </div>

            {/* Crystals Table */}
            <Card className="overflow-hidden border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Tên Chất liệu
                                </th>
                                <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Mô tả
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
                            {filteredCrystals.map((crystal) => (
                                <tr key={crystal.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                        {crystal.id}
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                        {crystal.name}
                                    </td>
                                    <td className="hidden md:table-cell px-3 sm:px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                        {crystal.description}
                                    </td>
                                    <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                        {new Date(crystal.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                        {new Date(crystal.updatedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setSelectedCrystal(crystal);
                                                    setNewCrystal({
                                                        name: crystal.name,
                                                        description: crystal.description
                                                    });
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
                                                    setSelectedCrystal(crystal);
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
                        <DialogTitle className="text-slate-900 dark:text-white">Thêm Chất liệu Mặt kính</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Tên Chất liệu
                            </label>
                            <Input
                                type="text"
                                value={newCrystal.name}
                                onChange={(e) => setNewCrystal({ ...newCrystal, name: e.target.value })}
                                placeholder="Nhập tên chất liệu"
                                className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Mô tả
                            </label>
                            <Input
                                type="text"
                                value={newCrystal.description}
                                onChange={(e) => setNewCrystal({ ...newCrystal, description: e.target.value })}
                                placeholder="Nhập mô tả"
                                className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsAddDialogOpen(false);
                                setNewCrystal({ name: '', description: '' });
                            }}
                            className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleAddCrystal}
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
                        <DialogTitle className="text-slate-900 dark:text-white">Sửa Chất liệu Mặt kính</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Tên Chất liệu
                            </label>
                            <Input
                                type="text"
                                value={newCrystal.name}
                                onChange={(e) => setNewCrystal({ ...newCrystal, name: e.target.value })}
                                placeholder="Nhập tên chất liệu"
                                className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Mô tả
                            </label>
                            <Input
                                type="text"
                                value={newCrystal.description}
                                onChange={(e) => setNewCrystal({ ...newCrystal, description: e.target.value })}
                                placeholder="Nhập mô tả"
                                className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsEditDialogOpen(false);
                                setNewCrystal({ name: '', description: '' });
                                setSelectedCrystal(null);
                            }}
                            className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleEditCrystal}
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
                            Bạn có chắc chắn muốn xóa chất liệu "{selectedCrystal?.name}"? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                        <AlertDialogCancel
                            onClick={() => {
                                setIsDeleteDialogOpen(false);
                                setSelectedCrystal(null);
                            }}
                            className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                            Hủy
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteCrystal}
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
