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

export const updateUserApi = async (userData: any, avatar: File) => {
    try {
        const formData = new FormData();

        // Thêm dữ liệu người dùng vào FormData
        formData.append('user', new Blob([JSON.stringify({
            name: userData.name,
            phone: userData.phone,
            age: userData.age,
            gender: userData.gender,
            address: userData.address,
        })], { type: 'application/json' }));

        // Thêm avatar nếu có
        if (avatar) {
            formData.append('avata', avatar);
        }

        const response = await axiosClient.put(`/api/v1/users`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

