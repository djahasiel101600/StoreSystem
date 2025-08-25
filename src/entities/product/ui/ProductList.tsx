import { useProductStore } from "@/shared/store";

import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import type { Product } from "../model/product.types";
import { useEffect, useState } from "react";

type ScannedItemType = Product & { quantity: number };

export function ProductList() {
  const { products } = useProductStore();
  const [scannedItems, setScannedItems] = useState<ScannedItemType[]>([]);

  useEffect(() => {
    setScannedItems((prevScanned) => {
      return products.map((product) => {
        const existing = prevScanned.find(
          (item) => item.barcode === product.barcode
        );
        if (existing) {
          return {
            ...product,
            quantity: existing?.quantity + 1, // keep previous quantity if available
          };
        } else {
          return {
            ...product,
            quantity: 1, // keep previous quantity if available
          };
        }
      });
    });
  }, [products]);

  const productHeaders = ["Name", "Price", "Qty", "Total", "Action"];

  const updateQty = (barcode: string, newQty: number) => {
    setScannedItems((prev) =>
      prev.map((item) =>
        item.barcode === barcode
          ? { ...item, quantity: newQty === -1 ? 0 : newQty }
          : item
      )
    );
  };
  return (
    <>
      <div className="mt-2 flex flex-row justify-end"></div>
      <Table>
        <TableCaption>A list of your scanned products.</TableCaption>
        <TableHeader>
          <TableRow>
            {productHeaders.map((header, idx) => (
              <TableHead key={idx}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {scannedItems ? (
            scannedItems
              .filter(
                (item, index, self) =>
                  index === self.findIndex((i) => i.barcode === item.barcode)
              )
              .map((product) => (
                <TableRow
                  key={product.barcode}
                  className={
                    product.quantity === 0 ? "line-through text-gray-400" : ""
                  }
                >
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.price.toLocaleString()}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.price * product.quantity}</TableCell>
                  <TableCell className="flex gap-2 text-center">
                    <FaPlusCircle
                      onClick={() =>
                        updateQty(product.barcode, product.quantity + 1)
                      }
                    />
                    <FaMinusCircle
                      onClick={() =>
                        updateQty(product.barcode, product.quantity - 1)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No scanned items
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">
              Php{" "}
              {scannedItems
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toLocaleString()}
              .00
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
