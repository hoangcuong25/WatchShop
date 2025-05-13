export { };

declare global {
    type GenderEnum = 'MALE' | 'FEMALE' | 'OTHER';
    type RoleEnum = 'USER' | 'ADMIN';
    type CategoryEnum = 'MEN' | 'WOMEN' | 'UNISEX';
    type StyleEnum = 'CLASSIC' | 'SPORT' | 'LUXURY' | 'CASUAL';
    type DesignEnum = 'ANALOG' | 'DIGITAL' | 'CHRONOGRAPH';
    type FaceColorEnum = 'BLACK' | 'WHITE' | 'BLUE' | 'SILVER' | 'GOLD';
    type StringMaterialEnum = 'LEATHER' | 'METAL' | 'RUBBER' | 'NYLON';
    type CaseMaterialEnum = 'STAINLESS_STEEL' | 'GOLD' | 'TITANIUM' | 'CERAMIC';
    type BrandOriginEnum = 'SWITZERLAND' | 'JAPAN' | 'GERMANY' | 'USA' | 'OTHER';

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
        oldPrice: string;
        newPrice: string;
        discount: string;
        stockQuantity: number;
        status: string;
        brandName: string;
        machineTypeName: string;
        crystalName: string;
        category: CategoryEnum;
        style: StyleEnum;
        design: DesignEnum;
        faceColor: FaceColorEnum;
        diameter: string;
        stringMaterial: StringMaterialEnum;
        caseMaterial: CaseMaterialEnum;
        brandOrigin: BrandOriginEnum;
        imageUrls: string[];
        createdAt?: string;
        updatedAt?: string;
        createdBy?: string;
        updatedBy?: string;
    }
}