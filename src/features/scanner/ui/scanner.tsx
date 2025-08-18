import handleScan from "../lib/handleScan";
import BarcodeScannerWidget from "@/widgets/scanner-widget/BarcodeScannerWidget";
import { getProducts } from "@/shared/api";
import { useEffect, useState } from "react";
import type { Product } from "@/entities/product/model/product.types";
import { useNavigate } from "react-router-dom";

const BarcodeScanner = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [scanResult, setScanResult] = useState<any>();

  getProducts()
    .then((data) => setProducts(data))
    .catch((err) => console.log(err));

  useEffect(() => {
    if (scanResult && scanResult.status) {
      const scannedProduct: Product = scanResult.data;
      console.log(scannedProduct.name);
    } else if (scanResult) {
      const barcode = scanResult.barcode;
      navigate(`/add-product?barcode=${barcode}`);
    }
  }, [scanResult]);

  return (
    <div>
      <BarcodeScannerWidget
        onScan={(err, result) =>
          setScanResult(handleScan(err, result, products))
        }
      />
    </div>
  );
};

export default BarcodeScanner;
