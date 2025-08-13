import type { item } from "@/shared/types";
import supabase from "@/shared/api/client";
import { useEffect, useState } from "react";

async function getProducts() {
  const { data, error } = await supabase.from('Product').select();
  return { data, error };
}

const useProducts = () => {
  const [products, setProducts] = useState<item[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await getProducts();
      if (error) setError(error);
      setProducts(data ?? []);
    }
    fetchProducts();
  }, []);

  return { products, error };
};

export { getProducts, useProducts };