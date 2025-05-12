import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface AddDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSubmit: (formData: FormData) => Promise<void>;
    isLoading: boolean;
}

export default function AddDialog({
    isOpen,
    onOpenChange,
    onSubmit,
    isLoading
}: AddDialogProps) {
    const [brandName, setBrandName] = useState('');
    const [brandImage, setBrandImage] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setBrandImage(file);
    };

    const handleSubmit = async () => {
        if (!brandName || !brandImage) {
            toast.error('Vui lòng nhập tên và ảnh thương hiệu');
            return;
        }

        const formData = new FormData();
        formData.append('name', brandName);
        formData.append('file', brandImage);

        await onSubmit(formData);
        resetForm();
    };

    const handleCancel = () => {
        onOpenChange(false);
        resetForm();
    };

    const resetForm = () => {
        setBrandName('');
        setBrandImage(null);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95%] sm:w-[500px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <DialogHeader>
                    <DialogTitle className="text-slate-900 dark:text-white">Thêm Thương hiệu</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <Input
                        type="text"
                        placeholder="Nhập tên thương hiệu"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                        disabled={isLoading}
                    />

                    <Input
                        type="file"
                        accept="image/*"
                        placeholder="Ảnh thương hiệu"
                        className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                        onChange={handleFileChange}
                        disabled={isLoading}
                    />

                    {brandImage && (
                        <div className="relative w-full h-40 mt-4">
                            <Image
                                src={URL.createObjectURL(brandImage)}
                                alt="Ảnh thương hiệu"
                                fill
                                className="object-contain rounded-md"
                            />
                        </div>
                    )}
                </div>
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang thêm...
                            </>
                        ) : (
                            'Thêm'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}