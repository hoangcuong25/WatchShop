import axiosClient from "../lib/axiosClient"

export const getCrystalsApi = async () => {
    const response = await axiosClient.get('/api/v1/crystals');
    return response.data;
}

export const createCrystalApi = async (crystal: any) => {
    const response = await axiosClient.post('/api/v1/crystals', crystal);
    return response.data;
}




