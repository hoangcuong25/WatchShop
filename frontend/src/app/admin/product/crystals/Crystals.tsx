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
import Search from './components/Search';
import CrystalsTable from './components/CrystalsTable';
import AddDialog from './components/AddDialog';
import EditDialog from './components/EditDialog';
import DeleteAlertDialog from './components/DeleteAlertDialog';
export default function Crystals() {
    const [crystals, setCrystals] = useState<CrystalType[]>([
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
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

            <Search />

            <CrystalsTable
                crystals={crystals}
                setIsEditDialogOpen={setIsEditDialogOpen}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            />

            {/* Add Dialog */}
            <AddDialog
                isAddDialogOpen={isAddDialogOpen}
                setIsAddDialogOpen={setIsAddDialogOpen}
            />

            {/* Edit Dialog */}
            <EditDialog
                isEditDialogOpen={isEditDialogOpen}
                setIsEditDialogOpen={setIsEditDialogOpen}
            />

            {/* Delete Alert Dialog */}
            <DeleteAlertDialog
                isDeleteDialogOpen={isDeleteDialogOpen}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            />

        </div>
    );
}
