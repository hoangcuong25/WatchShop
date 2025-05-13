import { FaFilter } from 'react-icons/fa';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { ChevronDown } from 'lucide-react';

const FilterButton = () => {
    const { brands, crystals, machineTypes } = useContext(AppContext)
    const [openSections, setOpenSections] = useState<string[]>([])
    const [selectedBrand, setSelectedBrand] = useState<string>("")
    const [selectedCrystal, setSelectedCrystal] = useState<string>("")
    const [selectedMachineType, setSelectedMachineType] = useState<string>("")

    const toggleSection = (section: string) => {
        setOpenSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        )
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="bg-gray-100 dark:bg-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2">
                    <FaFilter /> Bộ Lọc
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 w-[400px]">
                <SheetHeader className="border-b border-gray-200 dark:border-gray-800 pb-6">
                    <SheetTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">Bộ Lọc Sản Phẩm</SheetTitle>
                </SheetHeader>
                <div className="py-8 px-4 space-y-6">
                    {/* Brands Filter */}
                    <div className="space-y-4">
                        <button
                            onClick={() => toggleSection('brands')}
                            className="flex items-center justify-between w-full text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Thương Hiệu
                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.includes('brands') ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar transition-all duration-200 ${openSections.includes('brands') ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                            <RadioGroup
                                value={selectedBrand}
                                onValueChange={setSelectedBrand}
                                className="space-y-3"
                            >
                                {brands.map((brand) => (
                                    <div key={brand.id} className="flex items-center space-x-3 group">
                                        <RadioGroupItem value={brand.id.toString()} id={`brand-${brand.id}`} />
                                        <Label
                                            htmlFor={`brand-${brand.id}`}
                                            className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                                        >
                                            {brand.name}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Crystals Filter */}
                    <div className="space-y-4">
                        <button
                            onClick={() => toggleSection('crystals')}
                            className="flex items-center justify-between w-full text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Chất Liệu Kính
                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.includes('crystals') ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar transition-all duration-200 ${openSections.includes('crystals') ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                            <RadioGroup
                                value={selectedCrystal}
                                onValueChange={setSelectedCrystal}
                                className="space-y-3"
                            >
                                {crystals.map((crystal) => (
                                    <div key={crystal.id} className="flex items-center space-x-3 group">
                                        <RadioGroupItem value={crystal.id.toString()} id={`crystal-${crystal.id}`} />
                                        <Label
                                            htmlFor={`crystal-${crystal.id}`}
                                            className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                                        >
                                            {crystal.name}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Machine Types Filter */}
                    <div className="space-y-4">
                        <button
                            onClick={() => toggleSection('machine-types')}
                            className="flex items-center justify-between w-full text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Loại Máy
                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.includes('machine-types') ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar transition-all duration-200 ${openSections.includes('machine-types') ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                            <RadioGroup
                                value={selectedMachineType}
                                onValueChange={setSelectedMachineType}
                                className="space-y-3"
                            >
                                {machineTypes.map((type) => (
                                    <div key={type.id} className="flex items-center space-x-3 group">
                                        <RadioGroupItem value={type.id.toString()} id={`machine-${type.id}`} />
                                        <Label
                                            htmlFor={`machine-${type.id}`}
                                            className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                                        >
                                            {type.name}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default FilterButton;