import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function DeleteAlertDialog(
    { isDeleteDialogOpen, setIsDeleteDialogOpen, selectedCategoryId, setSelectedCategoryId }:
        {
            isDeleteDialogOpen: boolean,
            setIsDeleteDialogOpen: (isOpen: boolean) => void,
            selectedCategoryId: string, setSelectedCategoryId: (categoryId: string) => void
        }) {

    return (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent className="w-[95%] sm:w-[500px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-slate-900 dark:text-white">Xác nhận xóa</AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-500 dark:text-slate-400">
                        Bạn có chắc chắn muốn xóa danh mục có ID: "{selectedCategoryId}"? Hành động này không thể hoàn tác.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                    <AlertDialogCancel
                        onClick={() => {
                            setIsDeleteDialogOpen(false);
                            setSelectedCategoryId('');
                        }}
                        className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                        Hủy
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => { }}
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                    >
                        Xóa
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}