import BarcodeScanner from "@/features/scanner/ui/scanner";
import useItemStore from "@/shared/store/useStore";

const ScanPage = () => {
  const { products } = useItemStore();
  // console.log(products);
  return (
    <div>
      <BarcodeScanner />
      {products.length > 0 && products[0].barcode}
    </div>
  );
};

export default ScanPage;
