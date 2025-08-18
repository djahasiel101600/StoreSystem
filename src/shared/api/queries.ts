import supabase from "@/shared/api/client"

export async function getProducts(){
    const {data, error} = await supabase.from("Product").select();
    if(error){
        throw error;
    }
    console.log("queries.ts: ", data)
    return data
}