'use client';

import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Search from './components/Search';
import CategoriesTable from './components/CategoriesTable';
import AddDialog from './components/AddDialog';
import DeleteAlertDialog from './components/DeleteAlertDialog';
import EditDialog from './components/EditDialog';

export default function Categories() {

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

    return (
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Quản lý Danh mục</h1>
                <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <FaPlus />
                    Thêm Danh mục
                </Button>
            </div>

            <Search />

            <CategoriesTable />

            <AddDialog
                isAddDialogOpen={isAddDialogOpen}
                setIsAddDialogOpen={setIsAddDialogOpen}
            />

            <EditDialog
                isEditDialogOpen={isEditDialogOpen}
                setIsEditDialogOpen={setIsEditDialogOpen}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />


            <DeleteAlertDialog
                isDeleteDialogOpen={isDeleteDialogOpen}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                selectedCategoryId={selectedCategoryId}
                setSelectedCategoryId={setSelectedCategoryId}
            />
        </div>
    );
}
