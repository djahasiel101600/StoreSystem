import { ProductList } from "@/entities/product/ui/ProductList";
import BarcodeScanner from "@/features/scanner/ui/scanner";
import BarcodeSearchbar from "@/shared/ui/barcodeSearchbar";

const ScanPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl p-2">Barcode Scanner</h1>
      <BarcodeScanner />
      <BarcodeSearchbar />
      <ProductList />
    </div>
  );
};

export default ScanPage;
