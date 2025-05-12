import axiosClient from "../lib/axiosClient"

export const getCrystalsApi = async () => {
    try {
        const response = await axiosClient.get('/api/v1/crystals');
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const createCrystalApi = async (crystal: any) => {
    try {
        const response = await axiosClient.post('/api/v1/crystals', crystal);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const updateCrystalApi = async (crystal: any) => {
    try {
        const response = await axiosClient.put(`/api/v1/crystals`, crystal);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const deleteCrystalApi = async (crystalId: string) => {
    try {
        const response = await axiosClient.delete(`/api/v1/crystals/${crystalId}`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}







