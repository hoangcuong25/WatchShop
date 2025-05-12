import axiosClient from "../lib/axiosClient"

export const getBrandsApi = async () => {
    const response = await axiosClient.get('/api/v1/brands');
    return response.data;
}

export const createBrandApi = async (brand: FormData) => {
    const response = await axiosClient.post('/api/v1/brands', brand,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    return response.data;
}

export const deleteBrandApi = async (id: string) => {
    const response = await axiosClient.delete(`/api/v1/brands/${id}`);
    return response.data;
}

export const updateBrandApi = async (id: string, brand: FormData) => {
    const response = await axiosClient.put(`/api/v1/brands/${id}`, brand,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    return response.data;
}
