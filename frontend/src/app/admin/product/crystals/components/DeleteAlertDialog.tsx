import { deleteCrystalApi } from "@/api/crystal.api";
import { AlertDialog, AlertDialogAction, AlertDialogDescription, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function DeleteAlertDialog(
    { isDeleteDialogOpen, setIsDeleteDialogOpen, selectedCrystalId, setCrystals, crystals }:
        {
            isDeleteDialogOpen: boolean,
            setIsDeleteDialogOpen: (value: boolean) => void,
            selectedCrystalId: string,
            setCrystals: (value: CrystalType[]) => void,
            crystals: CrystalType[]
        }) {

    const handleDeleteCrystal = async () => {
        try {
            if (!selectedCrystalId) {
                toast.error('Chất liệu không tồn tại');
                return;
            }

            await deleteCrystalApi(selectedCrystalId);
            setIsDeleteDialogOpen(false);
            toast.success('Xóa chất liệu thành công');
            setCrystals(crystals.filter(crystal => crystal.id !== Number(selectedCrystalId)));
        } catch (error: any) {
            toast.error(error.response.data.message || 'Lỗi khi xóa chất liệu');
        }
    }

    return (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent className="w-[95%] sm:w-[500px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-slate-900 dark:text-white">Xác nhận xóa</AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-500 dark:text-slate-400">
                        Bạn có chắc chắn muốn xóa chất liệu? Hành động này không thể hoàn tác.
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
                        onClick={() => {
                            setIsDeleteDialogOpen(false);
                            handleDeleteCrystal();
                        }}
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                    >
                        Xóa
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}