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

    type CrystalType = {
        id: number;
        name: string;
        description: string;
        createdAt?: string;
        updatedAt?: string;
        createdBy?: string;
        updatedBy?: string;
        products?: ProductType[];
    }

    type MachineTypeType = {
        id: number;
        name: string;
        description: string;
        createdAt?: string;
        updatedAt?: string;
        createdBy?: string;
        updatedBy?: string;
        products?: ProductType[];
    }

    type BrandType = {
        id: number;
        name: string;
        image: string;
        createdAt?: string;
        updatedAt?: string;
        createdBy?: string;
        updatedBy?: string;
        products?: ProductType[];
    }

    type ProductType = {
        id: number;
        name: string;
        description: string;
        price: number;
        quantity: number;
        image: string;
        brand?: BrandType;
        crystal?: CrystalType;
        machineType?: MachineTypeType;
        createdAt?: string;
        updatedAt?: string;
        createdBy?: string;
        updatedBy?: string;
    }
}