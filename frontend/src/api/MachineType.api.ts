import axiosClient from "../lib/axiosClient";

export const addMachineType = async (formData: FormData) => {
    try {
        const response = await axiosClient.post('/api/v1/machine-types', formData);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const getMachineTypes = async () => {
    try {
        const response = await axiosClient.get('/api/v1/machine-types');
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const updateMachineType = async (formData: FormData) => {
    try {
        const response = await axiosClient.put(`/api/v1/machine-types`, formData);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const deleteMachineType = async (id: string) => {
    try {
        const response = await axiosClient.delete(`/api/v1/machine-types/${id}`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}