import axiosClient from "../lib/axiosClient"

export const getUserApi = async () => {
    const response = await axiosClient.get('/api/v1/users');
    return response.data;
}
