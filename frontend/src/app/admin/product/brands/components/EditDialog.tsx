import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface EditDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    isLoading: boolean;
    selectedBrand: BrandType | null;
    onSubmit: (formData: FormData) => Promise<void>;
}

export default function EditDialog({ isOpen, onOpenChange, isLoading, selectedBrand, onSubmit }: EditDialogProps) {
    const [name, setName] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');

    // Reset form when dialog opens/closes or selectedBrand changes
    useEffect(() => {
        if (isOpen && selectedBrand) {
            setName(selectedBrand.name);
            setPreviewUrl(selectedBrand.image);
        } else {
            setName('');
            setImage(null);
            setPreviewUrl('');
        }
    }, [isOpen, selectedBrand]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('file', image);
        }
        await onSubmit(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95%] sm:w-[500px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <DialogHeader>
                    <DialogTitle className="text-slate-900 dark:text-white">Sửa Thương hiệu</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <Input
                        type="text"
                        placeholder="Nhập tên thương hiệu"
                        className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                        disabled={isLoading}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                        type="file"
                        accept="image/*"
                        placeholder="Ảnh thương hiệu"
                        className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500"
                        disabled={isLoading}
                        onChange={handleImageChange}
                    />

                    <div className="relative w-full h-40 mt-4">
                        <Image
                            src={previewUrl || '/placeholder.png'}
                            alt="Ảnh thương hiệu"
                            fill
                            className="object-contain rounded-md"
                        />
                    </div>
                </div>
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                    >
                        Hủy
                    </Button>
                    <Button
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={isLoading || !name.trim()}
                        onClick={handleSubmit}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang lưu...
                            </>
                        ) : (
                            'Lưu'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 