'use client';

import { useState, useContext } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Search from './components/Search';
import MachineTypesTable from './components/MachineTypesTable';
import AddDialog from './components/AddDialog';
import EditDialog from './components/EditDialog';
import DeleteAlertDialog from './components/DeleteAlertDialog';
import { AppContext } from '@/context/AppContext';
export default function MachineTypes() {

    const { machineTypes, setMachineTypes } = useContext(AppContext);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedMachineType, setSelectedMachineType] = useState<MachineTypeType>();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedMachineTypeId, setSelectedMachineTypeId] = useState<string>('');

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

            <Search />

            <MachineTypesTable
                machineTypes={machineTypes}
                setIsEditDialogOpen={setIsEditDialogOpen}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                setSelectedMachineTypeId={setSelectedMachineTypeId}
                setSelectedMachineType={setSelectedMachineType}
            />

            {/* Add Dialog */}
            <AddDialog
                isAddDialogOpen={isAddDialogOpen}
                setIsAddDialogOpen={setIsAddDialogOpen}
                setMachineTypes={setMachineTypes}
                machineTypes={machineTypes}
            />

            {/* Edit Dialog */}
            <EditDialog
                isEditDialogOpen={isEditDialogOpen}
                setIsEditDialogOpen={setIsEditDialogOpen}
                setMachineTypes={setMachineTypes}
                machineTypes={machineTypes}
                selectedMachineType={selectedMachineType!}
            />

            {/* Delete Alert Dialog */}
            <DeleteAlertDialog
                isDeleteDialogOpen={isDeleteDialogOpen}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                setMachineTypes={setMachineTypes}
                machineTypes={machineTypes}
                selectedMachineTypeId={selectedMachineTypeId}
            />
        </div>
    );
}
