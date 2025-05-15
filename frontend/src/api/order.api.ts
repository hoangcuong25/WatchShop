import axiosClient from "../lib/axiosClient"

export const createOrderApi = async (order: any) => {
    try {
        const response = await axiosClient.post('/api/v1/orders', order);
        return response.data;
    } catch (error) {
        throw error;
    }
}

