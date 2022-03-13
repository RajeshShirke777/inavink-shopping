export interface CustomerAddress {
    id: number;
    user_id:number;
    lat:number;
    lng:number;
    address_type: string;
    location_details: string;
    address_line_1: string;
    address_line_2: string;
    contact_name: string;
    contact_no: string;
    is_deleted: boolean;
    created_by?: number;
    created_at?: number;
    updated_by?: number;
    updated_at?: number;
}