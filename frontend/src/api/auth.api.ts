import axiosClient from "../lib/axiosClient"

export const RegisterApi = async (name: string, email: string, password1: string, password2: string) => {
    try {
        if (password1 !== password2) {
            throw new Error('Mật khẩu không khớp');
        }

        const response = await axiosClient.post('/api/v1/auth/register', { name, email, password: password1 });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const LoginApi = async (email: string, password: string) => {
    try {
        const response = await axiosClient.post('/api/v1/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const LogoutApi = async () => {
    try {
        const response = await axiosClient.post('/api/v1/auth/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
}

