import { Card } from '@/components/ui/card';

export default function CategoriesTable() {
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
                                Tên Danh mục
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
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                        {/* Table rows will be added here */}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}