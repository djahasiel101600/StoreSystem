import type { Product } from "@/entities/product/model/product.types"
import { supabase } from "@/shared/api"

async function insertProduct(newData:Product){
    
const { data, error } = await supabase
  .from('Product')
  .insert([
    newData,
  ])
  .select()

  if(!error){
    console.log("Successfully Inserted:", data)
  }
          
}

export default  insertProduct