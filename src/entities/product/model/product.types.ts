export interface Product {
    barcode: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    unit: string;
    size: string;
    productCategory: number;
}