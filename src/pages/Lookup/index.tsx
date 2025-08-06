import { useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import { AutoPlayAudio } from "../../shared/ui";
import type { item } from "../../shared/types/item";
import { useNavigate } from "react-router-dom";


const LookUp = () => {
    const available = [
        {code: "6926341889651", name:"Stamp Pad Ink Red", price: 100},
        {code: "2222222", name:"Stamp Pad Ink Purple", price: 200},
      ]
      const [data, setData] = useState<item[]>([]);
      const [beep, setBeep] = useState(false)
      const [pause, setPause] = useState(false)
    
      const retrieveItem = (scannedCode: string) => {
        return available.filter(item => scannedCode === item.code )
      }
      const navigate = useNavigate()
    return<><AutoPlayAudio shouldPlayAudio={beep} />
    <BarcodeScanner
    facingMode="environment"
      delay={500}
      onUpdate={(err, result) => {
        if(result){
            const retrieved = retrieveItem(result.getText())[0]
            if (!retrieved){
                alert("Item not found")
                navigate("/product/register?code=" + result.getText())
                return
            }
          setData([...data, retrieved])
          setBeep(true);
        } else {

          setBeep(false);
        }
      }}
    />
    <button onClick={() => setPause(!pause)}>Pause/Play</button>
    <ul>{data.map((item, index) => (<li key={index}>{item.name} : {item.price}</li>))}</ul></>
}

export default LookUp;