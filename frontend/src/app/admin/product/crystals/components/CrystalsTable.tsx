import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function CrystalsTable(
    { crystals, setIsEditDialogOpen, setIsDeleteDialogOpen, setSelectedCrystalId }:
        {
            crystals: CrystalType[],
            setIsEditDialogOpen: (value: boolean) => void,
            setIsDeleteDialogOpen: (value: boolean) => void,
            setSelectedCrystalId: (value: string) => void
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
                                Tên Chất liệu
                            </th>
                            <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Mô tả
                            </th>
                            <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Ngày tạo
                            </th>
                            <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Ngày cập nhật
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                        {crystals.map((crystal) => (
                            <tr key={crystal.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                    {crystal.id}
                                </td>
                                <td className="px-3 sm:px-6 py-4 text-sm">
                                    <div className="text-slate-900 dark:text-slate-100 font-medium">
                                        {crystal.name}
                                    </div>
                                    <div className="text-slate-500 dark:text-slate-400 text-xs mt-1 lg:hidden line-clamp-2">
                                        {crystal.description}
                                    </div>
                                    <div className="text-slate-400 dark:text-slate-500 text-xs mt-1 lg:hidden">
                                        {crystal.updatedAt ? `Cập nhật: ${new Date(crystal.updatedAt).toLocaleDateString()}` : 'Chưa cập nhật'}
                                    </div>
                                </td>
                                <td className="hidden lg:table-cell px-3 sm:px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                    {crystal.description}
                                </td>
                                <td className="hidden lg:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                    {crystal.createdAt ? new Date(crystal.createdAt).toLocaleDateString() : ''}
                                </td>
                                <td className="hidden lg:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                    {crystal.updatedAt ? new Date(crystal.updatedAt).toLocaleDateString() : 'Chưa cập nhật'}
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                setIsEditDialogOpen(true)
                                            }
                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/50"
                                        >
                                            <FaEdit className="w-4 h-4" />
                                            <span className="sr-only">Sửa</span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                setIsDeleteDialogOpen(true)
                                                setSelectedCrystalId(crystal.id.toString())
                                            }}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50"
                                        >
                                            <FaTrash className="w-4 h-4" />
                                            <span className="sr-only">Xóa</span>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    )
}