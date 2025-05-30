'use client';

import { useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Search from './components/Search';
import CrystalsTable from './components/CrystalsTable';
import AddDialog from './components/AddDialog';
import EditDialog from './components/EditDialog';
import DeleteAlertDialog from './components/DeleteAlertDialog';
import { AppContext } from '@/context/AppContext';

export default function Crystals() {

    const { crystals, setCrystals } = useContext(AppContext);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedCrystal, setSelectedCrystal] = useState<CrystalType | null>(null);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCrystalId, setSelectedCrystalId] = useState<string>('');

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
                setSelectedCrystalId={setSelectedCrystalId}
                setSelectedCrystal={setSelectedCrystal}
            />

            {/* Add Dialog */}
            <AddDialog
                isAddDialogOpen={isAddDialogOpen}
                setIsAddDialogOpen={setIsAddDialogOpen}
                setCrystals={setCrystals}
                crystals={crystals}
            />

            {/* Edit Dialog */}
            <EditDialog
                isEditDialogOpen={isEditDialogOpen}
                setIsEditDialogOpen={setIsEditDialogOpen}
                crystals={crystals}
                setCrystals={setCrystals}
                selectedCrystal={selectedCrystal}
            />

            {/* Delete Alert Dialog */}
            <DeleteAlertDialog
                isDeleteDialogOpen={isDeleteDialogOpen}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                selectedCrystalId={selectedCrystalId}
                setCrystals={setCrystals}
                crystals={crystals}
            />

        </div>
    );
}
