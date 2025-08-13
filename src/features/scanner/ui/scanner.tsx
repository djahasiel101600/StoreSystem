import handleScan from "../lib/handleScan";
import BarcodeScannerWidget from "@/widgets/scanner-widget/BarcodeScannerWidget";

const BarcodeScanner = () => {
  return (
    <div>
      <BarcodeScannerWidget onScan={handleScan} />
    </div>
  );
};

export default BarcodeScanner;
