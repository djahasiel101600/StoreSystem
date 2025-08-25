import { ProductList } from "@/entities/product/ui/ProductList";
import BarcodeScanner from "@/features/scanner/ui/scanner";
import BarcodeSearchbar from "@/shared/ui/barcodeSearchbar";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config";

const ScanPage = () => {
  return (
    <div className="p-4">
      <Link to={ROUTES.LOGIN}>Login Here</Link>
      <h1 className="text-2xl p-2">Barcode Scanner</h1>
      <BarcodeScanner />
      <BarcodeSearchbar />
      <ProductList />
    </div>
  );
};

export default ScanPage;
