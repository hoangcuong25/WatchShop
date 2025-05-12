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

interface MachineType {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export default function MachineTypes() {
    const [machineTypes, setMachineTypes] = useState<MachineType[]>([
        {
            id: 1,
            name: 'Quartz',
            description: 'Đồng hồ chạy bằng pin, độ chính xác cao',
            createdAt: '2024-03-20',
            updatedAt: '2024-03-20'
        },
        {
            id: 2,
            name: 'Automatic',
            description: 'Đồng hồ cơ tự động, không cần pin',
            createdAt: '2024-03-20',
            updatedAt: '2024-03-20'
        },
        {
            id: 3,
            name: 'Mechanical',
            description: 'Đồng hồ cơ lên dây cót thủ công',
            createdAt: '2024-03-20',
            updatedAt: '2024-03-20'
        },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedMachineType, setSelectedMachineType] = useState<MachineType | null>(null);
    const [newMachineType, setNewMachineType] = useState({
        name: '',
        description: ''
    });

    const filteredMachineTypes = machineTypes.filter(machineType =>
        machineType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        machineType.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddMachineType = () => {
        if (newMachineType.name.trim() && newMachineType.description.trim()) {
            const newType: MachineType = {
                id: machineTypes.length + 1,
                name: newMachineType.name,
                description: newMachineType.description,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setMachineTypes([...machineTypes, newType]);
            setNewMachineType({ name: '', description: '' });
            setIsAddDialogOpen(false);
        }
    };

    const handleEditMachineType = () => {
        if (selectedMachineType && newMachineType.name.trim() && newMachineType.description.trim()) {
            setMachineTypes(machineTypes.map(machineType =>
                machineType.id === selectedMachineType.id
                    ? {
                        ...machineType,
                        name: newMachineType.name,
                        description: newMachineType.description,
                        updatedAt: new Date().toISOString()
                    }
                    : machineType
            ));
            setNewMachineType({ name: '', description: '' });
            setIsEditDialogOpen(false);
            setSelectedMachineType(null);
        }
    };

    const handleDeleteMachineType = () => {
        if (selectedMachineType) {
            setMachineTypes(machineTypes.filter(machineType => machineType.id !== selectedMachineType.id));
            setIsDeleteDialogOpen(false);
            setSelectedMachineType(null);
        }
    };

    return (
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Quản lý Loại Máy</h1>
                <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <FaPlus />
                    Thêm Loại Máy
                </Button>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Tìm kiếm loại máy..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500"
                />
                <FaSearch className="absolute left-3 top-3 text-slate-400" />
            </div>

            {/* Machine Types Table */}
            <Card className="overflow-hidden border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Tên Loại Máy
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
                            {filteredMachineTypes.map((machineType) => (
                                <tr key={machineType.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                        {machineType.id}
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                        {machineType.name}
                                    </td>
                                    <td className="hidden md:table-cell px-3 sm:px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                        {machineType.description}
                                    </td>
                                    <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                        {new Date(machineType.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                        {new Date(machineType.updatedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setSelectedMachineType(machineType);
                                                    setNewMachineType({
                                                        name: machineType.name,
                                                        description: machineType.description
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
                                                    setSelectedMachineType(machineType);
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
                        <DialogTitle className="text-slate-900 dark:text-white">Thêm Loại Máy</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Tên Loại Máy
                            </label>
                            <Input
                                type="text"
                                value={newMachineType.name}
                                onChange={(e) => setNewMachineType({ ...newMachineType, name: e.target.value })}
                                placeholder="Nhập tên loại máy"
                                className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Mô tả
                            </label>
                            <Input
                                type="text"
                                value={newMachineType.description}
                                onChange={(e) => setNewMachineType({ ...newMachineType, description: e.target.value })}
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
                                setNewMachineType({ name: '', description: '' });
                            }}
                            className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleAddMachineType}
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
                        <DialogTitle className="text-slate-900 dark:text-white">Sửa Loại Máy</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Tên Loại Máy
                            </label>
                            <Input
                                type="text"
                                value={newMachineType.name}
                                onChange={(e) => setNewMachineType({ ...newMachineType, name: e.target.value })}
                                placeholder="Nhập tên loại máy"
                                className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Mô tả
                            </label>
                            <Input
                                type="text"
                                value={newMachineType.description}
                                onChange={(e) => setNewMachineType({ ...newMachineType, description: e.target.value })}
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
                                setNewMachineType({ name: '', description: '' });
                                setSelectedMachineType(null);
                            }}
                            className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleEditMachineType}
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
                            Bạn có chắc chắn muốn xóa loại máy "{selectedMachineType?.name}"? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                        <AlertDialogCancel
                            onClick={() => {
                                setIsDeleteDialogOpen(false);
                                setSelectedMachineType(null);
                            }}
                            className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                            Hủy
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteMachineType}
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
