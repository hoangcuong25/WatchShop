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


