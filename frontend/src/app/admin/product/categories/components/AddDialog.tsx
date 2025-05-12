import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AddDialog(
    { isAddDialogOpen, setIsAddDialogOpen }:
        {
            isAddDialogOpen: boolean,
            setIsAddDialogOpen: (isOpen: boolean) => void,
        }) {

    const [newCategoryName, setNewCategoryName] = useState('');

    return (
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="w-[95%] sm:w-[500px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <DialogHeader>
                    <DialogTitle className="text-slate-900 dark:text-white">Thêm Danh mục</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Nhập tên danh mục"
                        className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setIsAddDialogOpen(false);
                            setNewCategoryName('');
                        }}
                        className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={() => { }}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Thêm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}