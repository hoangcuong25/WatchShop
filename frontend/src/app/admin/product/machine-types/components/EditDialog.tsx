import { DialogContent, DialogFooter } from "@/components/ui/dialog";

import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateMachineType } from "@/api/MachineType.api";

export default function EditDialog({ isEditDialogOpen, setIsEditDialogOpen, selectedMachineType, setMachineTypes, machineTypes }:
    {
        isEditDialogOpen: boolean,
        setIsEditDialogOpen: (value: boolean) => void,
        selectedMachineType: MachineTypeType,
        setMachineTypes: (value: MachineTypeType[]) => void,
        machineTypes: MachineTypeType[],
    }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleEdit = async () => {
        if (!name || !description) {
            toast.error('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('id', selectedMachineType.id.toString());

            const response = await updateMachineType(formData);
            setMachineTypes(machineTypes.map(machineType => machineType.id === Number(selectedMachineType.id) ? response.data as MachineTypeType : machineType));
            setIsEditDialogOpen(false);
            toast.success('Cập nhật loại máy thành công');
        }
        catch (error: any) {
            toast.error(error.response.data.message || 'Lỗi khi cập nhật loại máy');
        }
    }

    useEffect(() => {
        if (selectedMachineType) {
            setName(selectedMachineType.name);
            setDescription(selectedMachineType.description);
        }
    }, [selectedMachineType]);

    return (
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
                            placeholder="Nhập tên loại máy"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Mô tả
                        </label>
                        <Input
                            type="text"
                            placeholder="Nhập mô tả"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setIsEditDialogOpen(false);
                        }}
                        className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleEdit}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Lưu
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}