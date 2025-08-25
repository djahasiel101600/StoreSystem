import { getProducts } from "@/shared/api";
import { useProductStore } from "@/shared/store";
import { useEffect, type ReactNode } from "react";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const { setProductDatabase } = useProductStore();

  useEffect(() => {
    getProducts().then((data) => {
      setProductDatabase(data);
    });
  }, []);

  return <>{children}</>;
};

export default StoreProvider;
