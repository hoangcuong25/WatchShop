import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";

export default function BrandsTable(
    { isLoading, brands, formatDate, setIsDeleteAlertDialogOpen, setSelectedBrandId }: {
        isLoading: boolean,
        brands: BrandType[],
        formatDate: (date: string) => string,
        setIsDeleteAlertDialogOpen: (isOpen: boolean) => void,
        setSelectedBrandId: (id: string) => void
    }) {

    return (
        <Card className="overflow-hidden border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Logo
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Tên Thương hiệu
                            </th>
                            <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Ngày tạo
                            </th>
                            <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Ngày cập nhật
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    {isLoading ? (
                        <tbody>
                            <tr>
                                <td colSpan={6} className="px-3 sm:px-6 py-8 text-center">
                                    <div className="flex justify-center items-center">
                                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        brands.map((brand) => (
                            <tbody key={brand.id} className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                        {brand.id}
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                        <div className="w-12 h-12 relative">
                                            <Image
                                                src={brand.image}
                                                alt={brand.name}
                                                fill
                                                className="object-contain rounded-md"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                        {brand.name}
                                    </td>
                                    <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                        {brand.createdAt ? formatDate(brand.createdAt) : ''}
                                    </td>
                                    <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                        {brand.updatedAt ? formatDate(brand.updatedAt) : 'Chưa cập nhật'}
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/50"
                                                disabled={isLoading}
                                            >
                                                <FaEdit />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50"
                                                disabled={isLoading}
                                                onClick={() => {
                                                    setIsDeleteAlertDialogOpen(true);
                                                    setSelectedBrandId(brand.id.toString());
                                                }}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))
                    )}
                </table>
            </div>
        </Card>
    )
}