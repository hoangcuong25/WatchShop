/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { getBrandsApi } from "@/api/brand.api";
import { getCrystalsApi } from "@/api/crystal.api";
import { getMachineTypes } from "@/api/MachineType.api";
import { getUserApi } from "@/api/user.api";
import React, { createContext, ReactNode, useEffect, useState } from "react";

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
});

interface AppContextProviderProps {
    children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {

    const [user, setUser] = useState<UserType | null>(null);
    const [brands, setBrands] = useState<BrandType[]>([]);
    const [crystals, setCrystals] = useState<CrystalType[]>([]);
    const [machineTypes, setMachineTypes] = useState<MachineTypeType[]>([]);

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

    const value = {
        user,
        setUser,
        brands, setBrands,
        formatDate,
        crystals, setCrystals,
        machineTypes, setMachineTypes,
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
    }, []);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;