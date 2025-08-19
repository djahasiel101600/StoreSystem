import { useEffect, useState, type ReactNode } from "react";
import { getProducts } from "@/shared/api";
import type { Product } from "@/entities/product/model/product.types";
import { useProductStore } from "@/shared/store";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const { setProducts } = useProductStore();
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  getProducts()
    .then((data) => {
      setNewProducts(data);
      setIsLoading(true);
    })
    .finally(() => setIsLoading(false));
  useEffect(() => {
    setProducts(newProducts);

    console.log("Store Provider is called:", newProducts);
  }, [isLoading]);
  return <>{!isLoading && children}</>;
};

export default StoreProvider;
