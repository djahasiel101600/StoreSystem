import BarcodeScanner from "react-qr-barcode-scanner";

interface BarcodeScanner {
  onScan: (err: any, result: any) => void;
}

const BarcodeScannerWidget = ({ onScan }: BarcodeScanner) => {
  return (
    <>
      <div className="relative rounded-2xl overflow-hidden z-0">
        <BarcodeScanner onUpdate={onScan} width={500} height={500} />
        <div className="overlay-box"></div>
      </div>
    </>
  );
};

export default BarcodeScannerWidget;
