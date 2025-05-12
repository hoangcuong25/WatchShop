import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

export default function Search({ isLoading }: { isLoading: boolean }) {
    return (
        <div className="relative">
            <Input
                type="text"
                placeholder="Tìm kiếm thương hiệu..."
                className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500"
                disabled={isLoading}
                />
            <FaSearch className="absolute left-3 top-3 text-slate-400" />
        </div>
    )
}
