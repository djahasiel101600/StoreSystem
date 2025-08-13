import supabase from "@/shared/api/client";
import type { Product } from "./product.types";

class ProductApi{
    table: string;

    constructor(table: string){
        this.table = table
    }

    async getProducts(): Promise<Product[] | null> {
        const { data } = await supabase.from(this.table).select()
        return data
    }
}

export default ProductApi;