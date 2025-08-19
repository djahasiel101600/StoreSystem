import {create} from "zustand"
import type { item } from "../types/item"
import { type Product } from "@/entities/product/model/product.types";

interface ProductStore {
    products: Product[];
    addProduct: (product: Product) => void;
    removeProduct: (barcode: string) => void;
    updateProduct: (barcode: string, item: item) => void
    setProducts: (products: Product[]) => void
}

const useProductStore = create<ProductStore>((set) => ({
    products: [],

    addProduct: product => set((state) => ({
        products: [...state.products, product]
    })),

    removeProduct: barcode => set((state) => ({
        products: state.products.filter(product => product.barcode !== barcode)
    })),

    updateProduct: (barcode, newProduct) => set((state) => ({
        products: state.products.map(product => product.barcode === barcode ? {...product, newProduct} : product)
    })),

    setProducts: newProducts => set({products: newProducts})
}))

export default useProductStore;