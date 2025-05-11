/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { getUserApi } from "@/api/user.api";
import axiosClient from "@/lib/axiosClient";
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

interface AppContextType {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

export const AppContext = createContext<AppContextType>({
    user: null,
    setUser: () => { },
});

interface AppContextProviderProps {
    children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {

    const [user, setUser] = useState<UserType | null>(null);

    const value = {
        user,
        setUser,
    };

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getUserApi();
            setUser(response.data);
        };
        fetchUser();
    }, []);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;