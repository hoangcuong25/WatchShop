import axiosClient from "../lib/axiosClient"

export const getProductsApi = async () => {
    try {
        const response = await axiosClient.get('/api/v1/products');
        return response.data;
    } catch (error) {
        throw error;
    }
}

interface ProductState {
    productName: string;
    description: string;
    stockQuantity: string;
    oldPrice: string;
    newPrice: string;
    discount: string;
    machineTypeId: string;
    style: string;
    design: string;
    crystalId: string;
    faceColor: string;
    stringMaterial: string;
    caseMaterial: string;
    brandId: string;
    category: string;
    diameter: string;
    brandOrigin: string;
}

export const createProductApi = async (product: ProductState, images: File[]) => {
    try {
        const formData = new FormData();

        // Thêm thông tin sản phẩm
        formData.append('product', new Blob([JSON.stringify({
            name: product.productName,
            description: product.description,
            oldPrice: product.oldPrice,
            newPrice: product.newPrice,
            discount: product.discount,
            stockQuantity: parseInt(product.stockQuantity),
            status: 'ACTIVE',
            brandId: parseInt(product.brandId),
            machineTypeId: parseInt(product.machineTypeId),
            crystalId: parseInt(product.crystalId),
            category: product.category,
            style: product.style,
            design: product.design,
            faceColor: product.faceColor,
            diameter: product.diameter,
            stringMaterial: product.stringMaterial,
            caseMaterial: product.caseMaterial,
            brandOrigin: product.brandOrigin
        })], { type: 'application/json' }));

        // Thêm hình ảnh
        images.forEach((image) => {
            formData.append('images', image);
        });

        const response = await axiosClient.post('/api/v1/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


