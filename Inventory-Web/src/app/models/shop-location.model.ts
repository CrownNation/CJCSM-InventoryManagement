export interface ShopLocation {
    shopLocationId: string;
    name: string;
    address1: string;
    address2: string;
    city: string;
    provinceState: string;
    country: string;
    postalCode: string;
    phoneNumber: string;
    faxNumber: string;
    isActive: boolean;
}

export interface ShopLocationCreate{
    name: string;
    address1: string;
    address2: string;
    city: string;
    provinceState: string;
    country: string;
    postalCode: string;
    phoneNumber: string;
    faxNumber: string;
    isActive: boolean;
}

export interface ShopLocationSearchParams{
    shopLocationId: string;
    name: string;
    isActive: boolean;
}