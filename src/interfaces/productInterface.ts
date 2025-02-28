export interface SeedProduct {
    id? : string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: ValidCategory;
    categoryId?: string;
}

export type ValidCategory = 'men'|'women'|'kid'|'unisex';
export type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';

export interface CartProduct {
    id: string;
    slug: string;
    title:string;
    price: number;
    quantity: number;
    sizes: ValidSizes;
    image: string;
}