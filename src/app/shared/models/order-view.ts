export interface ProductOrderView {
    order_code: string;
    order_id:number;
    order_date:number;   
    order_total:number;   
    store_no: string;
    store_name: string;
    merchant_name: string;
    merchant_address: string;
    merchant_contact_no: string;
    merchant_secondary_contact_no: string;
    merchant_primary_emailid: string;
    merchant_latitude: string;
    merchant_longitude: string;
    cust_id: number;
    cust_name: string;
    latitude: number;
    longitude: number;
    ProductOrderItems:ProductOrderItemView[]
}

export interface ProductOrderItemView {
    id:number;
    order_code: string;
    order_id:number;
    product_name:string;
    product_price: number;
    product_quantity: number;
    order_status: string;
    product_image: string;
}