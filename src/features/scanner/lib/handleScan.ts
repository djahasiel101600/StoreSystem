import type { Product } from "@/entities/product/model/product.types";
import { getProducts } from "@/shared/api";

function handleScan(err: any, result: any) {
    
    if(!err && result){
        console.log(result.text);
        let products: Product[] = []
        getProducts().then(data => products = data).catch(error => console.log(error))
        const matchedProduct = products.filter(prod => prod.barcode === result.text)
        console.log("Barcode: ",matchedProduct[0].barcode)
        console.log("Name: ",matchedProduct[0].name)
        console.log("Price: ",matchedProduct[0].price)
    }
}

export default  handleScan;