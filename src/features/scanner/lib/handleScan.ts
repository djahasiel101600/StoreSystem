import type { Product } from "@/entities/product/model/product.types";

function handleScan(err: any, result: any, data: Product[]) {

    if(!err && result){
        const barcode = result.text
        const matchedProduct = data.filter(product => product.barcode === barcode)

        if (matchedProduct.length === 1) {
            const product = matchedProduct[0]
            return {status: true, data:product, barcode: barcode}
        } else {
            return {status: false, data: [], barcode: barcode}
        }
    }
}

export default  handleScan;