import { useState } from "react";
import { AutoPlayAudio, ScannedEntry } from "../../shared/ui";
import type { item } from "../../shared/types/item";
import { useNavigate } from "react-router-dom";
import BarcodeScanner, { BarcodeFormat } from "react-qr-barcode-scanner";
import useItemStore from "@/shared/store/useStore";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const LookUp = () => {
  const { items, removeItem } = useItemStore();
  const availableItems = items;
  const [data, setData] = useState<item[]>([]);
  const [beep, setBeep] = useState(false);
  const [torch, setTorch] = useState(false);

  const retrieveItem = (scannedCode: string) => {
    return availableItems.filter((item) => scannedCode === item.barcode);
  };

  const handleOnDelete = (del: boolean, code: string) => {
    if (del) {
      setData(data.filter((item) => item.barcode !== code));
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <AutoPlayAudio shouldPlayAudio={beep} />

      <div className="flex items-center space-x-2 mx-5 mb-2">
        <h1 className="m-5 text-3xl">Barcode Scanner</h1>
        <Switch id="airplane-mode" onClick={() => setTorch(!torch)} />
        <Label htmlFor="airplane-mode">Torch</Label>
      </div>
      <div className="relative h-[300px] overflow-hidden mx-4 rounded-2xl">
        <BarcodeScanner
          torch={torch}
          videoConstraints={{
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: "environment",
          }}
          delay={400}
          formats={[BarcodeFormat.EAN_13]}
          onUpdate={(err: any, result: any) => {
            if (result) {
              const retrieved = retrieveItem(result.getText())[0];
              if (!retrieved) {
                alert("Item not found");
                navigate("/product/register?code=" + result.getText());
                return;
              }
              setData([...data, retrieved]);
              setBeep(true);
            } else {
              setBeep(false);
            }
            err;
          }}
        />
        <div className="overlay-box"></div>
      </div>

      <div className="m-8">
        <h1 className="text-2xl ">Scanned Items</h1>
        <ul>
          {data.length > 0
            ? data.map((item, index) => (
                <ScannedEntry
                  key={index}
                  scannedItem={item}
                  onDelete={handleOnDelete}
                />
              ))
            : "No scanned items"}
        </ul>
      </div>
    </>
  );
};

export default LookUp;
