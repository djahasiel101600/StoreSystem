import { Input } from "./input";
import { Button } from "./button";
import { FaBarcode } from "react-icons/fa";
import { useState } from "react";
import { useProductStore } from "../store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config";

const BarcodeSearchbar = () => {
  const [barcode, setBarcode] = useState("");
  const { addProduct, productDatabase } = useProductStore();
  const navigate = useNavigate();

  const handleClick = () => {
    const matched = productDatabase.find(
      (predicate) => predicate.barcode === barcode
    );

    if (matched !== undefined) {
      addProduct(matched);
    } else {
      toast("Product barcode not found", {
        action: {
          label: "Register",
          onClick: () => {
            navigate(`${ROUTES.ADD_PRODUCT}?barcode=${barcode}`);
            setBarcode("");
          },
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex flex-row gap-2 justify-center items-center">
        <FaBarcode className="text-4xl font-medium" />
        <Input
          placeholder="Barcode"
          onChange={(e) => setBarcode(e.target.value)}
        />
        <Button onClick={handleClick}>Search</Button>
      </div>
      <div></div>
    </div>
  );
};

export default BarcodeSearchbar;
