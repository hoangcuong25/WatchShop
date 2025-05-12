import { deleteMachineType } from "@/api/MachineType.api";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function DeleteAlertDialog(
    { isDeleteDialogOpen, setIsDeleteDialogOpen, setMachineTypes, machineTypes, selectedMachineTypeId }:
        {
            isDeleteDialogOpen: boolean,
            setIsDeleteDialogOpen: (value: boolean) => void,
            setMachineTypes: (value: MachineTypeType[]) => void,
            machineTypes: MachineTypeType[],
            selectedMachineTypeId: string
        }) {

    const handleDelete = async () => {
        try {
            await deleteMachineType(selectedMachineTypeId);
            setMachineTypes(machineTypes.filter(machineType => machineType.id !== Number(selectedMachineTypeId)));
            setIsDeleteDialogOpen(false);
            toast.success('Xóa loại máy thành công');
        }
        catch (error: any) {
            toast.error(error.response.data.message || 'Lỗi khi xóa loại máy');
        }
    }

    return (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent className="w-[95%] sm:w-[500px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-slate-900 dark:text-white">Xác nhận xóa</AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-500 dark:text-slate-400">
                        Bạn có chắc chắn muốn xóa loại máy? Hành động này không thể hoàn tác.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                    <AlertDialogCancel
                        onClick={() => {
                            setIsDeleteDialogOpen(false);
                        }}
                        className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                        Hủy
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                    >
                        Xóa
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}