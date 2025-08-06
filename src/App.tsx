import { useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import { AutoPlayAudio } from "./shared/ui";
import { type item } from "./shared/types/item";

function App() {
  const available = [
    {code: "6926341889651", name:"Stamp Pad Ink Red", price: 100},
    {code: "2222222", name:"Stamp Pad Ink Purple", price: 200},
  ]
  const [data, setData] = useState<item[]>([]);
  const [beep, setBeep] = useState(false)

  const retrieveItem = (scannedCode: string) => {
    return available.filter(item => scannedCode === item.code )
  }
  return (
    <>
      <AutoPlayAudio shouldPlayAudio={beep} />
      <BarcodeScanner
      facingMode="environment"
        width={500}
        height={500}
        delay={1000}
        onUpdate={(err, result) => {
          if(result){
            setData([...data, retrieveItem(result.getText())[0]])
            setBeep(true);
          } else {

            setBeep(false);
          }
        }}
      />
      <ul>{data.map((item, index) => (<li key={index}>{item.name} : {item.price}</li>))}</ul>
    </>
  );
}

export default App;