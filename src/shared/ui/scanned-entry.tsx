import { useState } from "react";
import type { item } from "../types/item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ScannedEntry = ({
  scannedItem,
  onDelete,
}: {
  scannedItem: item;
  onDelete: (del: boolean, code: string) => void;
}) => {
  const [quantity, setQuantity] = useState(1);
  if (quantity === 0) {
    onDelete(true, scannedItem.code);
  }
  return (
    <div className="flex gap-2 items-center justify-between px-4">
      <p>
        {scannedItem.name} @Php {scannedItem.price}.00
      </p>
      =<p>{scannedItem.price * quantity}</p>
      <div className="flex gap-2 items-center">
        <Input type="number" value={quantity} className="w-12 text-center" />
        <Button variant={"outline"} onClick={() => setQuantity(quantity + 1)}>
          +
        </Button>
        <Button
          variant={"outline"}
          onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
        >
          -
        </Button>
      </div>
    </div>
  );
};

export default ScannedEntry;
