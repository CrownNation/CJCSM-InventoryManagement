export interface RackBasic {
    rackId: string;
    name: string;
    shopLocationId: string;
    shopName: string;
}

export interface Rack {
    rackId: string;
    name: string;
    shopLocationId: string;
    shopName: string;
}

export interface RackCreate {
    name: string;
    shopLocationId: string;
}

