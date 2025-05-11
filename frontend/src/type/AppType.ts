export { };

declare global {
    type GenderEnum = 'MALE' | 'FEMALE' | 'OTHER';
    type RoleEnum = 'USER' | 'ADMIN';

    type UserType = {
        id: number;
        name: string;
        email: string;
        password?: string;
        age: number;
        gender: GenderEnum;
        address: string;
        avatar: string;
        phone: number;
        role: RoleEnum;
        createdAt?: string;
        updatedAt?: string;
        createdBy?: string;
        updatedBy?: string;
    }
}