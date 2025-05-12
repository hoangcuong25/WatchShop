import axiosClient from "../lib/axiosClient"

export const getUserApi = async () => {
    try {
        const response = await axiosClient.get('/api/v1/users');
        return response.data;
    }
    catch (error) {
        throw error;
    }
}
