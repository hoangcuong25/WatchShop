import axiosClient from "../lib/axiosClient"

export const getCrystals = async () => {
    const response = await axiosClient.get('/api/v1/crystals');
    return response.data;
}

export const createCrystal = async (crystal: any) => {
    const response = await axiosClient.post('/api/v1/crystals', crystal);
    return response.data;
}




