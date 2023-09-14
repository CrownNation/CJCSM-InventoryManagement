export interface Rack {
    rackId: string;
    name: string;
    shopLocationId: string;
    isActive: boolean;
    shopName: string;
}

export interface RackCreate {
    name: string;
    shopLocationId: string;
}

export interface RackUpdate {
    name: string;
    shopLocationId: string;
}

