import axiosClient from "../lib/axiosClient"

export const getCrystalsApi = async () => {
    const response = await axiosClient.get('/api/v1/crystals');
    return response.data;
}

export const createCrystalApi = async (crystal: any) => {
    const response = await axiosClient.post('/api/v1/crystals', crystal);
    return response.data;
}

export const updateCrystalApi = async (crystal: any) => {
    const response = await axiosClient.put(`/api/v1/crystals`, crystal);
    return response.data;
}

export const deleteCrystalApi = async (crystalId: string) => {
    const response = await axiosClient.delete(`/api/v1/crystals/${crystalId}`);
    return response.data;
}







