'use client';

import { FaPlus } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { useState, useContext } from 'react';
import { createBrandApi } from '@/api/brand.api';
import { toast } from 'sonner';
import { AppContext } from '@/context/AppContext';
import DeleteAlertDialog from './components/DeleteAlertDialog';
import BrandsTable from './components/BrandsTable';
import Search from './components/Search';
import AddDialog from './components/AddDialog';

export default function Brands() {
    const { brands, setBrands, formatDate } = useContext(AppContext);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddBrand = async (formData: FormData) => {
        setIsLoading(true);
        try {
            const response = await createBrandApi(formData);
            toast.success('Thương hiệu đã được tạo thành công');
            setIsAddDialogOpen(false);
            setBrands([...brands, response.data]);
        } catch (error: any) {
            toast.error(error.response.data.message || 'Lỗi khi tạo thương hiệu');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Quản lý Thương hiệu</h1>
                <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isLoading}
                >
                    <FaPlus />
                    Thêm Thương hiệu
                </Button>
            </div>

            <Search isLoading={isLoading} />
            <BrandsTable isLoading={isLoading} brands={brands} formatDate={formatDate} />

            <AddDialog
                isOpen={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                onSubmit={handleAddBrand}
                isLoading={isLoading}
            />

            <DeleteAlertDialog />
        </div>
    );
}
