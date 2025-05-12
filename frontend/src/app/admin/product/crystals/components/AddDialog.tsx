import { createCrystalApi } from "@/api/crystal.api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function AddDialog(
    { isAddDialogOpen, setIsAddDialogOpen }:
        {
            isAddDialogOpen: boolean,
            setIsAddDialogOpen: (value: boolean) => void
        }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleAddCrystal = async () => {
        if (!name || !description) {
            toast.error('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        try {
            const crystal = {
                name,
                description
            }
            await createCrystalApi(crystal);
            setIsAddDialogOpen(false);
            toast.success('Thêm chất liệu mặt kính thành công');
        } catch (error: any) {
            toast.error(error.response.data.message || 'Lỗi khi thêm chất liệu mặt kính');
        }
    }

    return (
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
                            className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setIsAddDialogOpen(false);
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
    )
}