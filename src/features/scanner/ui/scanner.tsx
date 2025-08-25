import handleScan from "../lib/handleScan";
import BarcodeScannerWidget from "@/widgets/scanner-widget/BarcodeScannerWidget";
import { getProducts } from "@/shared/api";
import { useEffect, useState } from "react";
import type { Product } from "@/entities/product/model/product.types";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "@/shared/store";

const BarcodeScanner = () => {
  const navigate = useNavigate();
  const { addProduct } = useProductStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [scanResult, setScanResult] = useState<any>();

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));

    if (scanResult && scanResult.status) {
      const scannedProduct: Product = scanResult.data;
      console.log(scannedProduct.name);

      addProduct(scannedProduct);

      const beep = new Audio("/scanbeep.mp3");
      beep.play();
    } else if (scanResult && !scanResult.status) {
      const barcode = scanResult.barcode;
      navigate(`/add-product?barcode=${barcode}`);
    }
  }, [scanResult]);

  return (
    <>
      <div>
        <BarcodeScannerWidget
          onScan={(err, result) =>
            setScanResult(handleScan(err, result, products))
          }
        />
      </div>
    </>
  );
};

export default BarcodeScanner;
