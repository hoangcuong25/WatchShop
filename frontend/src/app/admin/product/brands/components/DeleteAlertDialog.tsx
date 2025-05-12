import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteBrandApi } from "@/api/brand.api";
import { toast } from "sonner";

export default function DeleteAlertDialog(
    { isOpen, setIsOpen, id, setBrands, brands }: {
        isOpen: boolean,
        setIsOpen: (isOpen: boolean) => void,
        id: string,
        setBrands: (brands: BrandType[]) => void,
        brands: BrandType[]
    }) {

    const handleDelete = async () => {
        try {
            await deleteBrandApi(id);
            toast.success('Thương hiệu đã được xóa thành công');
            setBrands(brands.filter(brand => brand.id !== Number(id)));
            setIsOpen(false);
        } catch (error) {
            toast.error('Lỗi khi xóa thương hiệu');
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="w-[95%] sm:w-[500px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-slate-900 dark:text-white">Xác nhận xóa</AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-500 dark:text-slate-400">
                        Bạn có chắc chắn muốn xóa thương hiệu này? Hành động này không thể hoàn tác.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                    <AlertDialogCancel
                        className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                        Hủy
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                        onClick={handleDelete}
                    >
                        Xóa
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
