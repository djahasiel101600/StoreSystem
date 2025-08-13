import supabase from '@/shared/api/client'
import type { item } from '@/shared/types'


async function insertItem(table: string, item: item) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
  .from(table)
  .insert([
    {'barcode': item.barcode, 'name': item.name, 'price': item.price, 'stock': item.stock, 'unit': item.unit, 'size': item.size, 'productCategory': item.productCategory, 'user_id': user?.id}
  ])
  .select()

  if(error){
    console.log("Something went wrong while saving:", user?.id)
    console.log(error)
    return false
  }

  console.log("Inserted", data)
}

export default insertItem