function handleScan(err: any, result: any) {
    if(!err && result){
        console.log(result.text);
    }
}

export default  handleScan;