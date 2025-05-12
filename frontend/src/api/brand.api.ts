import axiosClient from "../lib/axiosClient"

export const getBrandsApi = async () => {
    try {
        const response = await axiosClient.get('/api/v1/brands');
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const createBrandApi = async (brand: FormData) => {
    try {
        const response = await axiosClient.post('/api/v1/brands', brand,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const deleteBrandApi = async (id: string) => {
    try {
        const response = await axiosClient.delete(`/api/v1/brands/${id}`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const updateBrandApi = async (id: string, brand: FormData) => {
    try {
        const response = await axiosClient.put(`/api/v1/brands/${id}`, brand,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    }
    catch (error) {
        throw error;
    }
}
