import { updateCrystalApi } from "@/api/crystal.api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditDialog(
    { isEditDialogOpen, setIsEditDialogOpen, selectedCrystal, setCrystals, crystals }:
        {
            isEditDialogOpen: boolean,
            setIsEditDialogOpen: (value: boolean) => void,
            selectedCrystal: CrystalType | null,
            setCrystals: (value: CrystalType[]) => void,
            crystals: CrystalType[]
        }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleEditCrystal = async () => {
        if (!selectedCrystal) {
            toast.error('Chất liệu không tồn tại');
            return;
        }

        try {
            const crystal = {
                id: selectedCrystal.id,
                name,
                description
            }

            const response = await updateCrystalApi(crystal);
            setCrystals(crystals.map(crystal => crystal.id === selectedCrystal.id ? response.data : crystal));
            setIsEditDialogOpen(false);
            toast.success('Chất liệu đã được cập nhật');
        } catch (error: any) {
            toast.error(error.response.data.message || 'Lỗi khi cập nhật chất liệu');
        }
    }

    useEffect(() => {
        if (selectedCrystal) {
            setName(selectedCrystal.name);
            setDescription(selectedCrystal.description);
        }
    }, [selectedCrystal]);

    return (
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
                            placeholder="Nhập tên chất liệu"
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
                        onClick={handleEditCrystal}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Lưu
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}