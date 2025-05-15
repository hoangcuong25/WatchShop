/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { getBrandsApi } from "@/api/brand.api";
import { getCrystalsApi } from "@/api/crystal.api";
import { getMachineTypes } from "@/api/MachineType.api";
import { getAllProductsApi } from "@/api/Product.api";
import { getUserApi } from "@/api/user.api";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

interface AppContextType {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    brands: BrandType[];
    setBrands: (brands: BrandType[]) => void;
    formatDate: (dateString: string) => string;
    crystals: CrystalType[];
    setCrystals: (crystals: CrystalType[]) => void;
    machineTypes: MachineTypeType[];
    setMachineTypes: (machineTypes: MachineTypeType[]) => void;
    products: ProductType[];
    setProducts: (products: ProductType[]) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    setTotalPages: (pages: number) => void;
    isLoading: boolean;
    fetchProducts: (page: number) => Promise<void>;
    formatCompactDescription: (text: string) => string;
    orderInfor: any[];
    setOrderInfor: (orderInfor: any[]) => void;
}

export const AppContext = createContext<AppContextType>({
    user: null,
    setUser: () => { },
    brands: [],
    setBrands: () => { },
    formatDate: () => '',
    crystals: [],
    setCrystals: () => { },
    machineTypes: [],
    setMachineTypes: () => { },
    products: [],
    setProducts: () => { },
    currentPage: 0,
    setCurrentPage: () => { },
    totalPages: 0,
    setTotalPages: () => { },
    isLoading: false,
    fetchProducts: async () => { },
    formatCompactDescription: () => '',
    orderInfor: [],
    setOrderInfor: () => { }
});

interface AppContextProviderProps {
    children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [brands, setBrands] = useState<BrandType[]>([]);
    const [crystals, setCrystals] = useState<CrystalType[]>([]);
    const [machineTypes, setMachineTypes] = useState<MachineTypeType[]>([]);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [orderInfor, setOrderInfor] = useState<any[]>([]);

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(date);
    };

    const formatCompactDescription = (text: string) => {
        // Tìm tất cả các cụm dạng "Tựa đề: "
        const regex = /([A-ZÀ-Ỹa-zà-ỹ0-9\s]+?):/g;
        const matches = Array.from(text.matchAll(regex));

        const result: string[] = [];

        for (let i = 0; i < matches.length; i++) {
            const start = matches[i].index! + matches[i][0].length;
            const end = i + 1 < matches.length ? matches[i + 1].index! : text.length;
            const key = matches[i][1].trim();
            const value = text.slice(start, end).trim();
            result.push(`${key}: ${value}`);
        }

        return result.join('\n');
    };

    const fetchProducts = async (page: number) => {
        try {
            setIsLoading(true);
            const response = await getAllProductsApi(page, 12);
            const data = response.data as PageResponse<ProductType>;
            setProducts(data.content);
            setTotalPages(data.totalPages);
            setCurrentPage(data.number);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        user, setUser,
        brands, setBrands,
        formatDate,
        crystals, setCrystals,
        machineTypes, setMachineTypes,
        products, setProducts,
        currentPage, setCurrentPage,
        totalPages, setTotalPages, isLoading,
        fetchProducts,
        formatCompactDescription,
        orderInfor, setOrderInfor
    };

    const fetchUser = async () => {
        try {
            const response = await getUserApi();
            setUser(response.data);
        }
        catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await getBrandsApi();
            setBrands(response.data);
        }
        catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const fetchCrystals = async () => {
        try {
            const response = await getCrystalsApi();
            setCrystals(response.data);
        }
        catch (error) {
            console.error('Error fetching crystals:', error);
        }
    };

    const fetchMachineTypes = async () => {
        try {
            const response = await getMachineTypes();
            setMachineTypes(response.data);
        }
        catch (error) {
            console.error('Error fetching machine types:', error);
        }
    };

    useEffect(() => {
        fetchUser();
        fetchBrands();
        fetchCrystals();
        fetchMachineTypes();
        fetchProducts(0);
    }, []);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;