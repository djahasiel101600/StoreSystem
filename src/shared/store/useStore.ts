import {create} from "zustand"
import type { item } from "../types/item"

interface ItemStore {
    items: item[];
    addItem: (item: item) => void;
    removeItem: (itemCode: string) => void;
    updateItem: (itemCode: string, item: item) => void
}

const useItemStore = create<ItemStore>((set) => ({
    items: [],

    addItem: item => set((state) => ({
        items: [...state.items, item]
    })),

    removeItem: itemCode => set((state) => ({
        items: state.items.filter(item => item.barcode !== itemCode)
    })),

    updateItem: (itemCode, newItem) => set((state) => ({
        items: state.items.map(item => item.barcode === itemCode ? {...item, newItem} : item)
    }))
}))

export default useItemStore;