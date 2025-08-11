import { useState } from "react";
import { AutoPlayAudio, ScannedEntry } from "../../shared/ui";
import type { item } from "../../shared/types/item";
import { useNavigate } from "react-router-dom";
import BarcodeScanner from "react-qr-barcode-scanner";
import useItemStore from "@/shared/store/useStore";

const LookUp = () => {
  const { items } = useItemStore();
  const availableItems = items;
  const [data, setData] = useState<item[]>([]);
  const [beep, setBeep] = useState(false);

  const retrieveItem = (scannedCode: string) => {
    return availableItems.filter((item) => scannedCode === item.code);
  };

  const handleOnDelete = (del: boolean, code: string) => {
    if (del) {
      setData(data.filter((item) => item.code !== code));
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <AutoPlayAudio shouldPlayAudio={beep} />
      <BarcodeScanner
        facingMode="environment"
        delay={300}
        onUpdate={(err: any, result: any) => {
          if(err){
            console.log(err)
          }
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
        }}
      />

      <p>Scanned</p>
      <ul>
        {data.map((item, index) => (
          <ScannedEntry
            key={index}
            scannedItem={item}
            onDelete={handleOnDelete}
          />
        ))}
      </ul>
    </>
  );
};

export default LookUp;
